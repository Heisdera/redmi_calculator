const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let output = "";

// adding click event listener for each button
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const btnValue = btn.textContent;
    
    if (btnValue === "AC") {
      output = ""; // clear everything on display
    } else if (btnValue === "DEL") {
      output = output.toString().slice(0, -1); // convert to string and remove the last value
    } else if (btnValue === "=" && output !== "") {
      calculateResult(); // calculate the output when = is clicked
    } else if (btnValue === "=") {
      output = ""; // when = is clicked first don't do anything
    } else if (btnValue === "–") {
      (output += btnValue.replace("–", "-")) && calculateResult(); // on click append output, replace – with regular minus sign - and calculate the output
    } else output += btnValue;
    
    display.value = output;
  });
});

function calculateResult() {
  display.value = output;

  if (output.includes("÷") || output.includes("×") || output.includes("%")) {
    output = eval(allReplace(output, { "÷": "/", "×": "*", "%": "/100" }));
  } else output = eval(output); // else just evaluate the output
}

// after discovering that I was using .replace() in wrong instances and had some issues while calculating or equals sign doesn't respond sometimes i had to visit my best friends google and stackoverflow to figure out how to create a function that can replace multiple characters with different multiple characters :)
function allReplace(str, obj) {
  for (const x in obj) {
    str = str.replace(new RegExp(x, "g"), obj[x]);
  }
  return str;
}
