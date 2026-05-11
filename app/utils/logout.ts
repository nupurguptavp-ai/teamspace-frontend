export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  
    // optional: clear everything
    // localStorage.clear();
  };