let calculate = "0";
let calculatePast = document.querySelector(".history");

document.querySelectorAll(".button-number").forEach(function (button) {
  button.addEventListener("click", function () {
    const number = button.textContent;

    if (calculate === "0") {
      calculate = number;
    } else {
      calculate += number;
    }

    document.querySelector(".result").textContent = calculate;
    console.log(calculate);
  });
});

document.querySelector(".button-reset").addEventListener("click", function () {
  if (calculate === "0") {
    if (calculatePast.textContent !== "0") {
      calculatePast.textContent = "0";
    }
  } else {
    calculate = "0";
  }

  document.querySelector(".result").textContent = calculate;
});

document
  .querySelector(".button-backspace")
  .addEventListener("click", function () {
    if (calculate.length > 1) {
      calculate = calculate.slice(0, -1);
    } else {
      calculate = "0";
    }

    document.querySelector(".result").textContent = calculate;
  });

document //BIKIN PERSENTASENYA RELATIF SAMA BILANGAN SEBBELUMNYA dan bener pas x + x%
  .querySelector(".button-percentage")
  .addEventListener("click", function () {
    const percentage = this.dataset.value;
    let lastChar = calculate.slice(-1);
    let firstChars = calculate.toString();

    if ("+-*/,".includes(lastChar)) {
      calculate = calculate.slice(0, -1) + percentage;
    } else {
      if ("+-*/,".includes(calculate)) {
        calculate = calculate + percentage;
      } else {
        calculate = (firstChars / 100).toString();
      }
    }

    document.querySelector(".result").textContent = calculate;
  });

document.querySelectorAll(".button-operation").forEach(function (button) {
  button.addEventListener("click", function () {
    const operation = this.dataset.value;
    let lastChar = calculate.slice(-1);

    if ("+-*/%".includes(lastChar)) {
      calculate = calculate.slice(0, -1) + operation;
    } else {
      calculate += operation;
    }

    document.querySelector(".result").textContent = calculate;
  });
});

document.querySelector(".button-comma").addEventListener("click", function () {
  calculate += this.dataset.value;
  document.querySelector(".result").textContent = calculate;
});

document.querySelector(".button-result").addEventListener("click", function () {
  //BIKIN PEMBATAS DI RESULT
  try {
    const result = Function('"use strict"; return (' + calculate + ")")();
    calculatePast.textContent = calculate;
    calculate = result.toString();

    document.querySelector(".result").textContent = calculate;
  } catch (error) {
    document.querySelector(".result").textContent = "0";
  }
});
