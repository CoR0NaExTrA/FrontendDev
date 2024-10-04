export type Position = {
    x: number;
    y: number;
};

export type Size = {
    width: number;
    heigth: number;
};

type Color = {
    type: "color";
    color: string;
};

type Image = {
    type: "image";
    src: string;
};

export type SlideBackground = Image | Color;
export type SlideElement = Text | Picture;

export type Slide = {
    id: string;
    listObject: SlideElement[]; 
    bg: SlideBackground;
};

type SlideObj = {
    id: string;
    pos: Position;
    size: Size;
};

enum FontFormat {
    bold,
    italic,
    underlined,
}

type Text = SlideObj & {
    fontSize: number;
    fontFamily: string;
    fontFormat: FontFormat; 
    value: string;
};

type Picture = SlideObj & {
    src: string;
};

const EditPositionObject = (newPos: Position, element: SlideElement) => {
    return {
        ...element,
        pos: newPos,
    }
};

const EditSizeObject = (newSize: Size, element: SlideElement) => {
    return {
        ...element,
        pos: newSize,
    }
};

const EditBackgroundSlide = (newBackground: SlideBackground, slide: Slide) => {
    return {
        ...slide, 
        bg: newBackground
    }
};

const EditValueText = (newValue: string, textElement: Text) => {
    return {
        ...textElement,
        value: newValue
    }
};

const EditFontSize = (newFontSize: number, textElement: Text) => {
    return {
        ...textElement,
        fontSize: newFontSize
    }
};

const EditFontFamily = (newFontFamily: number, textElement: Text) => {
    return {
        ...textElement,
        fontSize: newFontFamily
    }
};

const AddObjectToSlide = (newObject: SlideElement, slide: Slide) => {
    return {
        ...slide,
        object: newObject
    }
};

const RemoveObjectToSlide = (id: string, slide: Slide) => {
    const index = slide.listObject.findIndex(c => c.id == id);

    if (index == -1)
    {
        return slide;
    }

    const newListObject = [...slide.listObject];
    newListObject.splice(index, 1);


    return {
        ...slide,
        newListObject
    }
};

export const Slide = {
    AddObjectToSlide, EditBackgroundSlide, RemoveObjectToSlide,
    EditPositionObject, EditSizeObject, EditFontFamily,
    EditFontSize, EditValueText
};