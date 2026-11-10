import ExternalUrlPreview from "@/components/sanity/ExternalUrlPreview";

export default {
    name:'user',
    title: "User",
    type:'document',
    fields: [
        { name: "userId",
            title: "User ID",            
             type: "string",
            readOnly: true
        },
        { name: "name",
            title: "Name",
             type: "string",
            readOnly: true
        },
        { name: "email",
            title: "Email",
             type: "string",
            readOnly: true
        },
        { name: "image",
            title: "Image Url",
            type: "url",
            readOnly: true
        },
        { name: "createdAt",
            title: "Created At",
            type: "datetime",
            readOnly: true
        },
    ],
    preview: {
        select: {
            title: 'name',
            image: 'image'

        },
        prepare: ({
            title,
            image
        }:any) => ({
            title,
            media: image ? ExternalUrlPreview({ value: image }) : ''
        })
    }

    

}