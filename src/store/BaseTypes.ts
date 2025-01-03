export type Id = string;
export type Point = { x: number; y: number };
export type Size = { width: number; height: number };

export enum ObjectType {
  Text,
  Image,
};

export type SlideObject = {
    id: Id;
    pos: Point;
    size: Size;
    objectType: ObjectType;
};

export type Image = SlideObject & {
    objectType: ObjectType.Image;
    url: string;
};

export enum FontFormatting {
    normal = 'normal',
    bold = 'bold',
    italic = 'italic',
    underline = 'underline',
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
