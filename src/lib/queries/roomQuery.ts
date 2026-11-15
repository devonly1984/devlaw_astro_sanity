import { sanityClient } from "sanity:client"
import type { Room } from "../../../sanity.types"

export const fetchRooms = async (type:string,category:string,isAvailable:boolean)=>{
const query = await sanityClient.fetch<Room[]>(`*[_type=="${type}" && category=="${category}" && isAvailable==${isAvailable} ]{
  "slug":slug.current, name,description,category,image,price,discount,thumbnailImgs,}`)
    return query;
}