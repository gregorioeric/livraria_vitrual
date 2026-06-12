import pool from "../database/database.js";

class PublisherModel {
  async selectAllPublishers() {
    const [rows] = pool.execute("SELECT * FROM editoras;");
    return rows;
  }

  async selectPublisherById(id_editora) {
    const [rows] = pool.execute(
      "SELECT * FROM editoras WHERE id_editora = ?;",
      [id_editora],
    );
    return rows;
  }

  async selectPublisherByEmail(email) {
    const [rows] = pool.execute("SELECT * FROM editoras WHERE email = ?;", [
      email,
    ]);
    return rows;
  }

  async createPublisher(publisherData) {
    const { nome, email, telefone } = publisherData;
    const [result] = pool.execute(
      "INSERT INTO editoras (nome, email, telefone) VALUES (?, ?, ?);",
      [nome, email, telefone],
    );
    return result;
  }

  async updatePublisher(id_editora, publisherData) {
    const { nome, email, telefone } = publisherData;
    const [result] = pool.execute(
      "UPDATE editoras SET nome = ?, email = ?, telefone = ? WHERE id_editora = ?;",
      [nome, email, telefone, id_editora],
    );
    return result;
  }

  async deletePublisher(id_editora) {
    const [result] = pool.execute(
      "DELETE FROM editoras WHERE id_editora = ?;",
      [id_editora],
    );
    return result;
  }
}

export default new PublisherModel();
