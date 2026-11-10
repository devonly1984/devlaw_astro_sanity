import { verifyWebhook } from '@clerk/astro/webhooks'
import type { APIRoute } from 'astro'
import { SIGNING_SECRET, SANITY_TOKEN } from 'astro:env/server'
import { SANITY_PROJECT_ID, SANITY_DATASET } from 'astro:env/client'

const mutateSanity = async (mutation: any) => {
    if (!SANITY_TOKEN || !SANITY_PROJECT_ID || !SANITY_DATASET) {
        throw new Error('SANITY_TOKEN is not set')
    }
    
    
    const response = await fetch(`https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-06-01/data/mutate/${SANITY_DATASET}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SANITY_TOKEN}`,
        },
        body: JSON.stringify(mutation),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(`Sanity mutation failed: ${JSON.stringify(error)}`)
    }

    return response.json()
}
export const POST: APIRoute = async ({ request }) => {
    console.log('Webhook received')

    try {
        const evt = await verifyWebhook(request, {
            signingSecret: SIGNING_SECRET,
        })

        // Do something with payload
        switch (evt.type) {
            case 'user.created':
            case 'user.updated':
                console.log(evt)

                const { id, first_name, last_name, email_addresses, image_url } = evt.data;
                const mutations = {
                    mutation: [
                        {
                            createOrReplace: {
                                _type: 'user',
                                _id: id,
                                userId: id,
                                name: `${first_name} ${last_name}`,
                                email: email_addresses[0].email_address,
                                image_url: image_url,
                                createdAt: new Date().toISOString(),
                            },
                        }
                    ]
                }
                const result = await mutateSanity(mutations)
                return new Response(JSON.stringify(result), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',

                    }
                })
                default: 
                return new Response(`Webhook event type ${evt.type}`
                )
        }



    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}