import pool from "../db/conn.js";

class ClientModel {
  async selectAllClients() {
    const [rows] = await pool.execute("SELECT * FROM clientes;");
    return rows;
  }

  async selectClientById(id_cliente) {
    const [rows] = await pool.execute(
      "SELECT * FROM clientes WHERE id_cliente = ?;",
      [id_cliente],
    );
    return rows;
  }

  async selectClientByEmail(email, id = 0) {
    const [rows] = await pool.execute(
      "SELECT * FROM clientes WHERE email = ? AND id_cliente != ?;",
      [email, id],
    );
    return rows;
  }

  async createClient(clientData) {
    const { nome, email, telefone, cidade, estado } = clientData;
    const [result] = await pool.execute(
      "INSERT INTO clientes (nome, email, telefone, cidade, estado) VALUES (?, ?, ?, ?, ?);",
      [nome, email, telefone, cidade, estado],
    );
    return result;
  }

  async updateClient(id_cliente, clientData) {
    const { nome, email, telefone, cidade, estado } = clientData;
    const [result] = await pool.execute(
      "UPDATE clientes SET nome = ?, email = ?, telefone = ?, cidade = ?, estado = ? WHERE id_cliente = ?;",
      [nome, email, telefone, cidade, estado, id_cliente],
    );
    return result;
  }

  async deleteClient(id_cliente) {
    const [result] = await pool.execute(
      "DELETE FROM clientes WHERE id_cliente = ?;",
      [id_cliente],
    );
    return result;
  }
}

export default new ClientModel();
