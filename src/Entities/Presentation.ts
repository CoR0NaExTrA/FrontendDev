import { Id } from "./BaseTypes";
import { Slide } from "./Slide";

export type Presentation = {
    name: string;
    listSlides: Slide[];
};

const CreatePresentation = () => ({
    name: "New Presentation",
    listSlides: [],
});

const EditName = (newName: string, pres: Presentation) : Presentation => {
    if (newName.trim() == "") {
        return {
            ...pres,
            name: "New Presentation"
        }
    }
    
    return {
        ...pres, 
        name: newName
    }
};

const AddSlide = (newSlide: Slide, pres: Presentation) : Presentation => {
    return {
        ...pres,
        listSlides: [...pres.listSlides, newSlide]
    }
};

const RemoveSlide = (id: Id, pres: Presentation) => {
    const index = pres.listSlides.findIndex(c => c.id == id);
    
    if (index === -1) {
        return pres;
    }

    const newListSlides = [...pres.listSlides];
    newListSlides.splice(index, 1)

    return {
        ...pres,
        listSlides: newListSlides
    }
};

const MoveSlides = (SlideToMoveId: Id, pres: Presentation, posToMove: number): Presentation => {
    if (posToMove < 0) {
      return pres;
    }
  
    const slideToMove = pres.listSlides.filter((slide) => SlideToMoveId.includes(slide.id));
    const remainingSlide =  pres.listSlides.filter((slide) => !SlideToMoveId.includes(slide.id));
    const newSlides = [...remainingSlide.slice(0, posToMove), ...slideToMove, ...remainingSlide.slice(posToMove)];
  
    return {
        ...pres,
        listSlides: newSlides,
    };
  };

export {
    CreatePresentation, EditName,
    AddSlide, RemoveSlide, MoveSlides
};