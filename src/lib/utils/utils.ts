import { HASHTAG_REGEX } from '$lib/constants/action';

export const extractHashtagsFromDescription = (description: string) => description.match(HASHTAG_REGEX) || [];

export const clearDescriptionFromHashtags = (description: string) => description.replace(HASHTAG_REGEX, '').trim();
