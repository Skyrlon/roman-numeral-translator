const romanLabelElement = document.querySelector("label[for='roman-numeral']");
const arabLabelElement = document.querySelector("label[for='arab-numeral']");
const romanNumeralInput = document.querySelector("#roman-numeral");
const arabNumeralInput = document.querySelector("#arab-numeral");
const switchButtonElement = document.querySelector("#switch");
const buttonElement = document.querySelector("#submit-button");
const resultElement = document.querySelector("#result");

const numeralsList = [
  { roman: "M", arab: 1000 },
  { roman: "D", arab: 500 },
  { roman: "C", arab: 100 },
  { roman: "L", arab: 50 },
  { roman: "X", arab: 10 },
  { roman: "V", arab: 5 },
  { roman: "I", arab: 1 },
];

buttonElement.addEventListener("click", function () {
  isCorrectRomanNumeral(romanNumeralInput.value);
});

switchButtonElement.addEventListener("click", function () {
  const labelsAndInputs = [
    romanLabelElement,
    arabLabelElement,
    romanNumeralInput,
    arabNumeralInput,
  ];
  labelsAndInputs.forEach((x) => x.classList.toggle("show"));
});

function translateNumber(number) {
  let translatedNumber = 0;
  let numberArray = number.split("");
  numberArray.forEach((n, index, array) => {
    const numberData = numeralsList.find((x) => x.roman === n);
    const nextNumberData =
      index < array.length &&
      numeralsList.find((x) => x.roman === array[index + 1]);
    if (
      (nextNumberData && numberData.arab >= nextNumberData?.arab) ||
      !nextNumberData
    ) {
      translatedNumber = translatedNumber + numberData.arab;
    }
    if (nextNumberData && numberData.arab < nextNumberData.arab) {
      translatedNumber = translatedNumber - numberData.arab;
    }
  });

  resultElement.textContent = translatedNumber;
}

function isCorrectRomanNumeral(number) {
  let numberArray = number.split("");
  const areAllCorrectNumeral = numberArray.every((n) =>
    numeralsList.find((x) => x.roman === n)
  );
  const areHalfNumeralsNotBeforeFullNumerals =
    areAllCorrectNumeral &&
    numberArray.every((n, index, array) => {
      const numberData = numeralsList.find((x) => x.roman === n);
      const nextNumberData =
        index < array.length &&
        numeralsList.find((x) => x.roman === array[index + 1]);
      const isHalfNumeral =
        numberData.arab /
          Math.pow(10, numberData.arab.toString().length - 1) ===
        5;
      if (isHalfNumeral && nextNumberData?.arab > numberData.arab) {
        return false;
      } else {
        return true;
      }
    });
  if (!areAllCorrectNumeral || !areHalfNumeralsNotBeforeFullNumerals) {
    resultElement.textContent = "Incorrect number";
  } else {
    translateNumber(number);
  }
}
