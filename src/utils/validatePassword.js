export const passwordRegex = /^((?=\S*?[a-z]).{8,})\S$/;
export const validatePassword = (password) => {
  return passwordRegex.test(password);
};
export const passwordMatchPatternError = `Password must contain at least 8 characters`;
