import { isRoomAvailable } from '@/lib/queries/bookingQuery';
import type { APIRoute } from 'astro'


export const POST: APIRoute = async({request})=>{
    try {
        const {roomId,checkIn,checkOut } = await request.json();
        //Query for overlapping bookings
        const isAvailable = await isRoomAvailable(roomId, new Date(checkIn), new Date(checkOut))
        return new Response(JSON.stringify({ available: isAvailable }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to make booking" }), { status: 500 })
        
    }

}