class AuthManager {

  constructor() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username'); 
    const notificationStatus = localStorage.getItem('notificationStatus'); 

    if (token && userId) {
      this.isAuthenticated = true;
      this.authToken = token;
      this.userId = userId;
      this.username = username; 
      this.notificationStatus = notificationStatus === 'true';

    } else {
      this.isAuthenticated = false;
      this.authToken = null;
      this.userId = null;
      this.username = null; 
      this.notificationStatus = true;
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
    this.notificationStatus = null; 

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username'); 
    localStorage.removeItem('notificationStatus'); 

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
  getNotificationStatus = () => {
    return this.notificationStatus;
  };
  setNotificationStatus = (status) => {
    this.notificationStatus = status;
    localStorage.setItem('notificationStatus', status);

  };

  refresh = () => {
    console.log("AuthManager: refresh")
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username'); 
    const notificationStatus = localStorage.getItem('notificationStatus'); 

    if (token && userId) {
      this.isAuthenticated = true;
      this.authToken = token;
      this.userId = userId;
      this.username = username;
      this.notificationStatus = notificationStatus;

      
    }
  }

}

const authManagerInstance = new AuthManager();

export default authManagerInstance;
