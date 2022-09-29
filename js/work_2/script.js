const luku = parseFloat(prompt('Enter a number:'));
const operaattori = prompt('Enter operator (Either +, -, * or /):');
const luku2 = parseFloat(prompt('Enter another number:'));

let sum;

if (operaattori == "+"){
    sum = luku + luku2;
}else if (operaattori == "-"){
    sum = luku - luku2;
}else if (operaattori == "*"){
    sum = luku * luku2;
}else if (operaattori == "/"){
    sum = luku / luku2;
}else {
    console.log("ERROR!! NOT RIGHT OPERATOR");
}


console.log(`${luku} ${operaattori} ${luku2} = ${sum}`);