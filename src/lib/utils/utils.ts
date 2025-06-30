import { HASHTAG_REGEX } from '$lib/constants/action';
import { ALLOWED_FILE_TYPES, ImageDimension, MAX_PICTURE_SIZE } from '$lib/constants/common';
import type { SimpleCookie } from '$lib/types/cookies';

export const extractHashtagsFromDescription = (description: string) =>
  (description.match(HASHTAG_REGEX) || []).map(String) || [];

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

export const getRandomInteger = (min: number, max: number) => Math.floor(min + Math.random() * (max + 1 - min));

export const dividePhrase = (rawPhrase: string) => {
  const startIndex = rawPhrase.indexOf('$');
  const endIndex = rawPhrase.lastIndexOf('$') + 1;
  const start = rawPhrase.slice(0, startIndex);
  const middle = rawPhrase.slice(startIndex, endIndex).replace(/\$/g, '');
  const end = rawPhrase.slice(endIndex).trim();

  return {
    start,
    middle,
    end,
  };
};

export const getDate = () => ({
  today: new Date().toISOString().slice(0, 10),
  calculateYears: (userValue: string) => new Date().getFullYear() - new Date(userValue).getFullYear(),
  getYear: (dateInputValue: string) => new Date(dateInputValue).getFullYear(),
});

export const replaceSpaces = (value: string) => value.trim().replace(/\s/g, '');

export const createSuggestedUsername = (userFullName: string) =>
  replaceSpaces(userFullName.split(' ').reverse().join(' ').toLowerCase());

export const debounce = <T>(callback: (...args: T[]) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: T[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
};

export const isFileTypeValid = (fileType: string, fileTypes?: string[]) =>
  fileTypes?.length ? fileTypes.includes(fileType) : ALLOWED_FILE_TYPES.includes(fileType);

export const isFileSizeValid = (fileSize: number) => fileSize <= MAX_PICTURE_SIZE;

export const isImageDimensionsValid = (width: number, height: number) =>
  width <= ImageDimension.max &&
  height <= ImageDimension.max &&
  width >= ImageDimension.min &&
  height >= ImageDimension.min;

export const formatFileSize = (fileSize: number) => {
  if (fileSize < 1e3) {
    return `${fileSize} bytes`;
  } else if (fileSize >= 1e3 && fileSize < 1e6) {
    return `${(fileSize / 1e3).toFixed(1)} KB`;
  }

  return `${(fileSize / 1e6).toFixed(1)} MB`;
};

export const convertToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (evt) => {
      const result = evt.target?.result as string;

      resolve(result);
    };

    fileReader.onerror = reject;

    fileReader.readAsDataURL(file);
  });
};

export const createImageURL = (blob: Blob | MediaSource) => URL.createObjectURL(blob);

export const getObjectURL = async (base64: string) => {
  const base64Response = await fetch(base64);
  const blob = await base64Response.blob();

  return createImageURL(blob);
};
