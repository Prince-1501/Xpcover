/**
 * isValidEmail helper method
 * @param {string} email
 * @returns {Boolean} True or False
 */
const isEmailValid = (email) => {
    const regexEx = /\S+@\S+\.\S+/;
    return regexEx.test(email);
};

/**
 * isEmpty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */

const isEmpty = (input) => {
    if(input === undefined || input === ""){
        return true;
    }
    if(input.replace(/\s/g, "").length){
        return false;
    }
    return true;
}