class AuthManager {

  constructor() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username'); 

    if (token && userId) {
      this.isAuthenticated = true;
      this.authToken = token;
      this.userId = userId;
      this.username = username; 
    } else {
      this.isAuthenticated = false;
      this.authToken = null;
      this.userId = null;
      this.username = null; 
    }
  }

  login = (token, id, username) => {
    this.isAuthenticated = true;
    this.authToken = token;
    this.userId = id;
    this.username = username; 

    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
    localStorage.setItem('username', username); 
  };
  
  register = (token, id) => {
    this.isAuthenticated = true;
    this.authToken = token;
    this.userId = id;

    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
  };

  logout = () => {
    this.isAuthenticated = false;
    this.authToken = null;
    this.userId = null;
    this.username = null; 

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username'); 
  };

  getIsAuthenticated = () => {
    return this.isAuthenticated;
  };
  
  getAuthToken = () => {
    return this.authToken;
  };
  
  getUserId = () => {
    return this.userId;
  };

  getUsername = () => {
    return this.username; 
  };

  refresh = () => {
    console.log("AuthManager: refresh")
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username'); 

    if (token && userId) {
      this.isAuthenticated = true;
      this.authToken = token;
      this.userId = userId;
      this.username = username;
    }
  }

}

const authManagerInstance = new AuthManager();

export default authManagerInstance;
