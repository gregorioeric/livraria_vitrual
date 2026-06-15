import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

class UserController {
  async getAllUsers(req, res) {
    try {
      const allUsers = await userModel.selectAllUsers();

      if (allUsers.length === 0) {
        return res.status(404).json({
          error: "Nenhum usuário encontrado",
        });
      }

      return res.status(200).json(allUsers);
    } catch (err) {
      return res.status(500).json({
        error: "Erro ao buscar usuários",
      });
    }
  }

  async getUserById(req, res) {
    try {
      const { user_id } = req.params;

      const userById = await userModel.selectUserById(user_id);

      if (userById.length === 0) {
        return res.status(404).json({
          error: "Usuário não encontrado!",
        });
      }

      return res.status(200).json(userById);
    } catch (err) {
      return res.status(500).json({
        error: "Erro ao buscar usuário!",
      });
    }
  }

  async getUserByEmail(req, res) {
    try {
      const { user_email } = req.params;

      const [userByEmail] = await userModel.selectUserByEmail(user_email);

      if (!userByEmail) {
        return res.status(404).json({
          error: "Usuário não encontrado!",
        });
      }

      return res.status(200).json(userByEmail);
    } catch (err) {
      return res.status(500).json({
        error: "Erro ao buscar usuário por email!",
      });
    }
  }

  async createUser(req, res) {
    try {
      const {
        user_name,
        user_email,
        user_password,
        user_phone,
        role_id,
        user_status,
      } = req.body;

      const [existsUser] = await userModel.selectUserByEmail(
        req.body.user_email,
      );

      if (existsUser) {
        return res.status(400).json({
          error: "Este email já está cadastrado no sistema!",
        });
      }

      const hashedPassword = await bcrypt.hash(user_password, 10);

      const newUser = await userModel.insertUser({
        user_name,
        user_email,
        user_password: hashedPassword,
        user_phone,
        role_id,
        user_status,
      });

      if (newUser.affectedRows > 0) {
        return res.status(200).json({
          success: "Usuário cadastrado com sucesso!",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Erro ao criar usuário!",
      });
    }
  }

  async updateUser(req, res) {
    try {
      const { user_id } = req.params;
      const {
        user_name,
        user_email,
        user_password,
        user_phone,
        role_id,
        user_status,
      } = req.body;

      const [existsUser] = await userModel.selectUserByEmail(
        user_email,
        user_id,
      );

      if (existsUser) {
        return res.status(400).json({
          error: "Este email já está cadastrado no sistema!",
        });
      }

      const [existsPassword] = await userModel.selectUserById(user_id);

      if (existsPassword) {
        const comperingPassword = await bcrypt.compare(
          user_password,
          existsPassword.user_password,
        );

        console.log("comperingPassword", comperingPassword);

        if (comperingPassword) {
          const result = await userModel.updateUser(user_id, {
            user_name,
            user_email,
            user_password: existsPassword.user_password,
            user_phone,
            role_id,
            user_status,
          });

          console.log("Dentro comperingPassword", result);

          if (result.affectedRows > 0) {
            return res.status(200).json({
              success: "Usuário atualizado com sucesso dentro do compering!",
            });
          }
        }

        const hashedPassword = await bcrypt.hash(user_password, 10);

        const result = await userModel.updateUser(user_id, {
          user_name,
          user_email,
          user_password: hashedPassword,
          user_phone,
          role_id,
          user_status,
        });

        console.log("result depois do if", result);

        if (result.affectedRows > 0) {
          return res.status(200).json({
            success: "Usuário atualizado com sucesso!",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao atualizar usuário!",
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const { user_id } = req.params;

      const result = await userModel.deleteUser(user_id);

      if (result.affectedRows > 0) {
        return res.status(201).json({
          success: "Usuário deletado com sucesso!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao atualizar usuário!",
      });
    }
  }
}

export default new UserController();
