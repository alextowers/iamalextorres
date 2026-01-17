import { defineField, defineType } from 'sanity'

export const wishlistType = defineType({
    name: 'wishlistItem',
    title: 'Wishlist Item',
    type: 'document',
    fields: [
        defineField({
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: true,
        }),
        defineField({
            name: 'name',
            title: 'Item Name',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Price (Approx)',
            type: 'string',
        }),
        defineField({
            name: 'link',
            title: 'Product Link',
            type: 'url',
        }),
        defineField({
            name: 'image',
            title: 'Product Image',
            type: 'image',
        }),
        defineField({
            name: 'priority',
            title: 'Priority',
            type: 'number',
            initialValue: 1,
        }),
    ],
})
