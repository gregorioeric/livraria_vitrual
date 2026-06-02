import pool from "../db/conn.js";

class BuyModel {
    async selectAllBuys() {
        const [rows] = pool.execute("SELECT * FROM compras;");

        return rows;
    }

    async selectBuyByIdCliente(id_cliente) {
        const [rows] = pool.execute(
            "SELECT * FROM compras WHERE id_cliente = ?;",
            [id_cliente]
        )

        return rows;
    }

    async createBuy(buyData) {
        const { qtde, valor, desconto, id_livro, id_cliente } = buyData;
        const [result] = pool.execute(
            "INSERT INTO compras (qtde, valor, desconto, id_livro, id_cliente) VALUES (?, ?, ?, ?, ?);",
            [qtde, valor, desconto, id_livro, id_cliente]
        );

        return result;
    }

    async updateBuy(id_compra, buyData) {
        const { qtde, valor, desconto, id_livro, id_cliente } = buyData;
        const [result] = pool.execute(
            "UPDATE compras SET qtde = ?, valor = ?, desconto = ?, id_livro = ?, id_cliente = ? WHERE id_compra = ?;",
            [qtde, valor, desconto, id_livro, id_cliente, id_compra]
        );

        return result;
    }

    async deleteBuy(id_compra) {
        const [result] = pool.execute(
            "DELETE FROM compras WHERE id_compra = ?;",
            [id_compra]
        );

        return result;
    }
}

export default new BuyModel();