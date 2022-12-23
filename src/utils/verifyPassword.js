const verifyPassword = (password) => {
  const regexPassword = /^(?=.*\d)(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{6,}$/;

  return regexPassword.test(password);
}

export default verifyPassword;