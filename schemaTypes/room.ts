import type { Rule } from "sanity"

const RoomTypes = [
    {
        title: "Luxury Suite",
        value: "luxury-suite",

    },
    {
        title: "Deluxe Suite",
        value: "deluxe-suite",
    },
    {
        title: "Executive Suite",
        value: "executive-suite",
    }
]
export default {
    name: 'room',
    title: 'Room',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: "Name",
            type: 'string',

        },
        {
            name: 'slug',
            title: "Slug",
            type: "slug",
            options: {
                source: 'name',
                maxLength: 200,
            }
        },
        {
            name: 'category',
            title: "Category",
            type: 'string',
            options: {
                list: RoomTypes
            },
            initialValue: 'Luxury Suite'
        },
        {
            name: 'description',
            title: "Description",
            type: "text"
        },
        {
            name: 'image',
            title: "Image",
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt',
                    type: 'string',
                },
            ],
        },
        {
            name: 'thumbnailImgs',
            title: "Thumbnail Images",
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alt',
                            type: 'string',
                        },
                    ],
                }
            ],

        },
        {
            name: "features",
            title: "Features",
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                        },
                        {
                            name: 'title',
                            title: 'Name',
                            type: 'string',
                            initialValue: 'Sleeps'
                        },
                        {
                            name: 'value',
                            title: 'Value',
                            type: 'string',
                            initialValue: 'Adults'
                        },
                    ],
                }
            ]
        },
        {
            name: "amenities",
            title: "Amenities",
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'isAvailable',
                            title: 'Is Available',
                            type: 'boolean',
                        },
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',

                        },
                        {
                            name: 'name',
                            title: 'Name',
                            type: 'string',

                        },
                    ],
                }
            ]
        },
        {
            name: "SpecialNote",
            title: "Special Note",
            type: 'text'
        },
        {
            name:'price',
            title:"Price",
            type: 'number',
           
            
        },
        {
            name:'discount',
            title: "Discount",
            type: 'number',
           
            
        },
        {
            name: 'isAvailable',
            title: 'Available for booking',
            type: 'boolean',
            initialValue: true,
        }
    ]
}