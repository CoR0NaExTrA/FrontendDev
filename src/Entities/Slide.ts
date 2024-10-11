import { Color, Id, Image, Point, Size, Text } from "./BaseTypes";
import { uuid } from 'uuidv4'

type BackgroundImage = {
    type: "image";
    url: string; 
};

type BackgroundColor = {
    type: "color";
    color: Color;
};

export type BackgroundSlide = BackgroundImage | BackgroundColor;
export type ElementSlide = Text | Image;

export type Slide = {
    id :Id;
    listObjects: ElementSlide[];
    background: BackgroundSlide;
};

const CreateSlide = () : Slide => ({
    id: uuid(),
    listObjects: [],
    background: {type: "color", color: "#000000"},
});

const EditBackground = (newBackground: BackgroundSlide, slide: Slide) : Slide => {
    return {
        ...slide,
        background: newBackground,
    }
};

const AddObject = (newObject: ElementSlide, slide: Slide) : Slide => {
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

const RemoveObject = (slide: Slide, id: Id) : Slide => {
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
