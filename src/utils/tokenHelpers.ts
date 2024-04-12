export const validateTokenExists = () => {
  const token = localStorage.getItem('token');
  return Boolean(token);
};
