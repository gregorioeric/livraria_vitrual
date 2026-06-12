import pool from "../database/database.js";

class RoleModel {
  async getRoleById(role_id) {
    const [allRoles] = await pool.query(
      "SELECT * FROM roles WHERE role_id = ?;",
      [role_id],
    );
    return allRoles;
  }
}

export default new RoleModel();
