import pool from "../database/database.js";

class BookModel {
  async showBooks() {
    const [rows] = await pool.execute("SELECT * FROM livros;");

    return rows;
  }

  async findBookByName(bookName) {
    const [row] = await pool.execute(
      "SELECT * FROM livros WHERE titulo LIKE ?;",
      [`%${bookName}%`],
    );

    return row;
  }

  async createBook(bookData) {
    const { titulo, autor, ano_publicacao, preco, id_editora, id_categoria } =
      bookData;
    const [row] = await pool.execute(
      `INSET INTO livros 
          (titulo, autor, ano_publicacao, preco, id_editora, id_categoria)
        VALUES
          (?, ?, ?, ?, ?, ?);`,
      [titulo, autor, ano_publicacao, preco, id_editora, id_categoria],
    );

    return row;
  }

  async updateBook(id, bookData) {
    const { titulo, autor, ano_publicacao, preco, id_editora, id_categoria } =
      bookData;
    const [row] = await pool.execute(
      `UPDATE livros SET 
            titulo = ?,
            autor = ?,
            ano_publicacao = ?,
            preco = ?,
            id_editora = ?,
            id_categoria = ?
        WHERE id_livro = ?`,
      [titulo, autor, ano_publicacao, preco, id_editora, id_categoria, id],
    );

    return row;
  }

  async deleteBook(id) {
    const [row] = await pool.execute("DELETE FROM livros WHERE id_livro = ?", [
      id,
    ]);

    return row;
  }
}

export default new BookModel();
