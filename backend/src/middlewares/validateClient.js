const validateClient = (req, res, next) => {
  const { nome, email, telefone, cidade, estado } = req.body;
  let erros = [];

  const newNome = nome.trim().toUpperCase();
  const newEmail = email.trim().toLowerCase();
  const newTelefone = telefone.trim();
  const newCidade = cidade.trim().toUpperCase();
  const newEstado = estado.trim().toUpperCase();

  if (!nome || nome.trim() === "") {
    erros.push("O nome é obrigatório");
  } else if (nome.trim().length < 3 || nome.trim().length > 100) {
    erros.push("O nome deve ter pelo menos 3 caracteres");
  }

  if (!email || email.trim() === "") {
    erros.push("O email é obrigatório");
  } else {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      erros.push("Email inválido");
    } else if (email.trim().length > 100) {
      erros.push("O email deve ter no máximo 100 caracteres");
    }
  }

  if (!telefone || telefone.trim() === "") {
    erros.push("O telefone é obrigatório");
  } else if (telefone.trim().length != 15) {
    erros.push("O telefone deve ter 11 caracteres");
  }

  // const isNumber = /^[0-9]+$/;
  // if (!isNumber.test(telefone.trim())) {
  //   return res.status(400).json({ message: "Telefone inválido" });
  // }

  if (!cidade || cidade.trim() === "") {
    erros.push("A cidade é obrigatória");
  } else if (cidade.trim().length < 3 || cidade.trim().length > 100) {
    erros.push("A cidade deve ter entre 3 e 100 caracteres");
  }

  if (!estado || estado.trim() === "") {
    erros.push("O estado é obrigatório");
  } else if (estado.trim().length != 2) {
    erros.push("O estado deve ter 2 caracteres");
  }

  //   if (!email.includes("@")) {
  //     return res.status(400).json({ message: "Email inválido" });
  //   }
  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }
  next();
};

export default validateClient;
