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

    stringFromExpr = expr.replace(/\s+/g, '');
    arguments = stringFromExpr.split('+');
    leftArg = Number(arguments[0]);
    rightArg = Number(arguments[1]);
    
    result = addition(leftArg,rightArg);

    function addition(a,b) {
        return a + b;
    }

    return result;
    }
}

module.exports = {
    expressionCalculator
}