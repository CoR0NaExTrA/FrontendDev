"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressionToRPN = (Expr) => {
    const exprs = Expr.split("");
    console.log(exprs);
    let current = "";
    const StackRpn = [];
    let priority = 0;
    for (const expr of exprs) {
        priority = getP(expr);
        console.log(expr, priority);
        if (priority === -2) {
            console.log("Invalid expression");
            break;
        }
        if (priority === 0) {
            current += expr;
        }
        if (priority === 1) {
            StackRpn.push(expr);
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
            current += ' ';
            while (getP(StackRpn[StackRpn.length - 1]) != 1) {
                current += StackRpn.pop();
            }
            StackRpn.pop();
        }
    }
    while (!(StackRpn.length === 0)) {
        current += StackRpn.pop();
    }
    return current;
};
const RPNToAnswer = (Rpn) => {
    let operand = "";
    const StackAns = [];
    for (let i = 0; i < Rpn.length; i++) {
        if (Rpn[i] === ' ') {
            continue;
        }
        if (getP(Rpn[i]) === 0) {
            while (Rpn[i] != ' ' && getP(Rpn[i]) === 0) {
                operand += Rpn[i++];
            }
            StackAns.push(parseInt(operand));
            operand = "";
        }
        if (getP(Rpn[i]) > 1) {
            const a = StackAns.pop();
            const b = StackAns.pop();
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
                StackAns.push(b / a);
            }
        }
    }
    return StackAns.pop();
};
const getP = (token) => {
    switch (token) {
        case '*':
            return 3;
        case '/':
            return 3;
        case '+':
            return 2;
        case '-':
            return 2;
        case '(':
            return 1;
        case ')':
            return -1;
        case ' ':
            return 0;
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
            return 0;
        default:
            return -2;
    }
};
const MyStr = "- (- (* (/ 15 (- 7 2)) 3) (* (* (+ 2 (+ 1 1)) (/ 15 (- 7 (+ 200 1)))) 3)) (* (+ 2 (+ 1 1)) (- (+ (- (* (/ 15 (- 7 2)) 3) (+ 2 (+ 1 1))) (* (/ 15 (- 7 2)) 3)) (+ 2 (+ 1 1))))";
console.log(RPNToAnswer(ExpressionToRPN(MyStr)));
