import { defineQuery } from "groq"
import { sanityClient } from "sanity:client"

export const isRoomAvailable = async (roomId: string, checkIn:Date,checkOut: Date) => {
    const bookingQuery = defineQuery(`*[_type=='booking' && room.ref==$roomId && status in ['pending','confirmed','checked_in'] && checkIn <=$checkOut && checkOut >=$checkIn]`)
    const bookings = await sanityClient.fetch(bookingQuery,{
        roomId,
        checkIn,
        checkOut
    })
    return bookings.length === 0;


}