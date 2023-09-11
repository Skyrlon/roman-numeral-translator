const romanNumeralInput = document.querySelector("#roman-numeral");
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
  translateNumber(romanNumeralInput.value);
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
