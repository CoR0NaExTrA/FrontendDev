"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stack {
    // Private array to store stack elements
    constructor() {
        this.items = [];
        // Initialize the array as empty 
        //when a new stack is created
    }
    // Method to push an 
    // element onto the stack
    push(element) {
        this
            .items.push(element);
    }
    // Method to pop an 
    // element from the stack
    pop() {
        return this
            .items.pop();
    }
    // Method to peek the top element
    // of the stack without removing it
    peek() {
        return this
            .items[this.items.length - 1];
    }
    // Method to check
    // if the stack is empty
    isEmpty() {
        return this
            .items.length === 0;
    }
    // Method to get 
    // the size of the stack
    size() {
        return this
            .items.length;
    }
    // Method to
    // clear the stack
    clear() {
        this.items = [];
    }
    print() {
        console.log(this.items);
    }
}
const ExpressionToRPN = (Expr) => {
    const exprs = Expr.split("");
    let current = "";
    const StackRpn = new Stack;
    let priority = 0;
    for (const expr of exprs) {
        priority = getP(expr);
        if (priority === 0) {
            current += expr;
        }
        if (priority === 1) {
            StackRpn.push(expr);
        }
        if (priority > 1) {
            current += ' ';
            while (!StackRpn.isEmpty()) {
                if (getP(StackRpn.peek()) >= priority) {
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
            while (getP(StackRpn.peek()) != 1) {
                current += StackRpn.pop();
            }
            StackRpn.pop();
        }
    }
    while (!StackRpn.isEmpty()) {
        current += StackRpn.pop();
    }
    return current;
};
const RPNToAnswer = (Rpn) => {
    const rpns = Rpn.split("");
    let operand = "";
    const StackAns = new Stack;
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
        case '*' || '/':
            return 3;
        case '+' || '-':
            return 2;
        case '(':
            return 1;
        case ')':
            return -1;
        default:
            return 0;
    }
};
const MyStr = "(2+2)*2";
console.log(ExpressionToRPN(MyStr));
console.log(RPNToAnswer(ExpressionToRPN(MyStr)));
