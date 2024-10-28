let listButtons = document.querySelectorAll('.buttons button');
let lastReturn = document.querySelector('.screen .last');
let newReturn = document.querySelector('.screen .new');  

let firstNumber = null;
let newNumber = null;
let calculator = '+';

listButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        let value = button.innerText;
        switch (value) {
            case ((value.match(/[0-9]/) || {}).input):
                // add number in lastNumber
                newNumber = newNumber !== null ? newNumber + value : value;
                break;
            case '.':
                newNumber = newNumber !== null ? newNumber + value : '0.';
                break;
            case '±':
                newNumber = -1 * newNumber;
                break;
            case '%':
                newNumber = 0.01 * newNumber;
                break;
            case ((value.match(/[\+|\-|\x|\÷]/) || {}).input):
                if(newNumber){
                    if(firstNumber){
                        applyCalculator();
                    }
                    calculator = value;
                    firstNumber = newNumber;
                    newNumber = null;
                }
                break;    
            case '=':
                applyCalculator();
                firstNumber = null;
                break;  
            case 'AC':
                firstNumber = null;
                newNumber = null;
                calculator = '+';
                break;      
        }
        reloadScreen();
    })
})
const applyCalculator = () => {
   switch (calculator) {
    case '+':
        newNumber = Number(firstNumber) + Number(newNumber);
        break;
    case '-':
        newNumber = Number(firstNumber) - Number(newNumber);
        break;
    case 'x':
        newNumber = Number(firstNumber) * Number(newNumber);
        break;
    case '÷':
        newNumber = (Number(firstNumber) / Number(newNumber)).toFixed(5);
        break;
   }
}
const reloadScreen = () => {


    lastReturn.innerText = firstNumber !== null ? firstNumber + '' + calculator : '';

    newReturn.innerText = newNumber !== null ? newNumber : '';
    
}

// Add this at the end of your script.js
const modeToggle = document.getElementById('modeToggle');

modeToggle.addEventListener('change', () => {
    document.body.classList.toggle('light-mode');

    // Toggle the calculator background color
    const calculator = document.querySelector('.calculator');
    calculator.classList.toggle('light-calculator');
});

// Hide the calculator initially
document.querySelector('.calculator').style.display = 'none';

 // Remove logo and show calculator after 2 seconds
    window.onload = () => {
       setTimeout(() => {
           document.querySelector('.loading-screen').style.display = 'none'; // Hide the loading screen
           document.querySelector('.calculator').style.display = 'block'; // Show the calculator
    }, 2000); // Show after 2 seconds
}