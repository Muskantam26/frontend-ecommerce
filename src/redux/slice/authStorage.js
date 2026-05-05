export const saveUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  return user && token ? { user: JSON.parse(user), token } : null;
};

export const removeUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};