export const isValidPassword = (password: string) => {
  const hasMinLength = password.length >= 8 && password.length <= 20;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasMinLength && hasLetter && hasNumber;
};
