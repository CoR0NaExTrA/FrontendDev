import { Gradient, Id, Image, Point, Size, Text } from "./BaseTypes";
import { v4 as uuid } from "uuid";

export enum BackgroundType {
    Image,
    Color,
    Gradient,
}

export type BackgroundImage = {
    type: BackgroundType.Image;
    url: string; 
};

export type BackgroundColor = {
    type: BackgroundType.Color;
    color: string ;
};

export type BackgroundGradient = {
    type: BackgroundType.Gradient;
    color: Gradient;
};

export type BackgroundSlide = BackgroundImage | BackgroundColor | BackgroundGradient
export type ElementSlide = Text | Image;

export type SlideType = {
    id :Id;
    listObjects: ElementSlide[];
    background: BackgroundSlide;
};

const CreateSlide = () : SlideType => ({
    id: uuid(),
    listObjects: [],
    background: {type: BackgroundType.Color, color: "#ffffff", },
});

const EditBackground = (newBackground: BackgroundSlide, slide: SlideType) : SlideType => {
    return {
        ...slide,
        background: newBackground,
    }
};

const AddObject = (newObject: ElementSlide, slide: SlideType) : SlideType => {
    return {
        ...slide,
        listObjects: [...slide.listObjects, newObject],
    }
};

const EditTextValue = (newValue: string, textObj: Text) : Text => {
    return {
        ...textObj,
        value: newValue,
    }
};

const EditTextFontSize = (newFontSize: number, textObj: Text) : Text => {
    if (newFontSize <= 0) {
        return {
            ...textObj
        };
    }

    return {
        ...textObj,
        fontSize: newFontSize
    }
};

const EditElementPosition = (newPosition: Point, elem: ElementSlide) : ElementSlide => {
    return {
        ...elem,
        pos: newPosition
    }
};
  
const EditElementSize = (newSize: Size, elem: ElementSlide) : ElementSlide => {
    return {
        ...elem,
        size: newSize,
    };
};

const RemoveObject = (slide: SlideType, id: Id) : SlideType => {
    const index = slide.listObjects.findIndex(c => c.id == id);

    if (index == -1)
    {
        return slide;
    }

    const newListObjects = [...slide.listObjects];
    newListObjects.splice(index, 1);


    return {
        ...slide,
        listObjects: newListObjects
    }
};

export {
    CreateSlide, EditBackground, 
    AddObject, EditTextValue,
    EditTextFontSize, EditElementPosition,
    EditElementSize, RemoveObject,
};
