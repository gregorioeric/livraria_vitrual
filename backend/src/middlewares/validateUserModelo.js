import roleModel_referencia from "../models/roleModel_referencia.js";

const validateUserModelo = async (req, res, next) => {
  const {
    user_name,
    user_email,
    user_password,
    user_phone,
    role_id,
    user_status,
  } = req.body;

  let errors = [];

  const newName = user_name.trim().toUpperCase();
  const newEmail = user_email.trim().toLowerCase();
  const newPhone = user_phone.trim();
  const newPassword = user_password.trim();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const [verifyRole] = await roleModel_referencia.getRoleById(role_id);

  if (!newName || newName.trim() === "") {
    errors.push("O nome é obrigatório");
  } else if (newName.trim().length < 3 || newName.trim().length > 100) {
    errors.push("O nome deve ter entre 3 e 100 caracteres");
  }

  if (!newEmail || newEmail.trim() === "") {
    errors.push("O email é obrigatório");
  } else {
    if (!emailRegex.test(newEmail.trim())) {
      errors.push("Email inválido");
    } else if (newEmail.trim().length > 150) {
      errors.push("O email deve ter no máximo 150 caracteres");
    }
  }

  if (!newPhone || newPhone.trim() === "") {
    errors.push("O telefone é obrigatório");
  } else if (newPhone.trim().length != 15) {
    errors.push("O telefone deve ter 15 caracteres");
  }

  if (!newPassword || newPassword.trim() === "") {
    errors.push("A senha é obrigatória");
  } else if (!regexPassword.test(newPassword.trim())) {
    errors.push(
      "A senha deve ter pelo menos 8 caracteres, contendo letra maiúscula, minúscula, número e caractere especial",
    );
  }

  if (!newRole || newRole.trim() === "") {
    errors.push("A role é obrigatória");
  } else if (!verifyRole) {
    errors.push("A role informada não existe!");
  }

  // if (!newUserStatus || newUserStatus.trim() === "") {
  //   errors.push("O status do usuário é obrigatório");
  // } else if (newUserStatus != "ATIVO" && newUserStatus != "INATIVO") {
  //   errors.push("O status do usuário deve ser ATIVO ou INATIVO");
  // }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export default validateUserModelo;
