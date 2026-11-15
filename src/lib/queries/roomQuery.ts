import { sanityClient } from "sanity:client"
import type { Room } from "../../../sanity.types"
import { defineQuery } from "groq"

export const fetchRooms = async (type:string,category:string,isAvailable:boolean)=>{

  const fetchRoomsQuery = defineQuery(`*[_type == $type && category == $category && isAvailable == $isAvailable] {
    "slug": slug.current,
    name,
    description,
    category,
    image,
    price,
    discount,
    thumbnailImgs
  }`)

  const query = await sanityClient.fetch<Room[]>(fetchRoomsQuery, {
    type,
    category,
    isAvailable,
  })

  return query;
}
