import type { Rule } from "sanity";

export default {
    name: 'booking',
    title: "Booking",
    type: 'document',
    fields: [
        {
            name: 'reservationId',
            title: 'Reservation ID',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'user',
            title: 'User',
            type: 'reference',
            to: {type:'user'},
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'room',
            title: 'Room',
            type: 'reference',
            to: {type:'room'},
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'checkIn',
            title: 'Check In Date',
            type: 'date',
            readOnly: true,
        },
        {
            name: 'checkOut',
            title: 'Check Out Date',
            type: 'date',
            readOnly: true,
        },
        {
            name: 'noOfRoom',
            title: 'No of Rooms',
            type: 'number',
            readOnly: true,
        },
        {
            name:'adults',
            title: 'Adults',
            type: 'number',
            readOnly: true,
        },
        {
            name:'children',
            title: 'Children',
            type: 'number',
            readOnly: true,
        },
        {
            name:"totalPrice",
            title: 'Total Price',
            type: 'number',
            readOnly: true,
        },
        {
            name:'status',
            title: "Booking Status",
            type:'string',
            options: {
                list: [
                    {title:"Pending", value:"pending"},
                    {title:"Confirmed", value:"confirmed"},
                    {title: "Checked In", value:"checked-in"},
                    { title: "Checked Out", value: "checked-out" },
                    {title:"Cancelled", value:"cancelled"}
                ]
            },
            initialValue: 'pending'

        },
        {
            name: "paymentStatus",
            title: "Payment Status",
            type: "string",
            options: {
                list: [
                    {title:"Pending", value:"pending"},
                    {title:"Paid", value:"paid"},
                    { title: "Failed", value: "failed" }
                ]
            },
            initialValue: 'pending'
        },

        {
            name: "paymentId",
            title: "Payment ID",
            type: "string",
        },
        {
            name: "createdAt",
            title: "Created At",
            type: "datetime",
            readOnly: true,
        }
    ],
}