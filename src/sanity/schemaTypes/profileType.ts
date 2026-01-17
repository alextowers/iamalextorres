import { defineField, defineType } from 'sanity'

export const profileType = defineType({
    name: 'profile',
    title: 'Profile & Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'language',
            type: 'string',
            readOnly: true,
            hidden: true,
        }),
        defineField({
            name: 'fullName',
            title: 'Full Name',
            type: 'string',
            initialValue: 'Alejandro Torres Rodriguez'
        }),
        defineField({
            name: 'headline',
            title: 'Headline / Role',
            type: 'string',
            initialValue: 'Software Engineer'
        }),
        defineField({
            name: 'bio',
            title: 'Biography',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'email',
            title: 'Contact Email',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'resume',
            title: 'Resume / CV (PDF)',
            type: 'file',
            options: {
                accept: '.pdf'
            }
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'platform', type: 'string', title: 'Platform' }),
                        defineField({ name: 'url', type: 'url', title: 'URL' }),
                    ]
                }
            ]
        }),
    ],
})
