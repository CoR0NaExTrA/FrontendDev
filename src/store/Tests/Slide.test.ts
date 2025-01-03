import { FontFormatting, ObjectType } from "../BaseTypes";
import { CreateSlide, EditBackground, SlideType, BackgroundSlide, ElementSlide, AddObject, BackgroundType  } from "../SlideType";

jest.mock("uuid", () => ({
    v4: jest.fn(() => "test-uuid"),
}));

describe("CreateSlide", () => {
    it("should create slide with default data", () => {
        expect(CreateSlide()).toEqual({
            id: "test-uuid",
            listObjects: [],
            background: { type: "color", color: "#000000" },
        });
    });
});

describe("EditBackground", () => {
    const slide: SlideType = CreateSlide();

    // Arrange
    // Act
    // Assert

    it("Edit background to color", () => {
        const newBackground: BackgroundSlide = { type: BackgroundType.Color, color: "#ff00ff" };

        expect(EditBackground(newBackground, slide)).toEqual({
            id: "test-uuid",
            listObjects: [],
            background: { type: "color", color: "#ff00ff" },
        });
    });

    it("Edit background to image", () => {
        const newBackground: BackgroundSlide = {
            type: BackgroundType.Image,
            url: "https://polygon.readthedocs.io/en/latest/_images/github_logo.png",
        };

        expect(EditBackground(newBackground, slide)).toEqual({
            id: "test-uuid",
            listObjects: [],
            background: newBackground,
        });
    });
});

describe("AddObject", () => {
    const slide: SlideType = CreateSlide();

    it("should add image to slide", () => {
        const newObject: ElementSlide = {
            id: "1", 
            layer: 1, 
            pos: {x: 0, y: 0}, 
            size: {width: 100, height: 100},
            objectType: ObjectType.Image,
            url: "https://polygon.readthedocs.io/en/latest/_images/github_logo.png",
        };

        expect(AddObject(newObject, slide)).toEqual({
            id: "test-uuid",
            listObjects: [newObject],
            background: { type: "color", color: "#000000" },
        });
    });

    it("should add text to slide", () => {
        const newObject: ElementSlide = {
            id: "1", 
            layer: 1, 
            pos: {x: 0, y: 0}, 
            size: {width: 100, height: 100},
            objectType: ObjectType.Text,
            fontSize: 14,
            fontFamily: "Times New Roman",
            fontFormatting: FontFormatting.italic,
            fontColor: "#ffffff",
            fontBgColor: "#ffffff",
            value: "Text",
        };

        expect(AddObject(newObject, slide)).toEqual({
            id: "test-uuid",
            listObjects: [newObject],
            background: { type: "color", color: "#000000" },
        });
    });
});

describe("EditTextValue", () => {
    it("should edit value text", () => {
        const newObject: ElementSlide = {
            id: "1", 
            layer: 1, 
            pos: {x: 0, y: 0}, 
            size: {width: 100, height: 100},
            objectType: ObjectType.Text,
            fontSize: 14,
            fontFamily: "Times New Roman",
            fontFormatting: FontFormatting.italic,
            fontColor: "#ffffff",
            fontBgColor: "#ffffff",
            value: "Text",
        };
    });

    it("", () => {

    });
});