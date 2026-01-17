import { defineField, defineType } from 'sanity'

export const tripType = defineType({
    name: 'trip',
    title: 'Trip',
    type: 'document',
    fields: [
        defineField({
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: true,
        }),
        defineField({
            name: 'location',
            title: 'Location Name',
            type: 'string',
        }),
        defineField({
            name: 'geopoint',
            title: 'Geopoint (Lat/Lng)',
            type: 'geopoint',
        }),
        defineField({
            name: 'visitDate',
            title: 'Visit Date',
            type: 'date',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'photos',
            title: 'Trip Photos',
            type: 'array',
            of: [{ type: 'image' }],
        }),
    ],
})
