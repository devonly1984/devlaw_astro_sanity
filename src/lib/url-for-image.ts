import { sanityClient } from "sanity:client";
import imageUrlBuilder  from "@sanity/image-url";
import type { SanityAsset } from "@sanity/image-url";

export const imageBuilder = imageUrlBuilder(sanityClient);

export const urlForImage = (source:SanityAsset)=>{
    return imageBuilder.image(source)
}