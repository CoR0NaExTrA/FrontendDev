"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slide = void 0;
const AddObjectToSlide = (newObj, slide) => {
    return Object.assign(Object.assign({}, slide), { object: newObj });
};
const EditPositionObject = () => {
};
const EditSizeObject = () => {
};
const EditTextValue = (newValue, slideObj) => {
    if (newValue === null) {
        return slideObj;
    }
    return Object.assign(Object.assign({}, slideObj), { value: newValue });
};
const EditBackgroundSlide = () => {
};
exports.Slide = {
    AddObjectToSlide, EditPositionObject, EditSizeObject, EditTextValue, EditBackgroundSlide
};
