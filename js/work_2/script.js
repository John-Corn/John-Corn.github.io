//Variables that prompt the user at the start of the page and values the user adds are saved to the said variable.
const luku = parseFloat(prompt('Enter a number:'));
const operaattori = prompt('Enter operator (Either +, -, * or /):');
const luku2 = parseFloat(prompt('Enter another number:'));

//Variable where we store the outcome of the calculations.
let sum;

//Checks what operator user has inputted and calculates the numbers according to it.
if (operaattori == "+"){
    sum = luku + luku2;
}else if (operaattori == "-"){
    sum = luku - luku2;
}else if (operaattori == "*"){
    sum = luku * luku2;
}else if (operaattori == "/"){
    sum = luku / luku2;
}else {
    //If operator is not any of the said opeators it is an error then.
    console.log("ERROR!! NOT RIGHT OPERATOR");
}

//Shows calucation on console.
console.log(`${luku} ${operaattori} ${luku2} = ${sum}`);