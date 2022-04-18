export const Contains_heb = (str) => {
    return (/^[\u0590-\u05FF" "-]+$/).test(str);
}
export const Contains_eng = (str) => {
    return (/^[a-zA-Z" "-]+$/).test(str);
}

export const ContainsNumber = (str) => {
    return /\d/.test(str);
}

export const ContainsSpecialChars = (str) => {
    const specialChars = /[`!@#$%^&*()_+\=\[\]{};:\\|,.<>\/?~]/;
    return specialChars.test(str);
}

export const ErrorString = (lang, charachterLength) => {
    return "Required Field. *Only " + lang + ". *Name Must Be Shorter Than " + charachterLength + " Characters*"
} 
