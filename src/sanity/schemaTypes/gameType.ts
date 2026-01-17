import { defineField, defineType } from 'sanity'

export const gameType = defineType({
    name: 'game',
    title: 'Game',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'platform',
            title: 'Platform',
            type: 'string', // Could be enum: 'PS5', 'PC', 'Switch'
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Playing', value: 'Playing' },
                    { title: 'Finished', value: 'Finished' },
                    { title: 'Want to Play', value: 'Want' },
                ]
            }
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
        }),
    ],
})
