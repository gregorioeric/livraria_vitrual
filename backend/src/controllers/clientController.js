import clientModel from "../models/clientModel.js";

class ClientController {
  async selectAllClients(req, res) {
    const clients = await clientModel.selectAllClients();
    res.json(clients);
  }

  async selectClientById(req, res) {
    const { id_cliente } = req.params;
    const [client] = await clientModel.selectClientById(id_cliente);
    res.json(client);
  }

  async selectClientByEmail(req, res) {
    const { email } = req.params;
    const client = await clientModel.selectClientByEmail(email);
    res.json(client);
  }

  async createClient(req, res) {
    try {
      const { nome, email, telefone, cidade, estado } = req.body;

      //   if (!nome || !email || !telefone || !cidade || !estado) {
      //     return res.status(400).json({ message: "Todos os campos são obrigatórios" });
      //   }

      const [findEmail] = await clientModel.selectClientByEmail(req.body.email);

      if (findEmail) {
        return res.json({ message: "Email já cadastrado" });
      }

      const client = await clientModel.createClient({
        nome,
        email,
        telefone,
        cidade,
        estado,
      });

      if (client.affectedRows > 0) {
        return res
          .status(201)
          .json({ message: "Cliente cadastrado com sucesso!" });
      }

      // return res.status(500).json({ message: "Erro ao cadastrar cliente" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao cadastrar cliente" });
    }
  }

  async updateClient(req, res) {
    try {
      const { id } = req.params;

      const [findEmail] = await clientModel.selectClientByEmail(
        req.body.email,
        id,
      );

      if (findEmail) {
        return res.status(409).json({ message: "Email já cadastrado" });
      }

      const client = await clientModel.updateClient(id, req.body);

      if (client.affectedRows > 0) {
        return res.json({ message: "Cliente atualizado com sucesso!" });
      }

      //   return res.status(500).json({ message: "Erro ao atualizar cliente" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao atualizar cliente ${error}` });
    }
  }

  async deleteClient(req, res) {
    const client = await clientModel.deleteClient(req.params.id_cliente);
    res.json(client);
  }
}

export default new ClientController();
