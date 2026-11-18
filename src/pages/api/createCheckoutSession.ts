import type { APIRoute } from "astro";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from 'astro:env/server'
import { PUBLIC_DOMAIN_URL } from 'astro:env/client'
import { urlForImage } from "@/lib/url-for-image";
const stripe = new Stripe(STRIPE_SECRET_KEY);
export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { roomName, checkIn, checkOut, noOfRoom, adults, children, totalPrice, image, reservationId } = data;

        const checkInDate = checkIn ? new Date(checkIn).toISOString().split("T")[0] : undefined;
        const checkOutDate = checkOut ? new Date(checkOut).toISOString().split("T")[0] : undefined;

        const session = await stripe.checkout.sessions.create({
            allowed_payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: roomName,
                            description: `${noOfRoom} room(s) .  ${adults} adult(s) . ${children}  child(ren) .  Check-In: ${checkInDate}  Check-Out: ${checkOutDate}`,
                            images: [urlForImage(image).url()],
                        },
                        unit_amount: Math.round(totalPrice * 100), // Stripe expects the amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${PUBLIC_DOMAIN_URL}/booking/success?reservation_id={reservationId}`,
            cancel_url: `${PUBLIC_DOMAIN_URL}/room/${roomName.toLowerCase().replace(/\s+/g, '-')}`,
            metadata: {
                reservationId: reservationId,
                bookingData: JSON.stringify({
                    data
                })
            }

        })
        return new Response(JSON.stringify({ sessionId: session.id, url: session.url }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })



    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to create checkout session' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}