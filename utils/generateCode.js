const generateCode = (codeLenght) => {

    const number = String(Math.random()).split(".")[1].split("");
    const length = number.length;
    let code = "";

    if (!codeLenght) {
        codeLenght = 4;
    }

    for (let i = 0; i < codeLenght; i++) {
        code = code + number[length - (i + 1)];
    }

    return code;

}

module.exports = generateCode;