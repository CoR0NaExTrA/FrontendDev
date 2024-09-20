"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slide = void 0;
const AddObjectToSlide = (newObj, slide) => {
    return Object.assign(Object.assign({}, slide), { object: newObj });
};
const EditPositionObject = (newPosX, newPosY, slide) => {
    return Object.assign(Object.assign({}, slide), { pos: {
            x: newPosX,
            y: newPosY
        } });
};
const EditSizeObject = (newWidth, newHeigth, slide) => {
    return Object.assign(Object.assign({}, slide), { pos: {
            width: newWidth,
            heigth: newHeigth
        } });
};
const EditTextValue = (newValue, slideObj) => {
    if (newValue === null) {
        return slideObj;
    }
    return Object.assign(Object.assign({}, slideObj), { value: newValue });
};
const EditBackgroundSlide = (newBackground, slide) => {
    return Object.assign(Object.assign({}, slide), { bg: newBackground });
};
exports.Slide = {
    AddObjectToSlide, EditPositionObject, EditSizeObject, EditTextValue, EditBackgroundSlide
};
