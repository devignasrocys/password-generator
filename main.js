const dom_strings = {
  generated_password: document.getElementById("generated-password"),
  ranger_bar: document.getElementById("range-bar"),
  character_length: document.getElementById("character_length"),
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  numbers: document.getElementById("numbers"),
  symbols: document.getElementById("symbols"),
  password_strength: document.getElementById("strengthness"),
  generate_button: document.getElementById("btn"),
  strength_cells: document.querySelectorAll("cell"),
};

const generetPassword = (range) => {
  const arrWithLetters = "abcdefghijklmnoprstuywzq".split("");
  const arrWithUpperLetters = "ABCDEFGHIJKLMNOPRDSTUWQZX".split("");
  const arrWithNumbers = "0123456789".split("");
  const arrWithSymbols = "!@#$%^&*()_=+".split("");
  let tempArr = [];
  let password = [];
  let password_strength = {
    too_weak: true,
    weak: false,
    medium: false,
    strong: false,
    counter: 0

  };
  for (let i = 0; i < range; i++) {
    if (dom_strings.uppercase.checked) {
      tempArr.push(arrWithUpperLetters[i]);
      password_strength.too_weak = true;
    }
    if (dom_strings.lowercase.checked) {
      tempArr.push(arrWithLetters[i]);
      password_strength.weak = true;
    }
    if (dom_strings.numbers.checked) {
      tempArr.push(arrWithNumbers[Math.floor(Math.random() * 9)]);
      password_strength.medium = true;
    }
    if (dom_strings.symbols.checked) {
      tempArr.push(arrWithSymbols[Math.floor(Math.random() * 12)]);
      password_strength.strong = true;
    }
    tempArr.push(arrWithLetters[Math.floor(Math.random() * 20)]);
    
    if (
      !dom_strings.uppercase.checked &&
      !dom_strings.lowercase.checked &&
      !dom_strings.numbers.checked &&
      !dom_strings.symbols.checked
    ) {
      tempArr.push(arrWithLetters[Math.floor(Math.random() * 20)]);
    }
  }
  for (let i = 0; i < range; i++) {
    password.push(tempArr[Math.floor(Math.random() * tempArr.length)]);
  } 
  for (const key in password_strength) {
    if(password_strength[key]  === true ) {password_strength.counter  += 1}
  }
  return {
    password: password.join(""),
    strength: password_strength.counter,
  };
};
const updateUIpassword = (password) => {
    dom_strings.generated_password.innerText = password;
}
const updateUIstrenghtness = (strength) => {
    dom_strings.strength_cells.forEach(cell => {
        cell.classList.remove('red');
        cell.classList.remove('orange');
        cell.classList.remove('yellow');
        cell.classList.remove('green');
    })

    if(strength === 1) {
        dom_strings.password_strength.innerText = 'TOO WEAK' 
        dom_strings.strength_cells[0].classList.add('red');
    }
    if(strength === 2) {
        dom_strings.password_strength.innerText = 'WEAK';
        dom_strings.strength_cells[0].classList.add('orange');
        dom_strings.strength_cells[1].classList.add('orange');
    }
    if(strength === 3) {
        dom_strings.password_strength.innerText = 'MEDIUM'; 
        dom_strings.strength_cells[0].classList.add('yellow');
        dom_strings.strength_cells[1].classList.add('yellow');
        dom_strings.strength_cells[2].classList.add('yellow');
    }
    if(strength === 4) {
        dom_strings.password_strength.innerText = 'STRONG';
        dom_strings.strength_cells[0].classList.add('green');
        dom_strings.strength_cells[1].classList.add('green');
        dom_strings.strength_cells[2].classList.add('green');
        dom_strings.strength_cells[3].classList.add('green');
    }
}

dom_strings.generate_button.addEventListener("click", (e) => {
  e.preventDefault();
  let password = generetPassword(dom_strings.ranger_bar.value);
  updateUIpassword(password.password)
  updateUIstrenghtness(password.strength)
});

dom_strings.ranger_bar.addEventListener('change', (e) => {
    character_length.innerText = dom_strings.ranger_bar.value;
})
