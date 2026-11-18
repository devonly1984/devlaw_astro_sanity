import { defineQuery } from "groq"
import { sanityClient } from "sanity:client"

export const isRoomAvailable = async (roomId: string, checkIn:Date,checkOut: Date) => {
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
  
    const bookingQuery = defineQuery(`*[_type=='booking' && room.ref==$roomId && status in ['pending','confirmed','checked_in'] && checkIn <=$checkOutDate && checkOut >=$checkInDate]`)
    const bookings = await sanityClient.fetch(bookingQuery,{
        roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate
    })
    return bookings.length === 0;


}