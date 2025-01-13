import jsPDF from "jspdf";
import { Presentation } from "../Presentation";
import { BackgroundType } from "../SlideType";
import { ObjectType } from "../BaseTypes"
import "../../fonts/Roboto-Black-normal.js"

const SLIDE_WIDTH = 937
const SLIDE_HEIGHT = 527

function exportPresentationToPDF(presentation: Presentation) {
    if (!presentation?.listSlides?.length) {
        console.error("No slides to export.")
        return
    }

    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [SLIDE_WIDTH, SLIDE_HEIGHT],
    })

    presentation.listSlides.forEach((slide, index) => {
        if (slide.background.type === BackgroundType.Color) {
            pdf.setFillColor(slide.background.color);
            pdf.rect(0, 0, SLIDE_WIDTH, SLIDE_HEIGHT, "F"); 
        } else if (slide.background.type === BackgroundType.Image) {
            pdf.addImage(slide.background.url, "JPEG", 0, 0, SLIDE_WIDTH, SLIDE_HEIGHT)
        }

        slide.listObjects.forEach((obj) => {
            if (obj.objectType === ObjectType.Text) {
                const margin = 10;
                const x = obj.pos.x + margin;
                let y = obj.pos.y + margin;
                const maxWidth = obj.size.width - margin * 2;
        
                pdf.setFont("Roboto-Black", "normal");
                pdf.setFontSize(obj.fontSize);
                pdf.setTextColor(obj.fontColor || "#000000");
        
                const wrappedText = pdf.splitTextToSize(obj.value, maxWidth);
        
                wrappedText.forEach((line) => {
                    if (y + obj.fontSize > SLIDE_HEIGHT) {
                        pdf.addPage();
                        y = margin; // Сбрасываем Y для новой страницы
                    }
                    pdf.text(line, x, y);
                    y += obj.fontSize;
                });
            } else if (obj.objectType === ObjectType.Image) {
                pdf.addImage(obj.url, "JPEG", obj.pos.x, obj.pos.y, obj.size.width, obj.size.height);
            }
        })

        if (index < presentation.listSlides.length - 1) {
            pdf.addPage()
        }
    })

    function sanitizeFileName(fileName: string) {
        return fileName.replace(/[<>:"/\\|?*]+/g, "").trim()
    }

    const fileName = sanitizeFileName(presentation.name || "presentation")
    pdf.save(`${fileName}.pdf`)
}

export {
    exportPresentationToPDF
}
