import { Id, Image, Point, Size, Text } from "./BaseTypes";
import { uuid } from 'uuidv4'

type BackgroundImage = {
    type: "image";
    url: string; 
};

type BackgroundColor = {
    type: "color";
    color: string;
};

export type BackgroundSlide = BackgroundImage | BackgroundColor;
export type ElementSlide = Text | Image;

export type SlideType = {
    id :Id;
    listObjects: ElementSlide[];
    background: string;
};

const CreateSlide = () : SlideType => ({
    id: uuid(),
    listObjects: [],
    background: "#ffffff",
});

const EditBackground = (newBackground: string, slide: SlideType) : SlideType => {
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

const MoveElementsDown = (elementsToMoveId: Id[], slide: SlideType): SlideType => {
    const elementsCopy = [...slide.listObjects];
    elementsToMoveId
      .slice()
      .reverse()
      .forEach((id) => {
        const index = elementsCopy.findIndex((element) => element.id === id);
        if (index !== -1 && index < elementsCopy.length - 1) {
          [elementsCopy[index], elementsCopy[index + 1]] = [elementsCopy[index + 1], elementsCopy[index]];
        }
      });
    return { ...slide, listObjects: elementsCopy };
  };
  
  const MoveElementsUp = (elementsToMoveId: Id[], slide: SlideType): SlideType => {
    const elementsCopy = [...slide.listObjects];
    elementsToMoveId.forEach((id) => {
      const index = elementsCopy.findIndex((element) => element.id === id);
      if (index > 0) {
        [elementsCopy[index], elementsCopy[index - 1]] = [elementsCopy[index - 1], elementsCopy[index]];
      }
    });
  
    return { ...slide, listObjects: elementsCopy };
  };
  
const MoveElementsToTop = (elementsToMoveId: Id[], slide: SlideType): SlideType => {
    const elementsToMove = slide.listObjects.filter((object) => elementsToMoveId.includes(object.id));
    const remainingElements = slide.listObjects.filter((object) => !elementsToMoveId.includes(object.id));
    return {
        ...slide,
        listObjects: [...elementsToMove, ...remainingElements],
    };
  };
  
const MoveElementsToBottom = (elementsToMoveId: Id[], slide: SlideType): SlideType => {
    const elementsToMove = slide.listObjects.filter((object) => elementsToMoveId.includes(object.id));
    const remainingElements = slide.listObjects.filter((object) => !elementsToMoveId.includes(object.id));
    return {
      ...slide,
      listObjects: [...remainingElements, ...elementsToMove],
    };
};

export {
    CreateSlide, EditBackground, 
    AddObject, EditTextValue,
    EditTextFontSize, EditElementPosition,
    EditElementSize, RemoveObject,
    MoveElementsToBottom, MoveElementsToTop,
    MoveElementsUp, MoveElementsDown
};
