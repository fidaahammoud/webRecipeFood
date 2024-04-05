let isAuthenticated = false;
let authToken = null;
let userId = null;

const login = (token, id) => {
  isAuthenticated = true;
  authToken = token;
  userId = id;
};

const logout = () => {
  isAuthenticated = false;
  authToken = null;
  userId = null;
};

const getIsAuthenticated = () => {
  return isAuthenticated;
};

const getAuthToken = () => {
  return authToken;
};

const getUserId = () => {
  return userId;
};

export { login, logout, getIsAuthenticated, getAuthToken, getUserId };
