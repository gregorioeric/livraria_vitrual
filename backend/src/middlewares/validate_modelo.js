const validateClient = (req, res, next) => {
  const { nome, email, telefone, cidade, estado } = req.body;

  if (!nome || nome.trim() === "") {
    return res.status(400).json({ message: "O nome é obrigatório" });
  } else if (nome.trim().length < 3 || nome.trim().length > 100) {
    return res
      .status(400)
      .json({ message: "O nome deve ter pelo menos 3 caracteres" });
  }

  if (!email || email.trim() === "") {
    return res.status(400).json({ message: "O email é obrigatório" });
  } else {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ message: "Email inválido" });
    } else if (email.trim().length > 100) {
      return res
        .status(400)
        .json({ message: "O email deve ter no máximo 100 caracteres" });
    }
  }

  if (!telefone || telefone.trim() === "") {
    return res.status(400).json({ message: "O telefone é obrigatório" });
  } else if (telefone.trim().length < 11) {
    return res
      .status(400)
      .json({ message: "O telefone deve ter pelo menos 11 caracteres" });
  }

  // const isNumber = /^[0-9]+$/;
  // if (!isNumber.test(telefone.trim())) {
  //   return res.status(400).json({ message: "Telefone inválido" });
  // }

  if (!cidade || cidade.trim() === "") {
    return res.status(400).json({ message: "A cidade é obrigatória" });
  } else if (cidade.trim().length < 3 && cidade.trim().length > 100) {
    return res
      .status(400)
      .json({ message: "A cidade deve ter pelo menos 3 caracteres" });
  }

  if (!estado || estado.trim() === "") {
    return res.status(400).json({ message: "O estado é obrigatório" });
  } else if (estado.trim().length == 2) {
    return res.status(400).json({ message: "O estado deve ter 2 caracteres" });
  }

  //   if (!email.includes("@")) {
  //     return res.status(400).json({ message: "Email inválido" });
  //   }

  next();
};

export default validateClient;
