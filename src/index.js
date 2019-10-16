function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    return getExpressionFromBrackets(expr);
    
    function getExpressionFromBrackets(expr){
    let stringFromExpr = '';
    let result;
    
    let divis = null;
    let multi = null;
    let plus = null;
    let minus = null;

    stringFromExpr = deleteSpaces(expr);

    divis = getCountDivision(stringFromExpr);
    multi = getCountMultiplication(stringFromExpr);
    plus = getCountPlus(stringFromExpr);
    minus = getCountMinus(stringFromExpr);

    for(let i=0; i < divis; i++){
        stringFromExpr = checkStringDevision(stringFromExpr);
        divis--;
    }

    for(let i=0; i < multi; i++){
        stringFromExpr = checkStringMultiply(stringFromExpr);
        multi--;
    }

    for(let i=0; i < plus; i++){
        stringFromExpr = checkStringAddition(stringFromExpr);
        plus--;
    }

    for(let i=0; i < minus; i++){
        stringFromExpr = checkStringSubstraction(stringFromExpr);
        minus--;
    }

    stringFromExpr = Number(stringFromExpr);
    stringFromExpr = stringFromExpr.toFixed(4);
    result = Number(stringFromExpr);

    //-------------------------------------------------------------------------
    //---Функции для подсчета:
    function addition(a,b) {
        return a + b;
    }
    function subtraction(a,b) {
        return a - b;
    }
    function multiplication(a,b) {
        return a * b;
    }
    function division(a,b) {
        if (b !== 0 ) {
            return a / b;
        } else {
            throw new Error("TypeError: Division by zero.") ;
        }
    }
    //---------------------------------------------------------------------------
    //---Функции получения количества знаков в выражении:
    function getCountDivision(string) {
        count = 0;
        pos = string.indexOf('/');
        while ( pos != -1 ) {
            count++;
            pos = string.indexOf('/',pos+1);
        }
        return count;
    }
    function getCountMultiplication(string) {
        count = 0;
        pos = string.indexOf('*');
        while ( pos != -1 ) {
            count++;
            pos = string.indexOf('*',pos+1);
        }
        return count;
    }
    function getCountPlus(string) {
        count = 0;
        pos = string.indexOf('+');
        while ( pos != -1 ) {
            count++;
            pos = string.indexOf('+',pos+1);
        }
        return count;
    }
    function getCountMinus(string) {
        count = 0;
        pos = string.indexOf('-');
        while ( pos != -1 ) {
            count++;
            pos = string.indexOf('-',pos+1);
        }
        return count;
    }
    //---------------------------------------------------------------------------

    //---Функции для поиска символа и действий с соседними элементами:
    function deleteSpaces(string) {
        return string.replace(/\s+/g, '');
    }

    function getLeftandRightPartOfExpressionByDevision(string) {
        return string.split('/');
    }
    function getLeftandRightPartOfExpressionByMultiplicants(string) {
        return string.split('*');
    }
    function getLeftandRightPartOfExpressionByAddition(string) {
        return string.split('+');
    }
    function getLeftandRightPartOfExpressionBySubstraction(string) {
        return string.split('-');
    }

    function getLeftNumber(string) {
        let leftElement = string[0]; 
        leftElement = leftElement.match(/-?\d+\.*\d*$/m);
        let number = Number(leftElement[0]);
        return number;
    }
    
    function getRightNumber(string) {
    let rightElement = string[1];
    if (rightElement.length === null) {
        return string;
    }
    rightElement = rightElement.match(/-?\d+\.*\d*/m);
    rightElement[0];
    let number = Number(rightElement[0]);

        return number;
    }

    function deleteElementsFromStringDevision(string, leftNumber, rightNumber, result ) {
        leftNumberInString = String(leftNumber);
        rightNumberInString = String(rightNumber);

        string = string.replace(rightNumberInString, '');
        string = string.replace(leftNumberInString, result);
        string = string.replace(/\//m , '');

        return string;
    }

    function deleteElementsFromStringMultiplicants(string, leftNumber, rightNumber, result ) {
        leftNumberInString = String(leftNumber);
        rightNumberInString = String(rightNumber);

        string = string.replace(rightNumberInString, ''); 
        string = string.replace(leftNumberInString, result); 
        string = string.replace(/\*/m , '');
        return string;
    }

    function deleteElementsFromStringAddition(string, leftNumber, rightNumber, result ) {
        leftNumberInString = String(leftNumber);
        rightNumberInString = String(rightNumber);

        string = string.replace(rightNumberInString, '');
        string = string.replace(leftNumberInString, result);
        string = string.replace(/\+/m , '');
        return string;
    }
    function deleteElementsFromStringSubtraction(string, leftNumber, rightNumber, result ) {
        leftNumberInString = String(leftNumber);
        rightNumberInString = String(rightNumber);

        string = string.replace(leftNumberInString, result);
        string = string.replace(rightNumberInString, '');
        string = string.replace(/\-/m , ''); 
        return string;
    }
    //---------------------------------------------------------------------------
    
    //---Функции для проверки элементов строки на знаки:

    function checkStringDevision(stringFromExpr) {
        for (let i = 0; i < stringFromExpr.length; i++) {
            let symbol = stringFromExpr[i];
    
            if (symbol === '/') {
                changedStringFromExpr = getLeftandRightPartOfExpressionByDevision(stringFromExpr);
                leftNumber = getLeftNumber(changedStringFromExpr);
                rightNumber = getRightNumber(changedStringFromExpr);
                result = division(leftNumber,rightNumber);
                stringFromExpr = deleteElementsFromStringDevision(stringFromExpr, leftNumber, rightNumber, result); 
            } 
        }
        return stringFromExpr;
    }

    function checkStringMultiply(stringFromExpr) {
        for (let i = 0; i < stringFromExpr.length; i++) { 
            let symbol = stringFromExpr[i];
            
            if (symbol === '*') {
                changedStringFromExpr = getLeftandRightPartOfExpressionByMultiplicants (stringFromExpr);
                leftNumber = getLeftNumber(changedStringFromExpr); // 62
                rightNumber = getRightNumber(changedStringFromExpr); // 33
                result = multiplication(leftNumber,rightNumber); // 1.878787878787879
                stringFromExpr = deleteElementsFromStringMultiplicants(stringFromExpr, leftNumber, rightNumber, result); // 84+1.878787878787879*10+15
            } 
        }
        return stringFromExpr;
    }

    function checkStringAddition(stringFromExpr) {
        for (let i = 0; i < stringFromExpr.length; i++) { //цикл проверки элементов строки на знак /
            let symbol = stringFromExpr[i];
            
            if (symbol === '+') {
                changedStringFromExpr = getLeftandRightPartOfExpressionByAddition(stringFromExpr);
                leftNumber = getLeftNumber(changedStringFromExpr); // 62
                rightNumber = getRightNumber(changedStringFromExpr); // 33
                result = addition(leftNumber,rightNumber);
                stringFromExpr = deleteElementsFromStringAddition(stringFromExpr, leftNumber, rightNumber, result); // 84+1.878787878787879*10+15
            } 
        }
        return stringFromExpr;
    }
    function checkStringSubstraction(stringFromExpr) {
        for (let i = 0; i < stringFromExpr.length; i++) {
            let symbol = stringFromExpr[i];

            if (symbol === '-') {
                changedStringFromExpr = getLeftandRightPartOfExpressionBySubstraction(stringFromExpr);
                leftNumber = getLeftNumber(changedStringFromExpr);
                rightNumber = getRightNumber(changedStringFromExpr);
                result = subtraction(leftNumber,rightNumber);
                stringFromExpr = deleteElementsFromStringSubtraction(stringFromExpr, leftNumber, rightNumber, result);

            } 
        }
        return stringFromExpr;
    }
    return result;
    }
}

module.exports = {
    expressionCalculator
}
//Fot quokka (test)
//let expression = " 64 + 19 - 77 - 93 ";
//expressionCalculator(expression);