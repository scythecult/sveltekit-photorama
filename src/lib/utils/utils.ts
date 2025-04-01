import { HASHTAG_REGEX } from '$lib/constants/action';
import type { SimpleCookie } from '$lib/types/cookies';

export const extractHashtagsFromDescription = (description: string) => description.match(HASHTAG_REGEX) || [];

export const clearDescriptionFromHashtags = (description: string) => description.replace(HASHTAG_REGEX, '').trim();

export const convertStringToBoolean = (value: string) => value === 'true';

export const parseCookieHeaderValues = (cookies: string[]): SimpleCookie[] => {
  if (cookies.length) {
    return cookies.map((item) => {
      const [cookiePair, pathRaw] = item.split(';');
      const path = pathRaw.trim().replace(/\w+=/g, '');
      const [name, value] = cookiePair.split(/=(.*)/s).filter(Boolean);

      return { name, value, path };
    });
  }

  return [];
};

export const getCookieByName = (cookies: SimpleCookie[], name: string) =>
  cookies.find((item) => item.name === name)?.value;
