function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    stringFromExpr = expr.replace(/\s+/g, '');
  
    function getExprFromBrackets(string) {
  
      let leftBracket = string.lastIndexOf('(');
      let rightBracket = string.indexOf(')', leftBracket);
  
      if ( (rightBracket != -1 && leftBracket === -1) || (rightBracket === -1 && leftBracket != -1) ) {
        throw 'ExpressionError: Brackets must be paired';
      }
  
      let currentBracket = addition(string.substring(leftBracket + 1, rightBracket));
      currentBracket = ( currentBracket.toString() ).replace('-', 'tempMinus');
  
      let result = string.substring(0, leftBracket) + currentBracket + string.substring(rightBracket + 1);
      return result;
    }
  
    function addition(string) {
  
      let currentArray = string.split('+');
      currentArray = currentArray.map(substract);
      return currentArray.reduce( (a,b) =>  { return a + b } );
    }
  
    function substract(string) {
  
      let currentArray = string.split('-');
      currentArray = currentArray.map(multiply);
      return currentArray.reduce( (a,b) => { return a - b} );
    }
  
    function divide(string) {
  
      let currentArray = string.split('/');
      currentArray = currentArray.map((currentNumber) => {
        currentNumber = currentNumber.replace('tempMinus','-')
        return Number(currentNumber);
      });
  
      return currentArray.reduce( (a,b) => {
        if (b === 0) {
          throw 'TypeError: Division by zero.';
        } else {
          return a / b;
        }
      });
    }
  
    function multiply(string) {
  
      let currentArray = string.split('*');
      currentArray = currentArray.map(divide);
      return currentArray.reduce( (a,b) => { return a * b} );
    }
    
    while ((stringFromExpr.indexOf('(') != -1) || (stringFromExpr.indexOf(')') != -1)) {
        stringFromExpr = getExprFromBrackets(stringFromExpr);
    }
  
    return (addition(stringFromExpr));
  }

module.exports = {
    expressionCalculator
}
