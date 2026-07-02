import EnderecoModel from "../models/enderecoModel.js";

class EnderecoController {
  async createEndereco(req, res) {
    const { cep } = req.body;

    if (!cep) {
      return res.status(400).json({
        error: "CEP não fornecido!",
      });
    }

    const [selectEnderecoByCep] = await EnderecoModel.selectEnderecoByCep(cep);

    if (selectEnderecoByCep) {
      return res.status(400).json({
        error: "Endereço ja cadastrado!",
      });
    }

    const getEndereco = await fetch(`http://viacep.com.br/ws/${cep}/json/`);

    const jsonEndereco = await getEndereco.json();

    const newEndereco = {
      id_cliente: 2,
      logradouro: jsonEndereco.logradouro,
      numero: "",
      complemento: "",
      bairro: jsonEndereco.bairro,
      cidade: jsonEndereco.localidade,
      estado: jsonEndereco.uf,
      cep,
    };

    const enderecoCreated = await EnderecoModel.createEndereco(newEndereco);

    if (enderecoCreated.affectedRows > 0) {
      return res.status(200).json({
        success: "Endereço cadastrado com sucesso!",
      });
    }

    return res.status(500).json({
      error: "Erro ao cadastrar endereço!",
    });
  }
}

export default new EnderecoController();
