export function isLoggedIn() {
    const token = localStorage.getItem("authToken"); 
    return token !== null; 
  }