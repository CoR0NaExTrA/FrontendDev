const ExpressionToRPN = (Expr:string): string => {
    const exprs: string[] = Expr.split("");
    let current: string = "";
    const StackRpn: string[] = [];

    let priority: number = 0;
    for (const expr of exprs) {
        priority = getP(expr);

        if (priority === -2)
        {
            console.log("Invalid expression");
            break;
        }

        if (priority === 0)
        {
            current += expr;
        }

        if (priority === 1)
        {
            StackRpn.push(expr);
        }

        if (priority > 1)
        {
            current += ' ';

            while (!(StackRpn.length === 0))
            {
                if(getP(StackRpn[StackRpn.length - 1]) >= priority) 
                {
                    current += StackRpn.pop();
                }

                else 
                {
                    break;
                }
            }

            StackRpn.push(expr);
        }

        if (priority === -1)
        {
            current += ' ';

            while(getP(StackRpn[StackRpn.length - 1]) != 1)
            {
                current += StackRpn.pop();
            }

            StackRpn.pop();
        }
    }

    while (!(StackRpn.length === 0))
        {
            current += StackRpn.pop();
        }

    return current;
};

const RPNToAnswer = (Rpn:string): number =>
{
    let operand: string = "";
    const StackAns: number[] = [];

    for (let i = 0; i < Rpn.length; i++) 
    {
        if (Rpn[i] === ' ')
        {
            continue;
        }

        if (getP(Rpn[i]) === 0)
        {
            while(Rpn[i] != ' ' && getP(Rpn[i]) === 0)
            {
                operand += Rpn[i++];
            }
                
            StackAns.push(parseInt(operand));

            operand = "";
        }

        if (getP(Rpn[i]) > 1)
        {
            const a: number= StackAns.pop() as number;
            const b: number = StackAns.pop() as number;

            if (Rpn[i] === '+')
            {
                StackAns.push(b+a);
            }
            if (Rpn[i] === '-')
            {
                StackAns.push(b-a);
            }
            if (Rpn[i] === '*')
            {
                StackAns.push(b*a);
            }
            if (Rpn[i] === '/')
            {
                StackAns.push(b/a);
            }    
        }
    }

    return StackAns.pop() as number;
};

const getP = (token:string): number => {
    switch ( token ) 
    {
        case '*' || '/':
            return 3;
        case '+' || '-':
            return 2;
        case '(':
            return 1;
        case ')':
            return -1;
        case '0' || '1' || '2' || '3' || '4' || '5' || '6' || '7' || '8' || '9' || ' ': 
            return 0;
        default:
            return -2;
     }      
};

const MyStr: string = "(f+2)*2";
console.log(RPNToAnswer(ExpressionToRPN(MyStr)));