export const contains_heb = (str) => {
    return (/[\u0590-\u05FF]/).test(str);
}
export const contains_eng = (str) => {
    return (/^[a-zA-Z]+$/).test(str);
}

export const containsNumber = (str) => {
    return /\d/.test(str);
}

export const containsSpecialChars = (str) => {
    const specialChars = /[`!@#$%^&*()_+\=\[\]{};:\\|,.<>\/?~]/;
    return specialChars.test(str);
}

export const errorString = (lang, charachterLength) => {
    return "Required Field. *Only " + lang + ". *Name Must Be Shorter Than " + charachterLength + " Characters*"
} 
