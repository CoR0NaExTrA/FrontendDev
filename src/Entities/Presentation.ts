import { Slide } from "./Slide";


type Presentation = {
    name: string;
    listSlides: Slide[];
};

const EditName = (newName: string, pres: Presentation) =>
{
    return {
        ...pres,
        name: newName
    }
};

const AddSlide = (newSlide: Slide, pres: Presentation) => {
    return {
        ...pres,
        listSlides: [...pres.listSlides, newSlide]
    }
}; 
const RemoveSlide = (id: string, pres: Presentation) => {
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

export const Presentation = 
{
    EditName, AddSlide, RemoveSlide
};

