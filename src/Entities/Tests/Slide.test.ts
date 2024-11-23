import { FontFormatting, ObjectType } from "../BaseTypes";
import { AddObject, CreateSlide, EditBackground, ElementSlide, MoveElementsDown, MoveElementsToBottom, MoveElementsToTop, MoveElementsUp, SlideType } from "../SlideType";
  
  jest.mock("uuid", () => ({
    v4: jest.fn(() => "test-uuid"),
  }));
  
  describe("Slide", () => {
        describe("Create slide", () => {
            it("creates slide and returns it", () => {
                expect(CreateSlide()).toEqual({
                id: "test-uuid",
                listObjects: [],
                background:"#ffffff",
                });
            });
        });
    
        describe("Edit slide bg", () => {
            const slide: SlideType = CreateSlide();
        
            it("edit slide bg to another color", () => {
                const newBg = "#ff00ff";
                expect(EditBackground(newBg, slide)).toEqual({
                id: "test-uuid",
                listObjects: [],
                background: "#ff00ff",
                });
            });
        
            it("edit slide bg to image", () => {
                const newBg = "https://lh3.googleusercontent.com/d_S5gxu_S1P6NR1gXeMthZeBzkrQMHdI5uvXrpn3nfJuXpCjlqhLQKH_hbOxTHxFhp5WugVOEcl4WDrv9rmKBDOMExhKU5KmmLFQVg";
        
                expect(EditBackground(newBg, slide)).toEqual({
                id: "test-uuid",
                listObjects: [],
                background: newBg,
                });
            });
        });
    
        describe("Slide element movement functions", () => {
            let slide: SlideType = CreateSlide();
    
            const elem1: ElementSlide = {
                id: "1",
                pos: {x: 10, y: 10},
                size: {width: 10, height: 10},
                objectType: ObjectType.Text,
                fontSize: 100,
                fontFamily: 'Roboto',
                fontFormatting: FontFormatting.bold,
                fontColor: '#ffffff',
                fontBgColor: '#000000',
                value: 'Пока',
            };
            const elem2: ElementSlide = {
                id: "2",
                pos: {x: 20, y: 20},
                size: {width: 20, height: 20},
                objectType: ObjectType.Text,
                fontSize: 100,
                fontFamily: 'Roboto',
                fontFormatting: FontFormatting.bold,
                fontColor: '#ffffff',
                fontBgColor: '#000000',
                value: 'Привет',
            };

            const elem3: ElementSlide = {
                id: "3",
                pos: {x: 30, y: 30},
                size: {width: 30, height: 30},
                objectType: ObjectType.Text,
                fontSize: 100,
                fontFamily: 'Roboto',
                fontFormatting: FontFormatting.bold,
                fontColor: '#ffffff',
                fontBgColor: '#000000',
                value: 'Hello',
            };

            const elem4: ElementSlide = {
                id: "4",
                pos: {x: 40, y: 40},
                size: {width: 40, height: 40},
                objectType: ObjectType.Text,
                fontSize: 100,
                fontFamily: 'Roboto',
                fontFormatting: FontFormatting.bold,
                fontColor: '#ffffff',
                fontBgColor: '#000000',
                value: 'Bye',
            };
    
        slide = AddObject(elem1, slide);
        slide = AddObject(elem2, slide);
        slide = AddObject(elem3, slide);
        slide = AddObject(elem4, slide);
    
        describe("MoveElementsDown", () => {
            it("should move an element down by one position", () => {
            const updatedSlide = MoveElementsDown(["2"], slide);
            expect(updatedSlide.listObjects.map((el) => el.id)).toEqual(["1", "3", "2", "4"]);
            });
    
            it("should not move the last element down", () => {
            const updatedSlide = MoveElementsDown(["4"], slide);
            expect(updatedSlide.listObjects.map((el) => el.id)).toEqual(["1", "2", "3", "4"]);
            });
    
            it("should handle multiple elements moving down", () => {
            const updatedSlide = MoveElementsDown(["2", "3"], slide);
            expect(updatedSlide.listObjects.map((el) => el.id)).toEqual(["1", "4", "2", "3"]);
            });
        });
    
        describe("MoveElementsUp", () => {
            it("should move an element up by one position", () => {
            const updatedSlide = MoveElementsUp(["3"], slide);
            expect(updatedSlide.listObjects.map((el) => el.id)).toEqual(["1", "3", "2", "4"]);
            });
    
            it("should not move the first element up", () => {
            const updatedSlide = MoveElementsUp(["1"], slide);
            expect(updatedSlide.listObjects.map((el) => el.id)).toEqual(["1", "2", "3", "4"]);
            });
    
            it("should handle multiple elements moving up", () => {
            const updatedSlide = MoveElementsUp(["3", "4"], slide);
            expect(updatedSlide.listObjects.map((el) => el.id)).toEqual(["1", "3", "4", "2"]);
            });
        });
    
        describe("MoveElementsToTop", () => {
            it("should move specified elements to the top of the slide", () => {
            const result = MoveElementsToTop(["2", "3"], slide);
            expect(result.listObjects.map((el) => el.id)).toEqual(["2", "3", "1", "4"]);
            });
    
            it("should not modify the slide if no elements are specified to move", () => {
            const result = MoveElementsToTop([], slide);
            const originalOrder = slide.listObjects.map((object) => object.id);
            const resultOrder = result.listObjects.map((object) => object.id);
            expect(resultOrder).toEqual(originalOrder);
            });
        });
    
        describe("MoveElementsToBottom", () => {
            it("should move specified elements to the bottom of the slide", () => {
            const result = MoveElementsToBottom(["1"], slide);
            expect(result.listObjects.map((el) => el.id)).toEqual(["2", "3", "4", "1"]);
            });
    
            it("should not modify the slide if no elements are specified to move", () => {
            const result = MoveElementsToBottom([], slide);
            const originalOrder = slide.listObjects.map((object) => object.id);
            const resultOrder = result.listObjects.map((object) => object.id);
            expect(resultOrder).toEqual(originalOrder);
            });
        });
    });
});
  