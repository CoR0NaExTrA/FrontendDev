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

const EditPositionObject = () => {

};

const EditSizeObject = () => {

};

const EditTextValue = (newValue: string, slideObj: SlideObj) => {
    if (newValue === null) {
        return slideObj;
    }
    
    return {
        ...slideObj,
        value: newValue
    };
};

const EditBackgroundSlide = () => {

};

export const Slide = {
    AddObjectToSlide, EditPositionObject, EditSizeObject, EditTextValue, EditBackgroundSlide
};