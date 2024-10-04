export type Slide = {
    id: string;
    object: Text | Picture;
    bg: Color | Image;
};

type Color = {
    type: "solid"
    color: string;
};

type Image = {
    type: "image"
    src: string;
};

type SlideObj = {
    pos: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        heigth: number;
    };
};

type Text = SlideObj & {
    value: string;
};

type Picture = SlideObj & {
    src: string;
};

const AddObjectToSlide = (newObj: Text | Picture, slide: Slide) => {
    return {
        ...slide,
        object: newObj
    };
};

const EditPositionObject = (newPosX: number, newPosY: number, slide: Slide) => {
    return {
        ...slide,
        pos: {
            x: newPosX,
            y: newPosY
        }
    };
};

const EditSizeObject = (newWidth: number, newHeigth: number, slide: Slide) => {
    return {
        ...slide,
        pos: {
            width: newWidth,
            heigth: newHeigth
        }
    };    
};

const EditTextValue = (newValue: string, slideObj: SlideObj) => {
    return {
        ...slideObj,
        value: newValue
    };
};

const EditBackgroundSlide = (newBackground: Color | Image, slide: Slide) => {
    return {
        ...slide, 
        bg: newBackground
    };
};

export const Slide = {
    AddObjectToSlide, EditPositionObject, EditSizeObject, EditTextValue, EditBackgroundSlide
};