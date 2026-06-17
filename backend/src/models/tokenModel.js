import pool from "../database/database.js";

class TokenModel {
  async createToken(tokenData) {
    const { user_id, token, expires_at } = tokenData;
    const [result] = await pool.execute(
      `INSERT INTO tokens 
            (user_id, token, expires_at)
            VALUES
            (?, ?, ?);`,
      [user_id, token, expires_at],
    );
    return result;
  }

  async selectByToken(token) {
    const [result] = await pool.execute(
      `SELECT * FROM tokens WHERE token = ?`,
      [token],
    );
    return result;
  }

  async deleteToken(token) {
    const [result] = await pool.execute(`DELETE FROM tokens WHERE token = ?;`, [
      token,
    ]);
    return result;
  }
}

export default new TokenModel();
