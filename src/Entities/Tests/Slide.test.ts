import { CreateSlide, EditBackground, Slide, BackgroundSlide  } from "../SlideType";

jest.mock("uuid", () => ({
    v4: jest.fn(() => "test-uuid"),
}));

describe("CreateSlide", () => {
    it("Create slide and return it", () => {
        expect(CreateSlide()).toEqual({
            id: "test-uuid",
            listObjects: [],
            background: { type: "color", color: "#000000" },
        });
    });
});

describe("EditBackground", () => {
    const slide: Slide = CreateSlide();

    it("Edit background to color", () => {
        const newBackground: BackgroundSlide = { type: "color", color: "#ff00ff" };
        expect(EditBackground(newBackground, slide)).toEqual({
            id: "test-uuid",
            listObjects: [],
            background: { type: "color", color: "#ff00ff" },
        });
    });

    it("Edit background to image", () => {
        const newBackground: BackgroundSlide = {
            type: "image",
            url: "https://polygon.readthedocs.io/en/latest/_images/github_logo.png",
        };

        expect(EditBackground(newBackground, slide)).toEqual({
            id: "test-uuid",
            listObjects: [],
            background: newBackground,
        });
    });
});