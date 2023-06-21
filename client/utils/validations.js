export const isValidName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };
  
  export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isValidPhone = (phone) => {
    const phoneRegex = /^\d{8,15}$/;
    return phoneRegex.test(phone);
  };
  
  export const isValidAreaCode = (areaCode) => {
    const areaCodeRegex = /^\d{3}$/;
    return areaCodeRegex.test(areaCode);
  };
  
  export const isValidPassword = (password) => {
    const passwordRegex = /^[a-z]{8,16}$/;
    return passwordRegex.test(password);
  };
  