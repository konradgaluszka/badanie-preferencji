import { songs } from './songs';

export const answers = songs.reduce((acc, val) => {
    return {
        ...acc,
        [val.name]: {}
    }
}, {})
