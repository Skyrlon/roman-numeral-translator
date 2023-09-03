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
  number
    .split("")
    .forEach(
      (e) =>
        (translatedNumber =
          translatedNumber + numeralsList.find((x) => x.roman === e).arab)
    );
  resultElement.textContent = translatedNumber;
}
