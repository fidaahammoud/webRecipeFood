class AuthManager {

  constructor() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      this.isAuthenticated= true;
      this.authToken  = token;
      this.userId = userId;
    }
    else{
      this.isAuthenticated =  false;
      this.authToken = null;
      this.userId = null
    }
  }

  login = (token, id) => {
    this.isAuthenticated= true;
    this.authToken  = token;
    this.userId = id;
   
    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
  };

  logout = () => {
    this.isAuthenticated= false;
    this.authToken  = null;
    this.userId = null;

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
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

  refresh = () => {
    console.log("AuthManager: refresh")
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      this.isAuthenticated= true;
      this.authToken  = token;
      this.userId = userId;
    }
  }

}

const authManagerInstance = new AuthManager();

export default authManagerInstance;