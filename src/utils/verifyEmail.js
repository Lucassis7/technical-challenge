const verifyEmail = (email) => {
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return regexEmail.test(email);
}

export default verifyEmail;