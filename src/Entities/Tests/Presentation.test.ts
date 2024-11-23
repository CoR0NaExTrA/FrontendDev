import { CreatePresentation, EditName, Presentation } from "../Presentation";


describe("CreatePresentation", () => {
    it("Create pres", () => {
        expect(CreatePresentation()).toEqual({ name: "New Presentation", listSlides: [] });
    });
});

describe("EditName", () => {
    const pres: Presentation = CreatePresentation();
    it("Rename pres", () => {
        expect(EditName("Popa presentation", pres)).toEqual({
            name: "Popa presentation",
            listSlides: [],
        });
    });

    it("not renames to empty name", () => {
        expect(EditName(" ", pres)).toEqual(pres);
        expect(EditName("", pres)).toEqual(pres);
    });
});