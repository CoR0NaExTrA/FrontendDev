var ExpressionToRPN = function (Expr) {
    var exprs = Expr.split("");
    var current = "";
    var StackRpn = [];
    var StackStaple = [];
    var priority = 0;
    for (var _i = 0, exprs_1 = exprs; _i < exprs_1.length; _i++) {
        var expr = exprs_1[_i];
        priority = getP(expr);
        if (priority === -2) {
            console.log("Invalid expression");
            break;
        }
        if (priority === 0) {
            current += expr;
        }
        if (priority === 1) {
            StackRpn.push(expr);
            StackStaple.push(expr);
        }
        if (priority > 1) {
            current += ' ';
            while (!(StackRpn.length === 0)) {
                if (getP(StackRpn[StackRpn.length - 1]) >= priority) {
                    current += StackRpn.pop();
                }
                else {
                    break;
                }
            }
            StackRpn.push(expr);
        }
        if (priority === -1) {
            StackStaple.pop();
            current += ' ';
            while (getP(StackRpn[StackRpn.length - 1]) != 1) {
                current += StackRpn.pop();
            }
            StackRpn.pop();
        }
        if (StackStaple.length != 0) {
            console.log("The closing parenthesis is missing");
            break;
        }
    }
    while (!(StackRpn.length === 0)) {
        current += StackRpn.pop();
    }
    return current;
};
var RPNToAnswer = function (Rpn) {
    var operand = "";
    var StackAns = [];
    for (var i = 0; i < Rpn.length; i++) {
        if (Rpn[i] === ' ') {
            continue;
        }
        if (getP(Rpn[i]) === 0) {
            while (Rpn[i] != ' ' && getP(Rpn[i]) === 0) {
                operand += Rpn[i++];
            }
            StackAns.push(parseFloat(operand));
            operand = "";
        }
        if (getP(Rpn[i]) > 1) {
            var a = StackAns.pop();
            var b = StackAns.pop();
            if (Rpn[i] === '+') {
                StackAns.push(b + a);
            }
            if (Rpn[i] === '-') {
                StackAns.push(b - a);
            }
            if (Rpn[i] === '*') {
                StackAns.push(b * a);
            }
            if (Rpn[i] === '/') {
                if (a != 0) {
                    StackAns.push(b / a);
                }
                else {
                    console.log("You can't divide by zero");
                }
            }
        }
    }
    return StackAns.pop();
};
var getP = function (token) {
    switch (token) {
        case '*':
        case '/':
            return 3;
        case '+':
        case '-':
            return 2;
        case '(':
            return 1;
        case ')':
            return -1;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case ' ':
            return 0;
        default:
            return -2;
    }
};
var MyStr = "- (- (* (/ 15 (- 7 2)) 3) (* (* (+ 2 (+ 1 1)) (/ 15 (- 7 (+ 200 1)))) 3)) (* (+ 2 (+ 1 1)) (- (+ (- (* (/ 15 (- 7 2)) 3) (+ 2 (+ 1 1))) (* (/ 15 (- 7 2)) 3)) (+ 2 (+ 1 1))))";
//const MyStr: string = "2-2";
console.log(RPNToAnswer(ExpressionToRPN("2+2 (")));
