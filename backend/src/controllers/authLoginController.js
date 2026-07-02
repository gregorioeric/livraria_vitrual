import bcrypt from "bcrypt";
import dotenv from "dotenv";
import generateTokens from "../utils/generateTokens.js";
import tokenModel from "../models/tokenModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

dotenv.config();

class AuthLoginController {
  async login(req, res) {
    const { user_email, user_password } = req.body;

    const [emailExists] = await userModel.selectUserByEmail(user_email);

    if (!emailExists) {
      return res.status(400).json({
        error: "Email ou senha são invalidos!",
      });
    }

    const validatePassword = await bcrypt.compare(
      user_password,
      emailExists.user_password,
    );

    if (!validatePassword) {
      return res.status(400).json({
        error: "Senha invalida!",
      });
    }

    const accessToken = generateTokens.generateAccessToken(emailExists);
    const refreshToken = generateTokens.generateRefreshToken(emailExists);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // +7 dias

    const savedToken = await tokenModel.createToken({
      user_id: emailExists.user_id,
      token: refreshToken,
      expires_at: expiresAt,
    });

    if (savedToken.affectedRows === 0) {
      return res.status(500).json({
        error: "Erro ao criar token!",
      });
    }

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: process.env.COOKIE_SECRET,
      secure: false,
      sameSite: "strict",
      maxAge: 604800000,
    });

    return res.json({
      success: "Login realizado com sucesso!",
      accessToken,
    });
  }

  async refreshToken(req, res) {
    const rfToken = req.cookies.refreshToken;

    if (!rfToken) {
      return res.status(401).json({
        error: "Token não fornecido!",
      });
    }

    const [tokenExists] = await tokenModel.selectByToken(rfToken);

    if (!tokenExists) {
      return res.status(401).json({
        error: "token inválido!",
      });
    }

    jwt.verify(
      rfToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (error, usuarioDecodificado) => {
        if (error) {
          return res.status(403).json({
            error: "Token inválido ou expirado!",
          });
        }

        await tokenModel.deleteToken(rfToken);

        const { iat, exp, ...userData } = usuarioDecodificado;

        const accessToken = generateTokens.generateAccessToken(userData);
        const newRefreshToken = generateTokens.generateRefreshToken(userData);

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        const savedToken = await tokenModel.createToken({
          user_id: userData.id,
          token: newRefreshToken,
          expires_at: expiresAt,
        });

        if (savedToken.affectedRows === 0) {
          return res.status(500).json({
            error: "Erro ao cadastrar o token!",
          });
        }

        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: expiresAt,
        });

        return res.status(200).json({
          success: "Sessão atualizada com sucesso!",
          accessToken,
        });
      },
    );
  }

  async logout(req, res) {
    const refreshToken = req.cookies?.refreshToken;

    const deleteToken = await tokenModel.deleteToken(refreshToken);

    res.clearCookie("refreshToken");

    if (deleteToken.affectedRows > 0) {
      return res.status(201).json({
        success: "Logout efetuadocom sucesso!",
      });
    }

    return res.status(500).json({
      error: "Erro ao deletar token",
    });
  }
}

export default new AuthLoginController();
