export const setCookie = (name:string, value:string, days:number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export const getCookie = (name: string) => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
  
      if (cookieName === name) {
        return cookieValue;
      }
    }
  
    return null;
  };