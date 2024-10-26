export type Id = string;
export type Point = { x: number; y: number };
export type Size = { width: number; height: number };

export enum ObjectType {
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

export enum FontFormatting {
    bold,
    italic,
    underlined,
}
  
export type Text = SlideObject & {
    objectType: ObjectType.Text;
    fontSize: number;
    fontFamily: string;
    fontFormatting: FontFormatting;
    fontColor: string;
    fontBgColor: string;
    value: string;
};