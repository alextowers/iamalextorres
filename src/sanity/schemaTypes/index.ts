import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './projectType'
import { postType } from './postType'
import { tripType } from './tripType'
import { gameType } from './gameType'
import { wishlistType } from './wishlistType'
import { profileType } from './profileType'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [projectType, postType, tripType, gameType, wishlistType, profileType],
}
