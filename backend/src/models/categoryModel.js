import pool from "../db/conn.js";

class CategoryModel {
    async selectAllCategories() {
        const [rows] = pool.execute("SELECT * FROM categorias;");
        return rows;
    }

    async selectCategoryById(id_categoria) {
        const [rows] = pool.execute(
            "SELECT * FROM categorias WHERE id_categoria = ?;",
            [id_categoria]
        );
        return rows;
    }

    async selectCategoryByName(nome) {
        const [rows] = pool.execute(
            "SELECT * FROM categorias WHERE nome = ?;",
            [nome]
        );
        return rows;
    }

    async createCategory(categoryData) {
        const { nome } = categoryData;
        const [result] = pool.execute(
            "INSERT INTO categorias (nome) VALUES (?);",
            [nome]
        );
        return result;
    }

    async updateCategory(id_categoria, categoryData) {
        const { nome } = categoryData;
        const [result] = pool.execute(
            "UPDATE categorias SET nome = ? WHERE id_categoria = ?;",
            [nome, id_categoria]
        );
        return result;
    }

    async deleteCategory(id_categoria) {
        const [result] = pool.execute(
            "DELETE FROM categorias WHERE id_categoria = ?;",
            [id_categoria]
        );
        return result;
    }
}

export default new CategoryModel();