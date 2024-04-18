class AuthManager {

  constructor() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username'); // Get username from localStorage

    if (token && userId) {
      this.isAuthenticated = true;
      this.authToken = token;
      this.userId = userId;
      this.username = username; // Set username from localStorage
    } else {
      this.isAuthenticated = false;
      this.authToken = null;
      this.userId = null;
      this.username = null; // Initialize username as null
    }
  }

  login = (token, id, username) => {
    this.isAuthenticated = true;
    this.authToken = token;
    this.userId = id;
    this.username = username; // Set username

    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
    localStorage.setItem('username', username); // Save username to localStorage
  };

  logout = () => {
    this.isAuthenticated = false;
    this.authToken = null;
    this.userId = null;
    this.username = null; // Reset username

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username'); // Remove username from localStorage
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
    return this.username; // Get username
  };

  refresh = () => {
    console.log("AuthManager: refresh")
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username'); // Refresh username from localStorage

    if (token && userId) {
      this.isAuthenticated = true;
      this.authToken = token;
      this.userId = userId;
      this.username = username; // Set refreshed username
    }
  }

}

const authManagerInstance = new AuthManager();

export default authManagerInstance;
