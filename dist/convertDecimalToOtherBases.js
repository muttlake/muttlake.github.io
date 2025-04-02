"use strict";
// Input Fields
const decimalNumberInput = document.getElementById("decimal-number");
const binaryNumberInput = document.getElementById("binary-number");
const hexNumberInput = document.getElementById("hex-number");
// Allowed Values in Fields
const DECIMAL_ALLOWED_VALUES = "0123456789";
const BINARY_ALLOWED_VALUES = "01";
const HEX_ALLOWED_VALUES = "0123456789ABCDEF";
const BINARY_QUARTETS_MAPPED_TO_HEX_NUMBERS = {
    "0000": "0", "0001": "1", "0010": "2", "0011": "3",
    "0100": "4", "0101": "5", "0110": "6", "0111": "7",
    "1000": "8", "1001": "9", "1010": "A", "1011": "B",
    "1100": "C", "1101": "D", "1110": "E", "1111": "F"
};
const HEX_NUMBERS_MAPPED_TO_BINARY_QUARTETS = {
    "0": "0000", "1": "0001", "2": "0010", "3": "0011",
    "4": "0100", "5": "0101", "6": "0110", "7": "0111",
    "8": "1000", "9": "1001", "A": "1010", "B": "1011",
    "C": "1100", "D": "1101", "E": "1110", "F": "1111"
};
// Maximum Value = 2^32 = 100000000000000000000000000000000 (binary) = 429496729610 (decimal) = 100000000 (hexadecimal)
const DECIMAL_MAX_CHARACTERS = 12;
const BINARY_MAX_CHARACTERS = 33;
const HEX_MAX_CHARACTERS = 9;
// Cleaning Input
function cleanInput(input, allowedCharacters) {
    let cleanedInput = "";
    for (let x = 0; x < input.length; x++) {
        if (allowedCharacters.includes(input[x])) {
            cleanedInput += input[x];
        }
    }
    return cleanedInput;
}
function cleanZerosStartPadding(inputStr) {
    let inputStrCleaned = "";
    let nonZeroCharFound = false;
    for (let x = 0; x < inputStr.length; x++) {
        if (inputStr.at(x) != "0" || nonZeroCharFound) {
            inputStrCleaned += inputStr.at(x);
            if (!nonZeroCharFound)
                nonZeroCharFound = true;
        }
    }
    return inputStrCleaned;
}
//** Maximum Value: 2^32 = 100000000000000000000000000000000 (base2) = 4294967296 (base10) = 100000000 (base16)
function setMaximumValue(inputValue, numType) {
    let clippedValue = inputValue;
    if (numType == "BINARY") {
        if (inputValue.length >= 33) {
            clippedValue = "100000000000000000000000000000000";
        }
    }
    else if (numType == "DECIMAL") {
        if (inputValue.length >= 10) {
            const inputValueNbr = Number(inputValue);
            if (inputValueNbr >= 4294967296) {
                clippedValue = `${4294967296}`;
            }
        }
    }
    else // numType == "HEXADECIMAL"
     {
        if (inputValue.length >= 9) {
            clippedValue = "100000000";
        }
    }
    return clippedValue;
}
function splitBinaryIntoFours(input) {
    let inputStringSplitIntoFours = "";
    let counter = 1;
    if (input.length % 4 != 0) {
        const stringLengthPaddedToMultipleOfFour = input.length + (4 - input.length % 4);
        input = input.padStart(stringLengthPaddedToMultipleOfFour, "0");
    }
    for (let x = input.length - 1; x >= 0; x--) {
        if (counter % 4 == 0) {
            inputStringSplitIntoFours = " " + input.at(x) + inputStringSplitIntoFours;
        }
        else {
            inputStringSplitIntoFours = input.at(x) + inputStringSplitIntoFours;
        }
        counter++;
    }
    if (inputStringSplitIntoFours.at(0) === " ")
        inputStringSplitIntoFours = inputStringSplitIntoFours.slice(1);
    return inputStringSplitIntoFours;
}
// Conversions
function convertBinaryToDecimal(inputBinary) {
    let decimalNumber = 0;
    let power = inputBinary.length - 1;
    for (let x = 0; x < inputBinary.length; x++) {
        const inputBinaryDigit = Number(inputBinary.at(x));
        decimalNumber += inputBinaryDigit * Math.pow(2, power);
        power--;
    }
    return decimalNumber;
}
function convertBinaryToHex(inputBinary) {
    let inputBinaryPaddedToAMultipleOfFourLength = inputBinary;
    if (inputBinary.length % 4 > 0) {
        const remainderToPadToMultipleOfFourLength = 4 - inputBinary.length % 4;
        for (let x = 0; x < remainderToPadToMultipleOfFourLength; x++) {
            inputBinaryPaddedToAMultipleOfFourLength = "0" + inputBinaryPaddedToAMultipleOfFourLength;
        }
    }
    let hexNumber = "";
    for (let y = 0; y < inputBinaryPaddedToAMultipleOfFourLength.length; y += 4) {
        const splitValue = inputBinaryPaddedToAMultipleOfFourLength.substring(y, y + 4);
        hexNumber += BINARY_QUARTETS_MAPPED_TO_HEX_NUMBERS[splitValue];
    }
    if (hexNumber.at(0) === "0")
        hexNumber = hexNumber.slice(1);
    return hexNumber;
}
function convertDecimalToBinary(inputDecimal) {
    let decimalNumber = Number(inputDecimal);
    // Binary Number Digits: ABCD, all digits 1 or 0
    // Binary Number Formula X = A*2^3 + B*2^2 + C*2^1 + D*2^0
    //                         = 2 * (A*2^2 + B*2^1 + C*2^0 + D)
    //                     X/2 = A*2^2 + B*2^1 + C*2^0 + D
    //                 (X/2)%2 = D
    let binaryString = "";
    while (decimalNumber > 0) {
        const halfDecimalFloor = Math.floor(decimalNumber / 2);
        const remainderTwo = decimalNumber - (halfDecimalFloor * 2); // will be 1 or 0
        binaryString = `${remainderTwo}` + binaryString;
        decimalNumber = halfDecimalFloor;
    }
    return binaryString;
}
function convertHexToBinary(hexNbrStr) {
    let binaryNbrStr = "";
    for (let x = 0; x < hexNbrStr.length; x++) {
        binaryNbrStr += HEX_NUMBERS_MAPPED_TO_BINARY_QUARTETS[hexNbrStr.substring(x, x + 1)];
    }
    return binaryNbrStr;
}
// Event Listeners
decimalNumberInput.addEventListener("keyup", () => {
    if (decimalNumberInput.value.length == 0) {
        binaryNumberInput.value = "";
        hexNumberInput.value = "";
    }
    else {
        let cleanedInput = cleanInput(decimalNumberInput.value.toUpperCase(), DECIMAL_ALLOWED_VALUES);
        cleanedInput = setMaximumValue(cleanedInput, "DECIMAL");
        const binaryValue = convertDecimalToBinary(cleanedInput);
        // Set values
        decimalNumberInput.value = cleanedInput;
        binaryNumberInput.value = splitBinaryIntoFours(binaryValue);
        hexNumberInput.value = `${convertBinaryToHex(binaryValue)}`;
    }
});
binaryNumberInput.addEventListener("keyup", () => {
    if (binaryNumberInput.value.length == 0) {
        decimalNumberInput.value = "";
        hexNumberInput.value = "";
    }
    else {
        let cleanedInput = cleanZerosStartPadding(binaryNumberInput.value.toUpperCase());
        cleanedInput = cleanInput(cleanedInput, BINARY_ALLOWED_VALUES);
        cleanedInput = setMaximumValue(cleanedInput, "BINARY");
        // Set Values
        binaryNumberInput.value = splitBinaryIntoFours(cleanedInput);
        decimalNumberInput.value = `${convertBinaryToDecimal(cleanedInput)}`;
        hexNumberInput.value = convertBinaryToHex(cleanedInput);
    }
});
hexNumberInput.addEventListener("keyup", () => {
    if (hexNumberInput.value.length == 0) {
        decimalNumberInput.value = "";
        binaryNumberInput.value = "";
    }
    else {
        let cleanedInput = cleanInput(hexNumberInput.value.toUpperCase(), HEX_ALLOWED_VALUES);
        cleanedInput = setMaximumValue(cleanedInput, "HEXADECIMAL");
        const binaryNbrStr = convertHexToBinary(cleanedInput);
        //set values
        decimalNumberInput.value = `${convertBinaryToDecimal(binaryNbrStr)}`;
        binaryNumberInput.value = splitBinaryIntoFours(binaryNbrStr);
        hexNumberInput.value = cleanedInput;
    }
});
