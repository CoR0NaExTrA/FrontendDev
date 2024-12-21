import { ReactNode } from "react"

type ButtonProps = {
    text: ReactNode,
    onClick: () => void,
    className: string,
}

function Button({text, onClick, className}: ButtonProps) {
    return (
        <button className={className} onClick={onClick}>{text}</button>
    )
}

export {
    Button
}