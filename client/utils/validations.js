export const isValidName = (name) => {
    const nameRegex = /^[A-Za-z\s]{3,12}$/;
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
    const passwordRegex = /^[a-zA-Z0-9]{8,16}$/;
    return passwordRegex.test(password);
};

export const isValidTextArea = (text) => {
    const disallowedCharsRegex = /[<>&]/;

    if (disallowedCharsRegex.test(text)) {
        return false;
    }
    return true;
};

export const isValidAddress = (address) => {
    const addressRegex = /^[A-Za-z0-9\s,.-]{4,30}$/;
    return addressRegex.test(address);
};

export const isValidZipCode = (zipCode) => {
    const zipCodeRegex = /^\d{4,5}$/;
    return zipCodeRegex.test(zipCode);
};

export const isValidDNI = (dni) => {
    const dniRegex = /^\d{8}$/;
    return dniRegex.test(dni);
};


