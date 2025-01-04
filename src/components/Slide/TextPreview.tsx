import { FontFormatting, Text } from "../../store/BaseTypes"
import { CSSProperties } from "react";

type TextPreviewProps = {
    textObject: Text,
    scale: number,
}

function TextPreview({textObject, scale}: TextPreviewProps) {
    const containerStyles: CSSProperties = {
        position: 'absolute',
        margin: 0,
        transform: `translate(${textObject.pos.x * scale}px, ${textObject.pos.y * scale}px)`,
        width: `${textObject.size.width * scale}px`,
        height: `${textObject.size.height * scale}px`,
        minWidth: `${100 * scale}px`,
        minHeight: `${100 * scale}px`,
        boxSizing: "border-box",
        overflow: "clip",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

    const textStyles: CSSProperties = {
        margin: 0,
        fontSize: `${textObject.fontSize * scale}px`,
        fontFamily: textObject.fontFamily,
        fontStyle: (textObject.fontFormatting === FontFormatting.italic) ? textObject.fontFormatting : 'normal',
        fontWeight: (textObject.fontFormatting === FontFormatting.bold) ? textObject.fontFormatting : 'normal',
        textDecoration: (textObject.fontFormatting === FontFormatting.underline) ? textObject.fontFormatting : 'none',
        color: textObject.fontColor,
        textAlign: "center",
        lineHeight: 1,
        whiteSpace: "wrap",
        overflow: "hidden",
        minWidth: `${10*scale}px`,
        minHeight: `${10*scale}px`,
        width: 'auto', 
        height: 'auto',
    }

    return (
        <div style={containerStyles}>
            <div
                style={textStyles}
            >
                {textObject.value}
            </div>
        </div>
    )
}

export {
    TextPreview,
}