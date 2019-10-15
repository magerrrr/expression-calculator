function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    return getExpressionFromBrackets(expr);
    
    function getExpressionFromBrackets(expr){
    let stringFromExpr = '';
    let arguments = [];
    let leftArg = null;
    let rightArg = null;
    let result;
    let operation = '';
    
    stringFromExpr = expr.replace(/\s+/g, '');
    if ( stringFromExpr.indexOf('+') === 1 ) {
        operation = 'addition';
        arguments = stringFromExpr.split('+');
    } else if (stringFromExpr.indexOf('-') === 1) {
        operation = 'subtraction';
        arguments = stringFromExpr.split('-');
    } else if (stringFromExpr.indexOf('*') === 1) {
        operation = 'multiplication';
        arguments = stringFromExpr.split('*');
    }
    leftArg = Number(arguments[0]);
    rightArg = Number(arguments[1]);
    
    switch (operation) {
        case 'addition':
            result = addition(leftArg,rightArg);
            break;
    
        case 'subtraction':
            result = subtraction(leftArg,rightArg);
            break;
        case 'multiplication':
            result = multiplication(leftArg,rightArg);
            break;
    }

    function addition(a,b) {
        return a + b;
    }
    function subtraction(a,b) {
        return a - b;
    }
    function multiplication(a,b) {
        return a * b;
    }
    return result;
    }
}

module.exports = {
    expressionCalculator
}