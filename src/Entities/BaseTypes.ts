export type Id = string;
export type Color = string;
export type Point = { x: number; y: number };
export type Size = { width: number; height: number };

enum ObjectType {
  Text,
  Image,
};

type SlideObject = {
    id: Id;
    layer: number;
    pos: Point;
    size: Size;
    objectType: ObjectType;
};

export type Image = SlideObject & {
    objectType: ObjectType.Image;
    url: string;
};

enum FontFormatting {
    bold,
    italic,
    underlined,
}
  
export type Text = SlideObject & {
    objectType: ObjectType.Text;
    fontSize: number;
    fontName: string;
    fontFormatting: FontFormatting;
    fontColor: Color;
    fontBgColor: Color;
    value: string;
};