export type Slide = {
    id: string;
    listObject: (Text | Picture)[]; 
    bg: SlideBackground;
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
export type SlideObject = Text | Picture;

type SlideObj = {
    id: string;
    pos: {
        x: number;
        y: number;
    };

    size: {
        width: number;
        heigth: number;
    };
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

const EditPositionObject = (newPosX: number, newPosY: number, element: Text | Image) => {
    return {
        ...element,
        pos: ,
    }
};

const EditSizeObject = (newWidth: number, newHeigth: number, slide: Slide) => {
    
};

const EditBackgroundSlide = (newBackground: Color | Image, slide: Slide) => {
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

const AddObjectToSlide = (newObject: Text | Picture, slide: Slide) => {
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
    AddObjectToSlide, EditBackgroundSlide, RemoveObjectToSlide, EditPositionObject, EditSizeObject
};