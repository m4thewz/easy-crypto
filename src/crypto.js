let coder = [
    [4, 7],
    [3, 5],
];
let decoder = [
    [-5, 7],
    [3, -4],
];

function charToNumber(char) {
    if (typeof (char) != "string") return null
    if (/^[a-z]$/.test(char.toLowerCase())) {
        return char.toUpperCase().charCodeAt(0) - 64;
    }
    else {
        switch (char) {
            case ".":
                return 27
            case " ":
                return 28
            case "?":
                return 29
            case "#":
                return 30
            case "!":
                return 31
        }
    }

}

function numberToChar(number) {
    if (isNaN(number)) return null
    if (number <= 26) {
        return String.fromCharCode(number + 64).toLowerCase();
    }
    else {
        switch (number) {
            case 27:
                return "."
            case 28:
                return " "
            case 29:
                return "?"
            case 30:
                return "#"
            case 31:
                return "!"
        }
    }
}
function multiply(matrixA, matrixB) {
    var rowsA = matrixA.length; // Adicionar var ou let
    var columnsA = matrixA[0].length; // Adicionar var ou let
    var columnsB = matrixB[0].length; // Adicionar var ou let

    if (matrixA[0].length != matrixB.length) return null;

    const result = new Array(rowsA);
    for (let i = 0; i < rowsA; i++) {
        result[i] = new Array(columnsB).fill(0);
    }

    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < columnsB; j++) {
            for (let k = 0; k < columnsA; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }

    return result;
}

function convertMessage(matrix, option) {
    let result = new Array()
    let func = option == "char" ? charToNumber : numberToChar
    for (let line of matrix) {
        let tempResult = new Array()
        for (let item of line) {
            tempResult.push(func(item))
        }
        result.push(tempResult)
    }
    return result
}

function crypto(message, method) {
    let matrix = method == "code" ? coder : decoder
    return multiply(matrix, message)
}


export default {
    name: 'App',
    data() {
        return {
            encryptMessage: "",
            decryptMessage: [
                ["1", "2"],
                ["3", "4"]
            ],
            encryptedMessage: null,
            decryptedMessage: "",
            language: "pt",
            texts: {
                "en": {
                    description: "This site offers an easy way to encrypt and decrypt your messages",
                    firstH2: "Enter your message to be encrypted:",
                    encrypt: "Encrypt",
                    secondH2: "Enter your message to be decrypted:",
                    addColumn: "Add 1 column",
                    removeColumn: "Remove 1 column",
                    decrypt: "Decrypt",
                    made: "Made by",
                    change: "Mudar linguagem para português"
                },
                "pt": {
                    description: "Esse site oferece uma maneira fácil de criptografar e descriptografar suas mensagens",
                    firstH2: "Digite sua mensagem para ser criptografada",
                    encrypt: "Criptografar",
                    secondH2: "Digite sua mensagem para ser descriptografada:",
                    addColumn: "Adicionar 1 coluna",
                    removeColumn: "Remover 1 coluna",
                    decrypt: "Descriptografar",
                    made: "Feito por",
                    change: "Change language to english"
                }
            }

        }
    },
    methods: {

        addColumn() {
            this.decryptMessage[0].push("0")
            this.decryptMessage[1].push("0")
        },
        removeColumn() {
            if (this.decryptMessage[0].length > 2) {
                this.decryptMessage[0].pop()
                this.decryptMessage[1].pop()
            }
        },
        validateEncrypt() {
            this.encryptMessage = this.encryptMessage.replace(/\d/g, '');
        },
        validateDecrypt(rowIndex, colIndex) {
            let inputValue = this.decryptMessage[rowIndex][colIndex];
            inputValue = inputValue.replace(/\D/g, '');
            inputValue = inputValue.slice(0, 4);
            this.decryptMessage[rowIndex][colIndex] = inputValue;
        },
        moveToNextInput(event, rowIndex, colIndex) {
            // Verifica se a tecla pressionada foi Enter (código 13)
            if (event.keyCode === 13) {
                // Calcula o índice do próximo input
                const nextRowIndex = colIndex === this.decryptMessage[rowIndex].length - 1 ? rowIndex + 1 : rowIndex;
                const nextColIndex = colIndex === this.decryptMessage[rowIndex].length - 1 ? 0 : colIndex + 1;

                // Move o foco para o próximo input se existir
                if (this.decryptMessage[nextRowIndex] && this.decryptMessage[nextRowIndex][nextColIndex]) {
                    this.$nextTick(() => {
                        const nextInput = document.querySelector(`input[data-row="${nextRowIndex}"][data-col="${nextColIndex}"]`);
                        nextInput.value = ""
                        nextInput.focus();
                    });
                }
            }
        },
        encryptText() {
            var message = this.encryptMessage
            var messageArray = message.split("")
            var isOdd = messageArray.length % 2 !== 0 // Corrigir para verificar se é ímpar
            var indexToSplit = Math.floor(messageArray.length / 2);
            let first = []
            let second = []
            if (isOdd) {
                first = messageArray.slice(0, indexToSplit + 1);
                second = messageArray.slice(indexToSplit + 1);
                second.push(" ")
            } else {
                first = messageArray.slice(0, indexToSplit);
                second = messageArray.slice(indexToSplit);
            }

            let matrix = [first, second]
            this.encryptedMessage = matrix
            console.log(convertMessage(matrix, "char"))
            console.log(crypto(convertMessage(matrix, "char"), "code"))
            this.encryptedMessage = crypto(convertMessage(matrix, "char"), "code")
        },
        decryptText() {
            this.decryptedMessage = ""
            var message = this.decryptMessage
            var decryptedMessageMatrix = convertMessage(crypto(message, "decode"), "number")
            for (let line of decryptedMessageMatrix) {
                for (let char of line) {
                    this.decryptedMessage += char
                }
            }
        }
    }
}