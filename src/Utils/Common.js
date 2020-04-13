// palauttaa käyttäjätiedot session storagesta 
export const getUser = () => {
    const userStr = sessionStorage.getItem('user'); 
    if(userStr) return JSON.parse(userStr);
    else return null; 
} 

// palauttaa tokenin sessio storagesta 

export const getToken = () => {
    return sessionStorage.getItem('token') || null; 
}

// Poistaa tokenin ja käyttäjän session storagesta 

export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user'); 
  
}

// Tallentaa tokenin ja käyttäjän session storageen 
export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
}