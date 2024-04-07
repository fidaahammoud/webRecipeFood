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
 // return "214|QQDkmfnHom7pOKjfpOs7hRCmYuVW1oN4gGid3XUI6fb195ae"
};

const getUserId = () => {
   return userId;
  //return "7"
};

export { login, logout, getIsAuthenticated, getAuthToken, getUserId };
