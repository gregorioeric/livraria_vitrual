import pool from "../database/database.js";

class EnderecoModel {
  async createEndereco(endereco) {
    const {
      id_cliente,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
    } = endereco;
    const query = `INSERT INTO endereco (
            id_cliente, 
            logradouro, 
            numero, 
            complemento, 
            bairro, 
            cidade, 
            estado, 
            cep) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.query(query, [
      id_cliente,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
    ]);
    return result;
  }

  async selectEnderecoByCep(cep) {
    const query = "SELECT * FROM endereco WHERE cep = ?;";

    const [result] = await pool.execute(query, [cep]);
    return result;
  }
}

export default new EnderecoModel();
