"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Presentation = void 0;
const EditName = (newName, pres) => {
    return Object.assign(Object.assign({}, pres), { name: newName });
};
const AddSlide = (newSlide, pres) => {
    return Object.assign(Object.assign({}, pres), { listSlides: [...pres.listSlides, newSlide] });
};
const RemoveSlide = (id, pres) => {
    const index = pres.listSlides.findIndex(c => c.id === id);
    if (index === -1) {
        return pres;
    }
    const newListSlides = [...pres.listSlides];
    newListSlides.splice(index, 1);
    return Object.assign(Object.assign({}, pres), { listSlides: [...newListSlides] });
};
exports.Presentation = {
    EditName, AddSlide, RemoveSlide
};
