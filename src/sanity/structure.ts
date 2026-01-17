import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            // Singleton for Profile/Settings
            S.listItem()
                .title('Profile & Settings')
                .child(
                    S.document()
                        .schemaType('profile')
                        .documentId('profile')
                ),
            S.divider(),
            // Regular content
            ...S.documentTypeListItems().filter(
                (item) => item.getId() !== 'profile'
            ),
        ])
