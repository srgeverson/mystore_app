/* eslint-disable */
export const cpfValidator = (value) => {
    var soma;
    var resto;
    soma = 0;
    if (value == "00000000000000") return false;
    for (let i = 1; i <= 9; i++) soma = soma + parseInt(value.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(value.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(value.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(value.substring(10, 11))) return false;
    return true;
}

export const cpfValidatorMask = (value) => {
    var numeroCPF = value.replace('.', '').replace('.', '').replace('-', '');
    return cpfValidator(numeroCPF);
}

export const cnpjValidatorMask = (value) => {
    var numeroNCPJ = value.replace('.', '').replace('.', '').replace('.', '').replace('/', '').replace('-', '');
    if (value == '') return false;
    return cnpjValidator(numeroNCPJ);
}

export const cnpjValidator = (value) => {
    if (value.length != 14)
        return false;

    if (value == "00000000000000")
        return false;

    tamanho = value.length - 2
    numeros = value.substring(0, tamanho);
    var digitos = value.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    var tamanho = tamanho + 1;
    var numeros = value.substring(0, tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

export const telefoneValidator = (value) => {
    return (/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/).test(value);
}