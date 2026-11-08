export interface Amenity {
    icon:string;
    name:string;
}
export interface Feature {
    icon:string;
    name:string;
    value:string;
}

export interface Room {
    name:string;
    slug:string;
    category:string;
    image: ImageMetadata;
    thumbnails:ImageMetadata[];
    description:string;

    amenities:Amenity[];
    features:Feature[];
    price:number;
    discount: number;
}