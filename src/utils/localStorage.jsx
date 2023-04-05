export const addUserToLocalStorage = user => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('item');
  const user = result ? JSON.parse(result) : null;
  return user;
};
