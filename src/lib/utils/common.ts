import { PUBLICATIONS_DESCRIPTION_HASHTAG_REGEXP } from '$lib/constants/common';

/**
 * Extract all hashtags from a description.
 *
 * @param {string} description
 * @returns {string[]} array of extracted hashtags
 * @example
 * extractHashtagsFromDescription('Hello #world') = ['world']
 */
export const extractHashtagsFromDescription = (description: string) =>
  (description.match(PUBLICATIONS_DESCRIPTION_HASHTAG_REGEXP) || []).map(String) || [];

/**
 * Remove all hashtags from a description.
 *
 * @param {string} description
 * @returns {string} description without hashtags
 * @example
 * clearDescriptionFromHashtags('Hello #world') = 'Hello '
 */
export const clearDescriptionFromHashtags = (description: string) =>
  description.replace(PUBLICATIONS_DESCRIPTION_HASHTAG_REGEXP, '').trim();

/**
 * Convert string to boolean.
 *
 * @param {string} value
 * @returns boolean
 * @example
 * convertStringToBoolean('true') = true
 * convertStringToBoolean('false') = false
 */
export const convertStringToBoolean = (value: string) => value === 'true';

/**
 * Get random integer between min and max value.
 *
 * @param min min value
 * @param max max value
 * @returns integer between min and max
 * @example
 * const randomInteger(4) = getRandomInteger(1, 10);
 */
export const getRandomInteger = (min: number, max: number) => Math.floor(min + Math.random() * (max + 1 - min));

/**
 * Divide incoming phrase by "$" symbol.
 * If no "$" symbol in phrase, return { start: phrase, middle: '', end: '' }
 *
 * @param {string} rawPhrase incoming phrase
 * @returns \{ start, middle, end } divided phrase
 * @example
 * const { start, middle, end } = dividePhrase('Hello $world$!');
 */
export const dividePhrase = (rawPhrase: string) => {
  const startIndex = rawPhrase.indexOf('$');
  const endIndex = rawPhrase.lastIndexOf('$') + 1;

  if (startIndex === -1 || endIndex === -1) {
    return {
      start: rawPhrase,
      middle: '',
      end: '',
    };
  }

  const start = rawPhrase.slice(0, startIndex);
  const middle = rawPhrase.slice(startIndex, endIndex).replace(/\$/g, '');
  const end = rawPhrase.slice(endIndex).trim();

  return {
    start,
    middle,
    end,
  };
};

/**
 * Provides utility functions for date manipulation.
 *
 * @returns An object containing:
 *   - today: A string representing today's date in 'YYYY-MM-DD' format.
 *   - calculateYears: A function that calculates the number of years between
 *     the current year and the year of the given date string.
 *   - getYear: A function that extracts the year from a given date string.
 */
export const getDate = () => ({
  today: new Date().toISOString().slice(0, 10),
  calculateYears: (userValue: string) => new Date().getFullYear() - new Date(userValue).getFullYear(),
  getYear: (dateInputValue: string) => new Date(dateInputValue).getFullYear(),
});

/**
 * Replaces all spaces in a string with a single space.
 *
 * @param {string} value - The input string to be processed.
 * @returns {string} The resulting string with all spaces replaced by a single space.
 * @example
 * replaceSpaces('Hello   world') = 'Hello world'
 */
export const replaceSpaces = (value: string) => value.trim().replace(/\s/g, '');

/**
 * Creates a suggested username from a given full name.
 *
 * Reverses the full name order (i.e. 'John Doe' becomes 'Doe John'), removes
 * all spaces, and lowercases the resulting string.
 *
 * @param userFullName The full name to generate a suggested username from.
 * @returns A suggested username string.
 * @example
 * createSuggestedUsername('John Doe') = 'doejohn'
 */
export const createSuggestedUsername = (userFullName: string) =>
  replaceSpaces(userFullName.split(' ').reverse().join(' ').toLowerCase());

/**
 * Returns a debounced version of the given function.
 *
 * The debounced function will only be executed after the given wait period has
 * passed since the last time the debounced function was called.
 *
 * @param {function} callback - The function to debounce.
 * @param {number} wait - The wait period in milliseconds.
 *
 * @returns {function} The debounced function.
 */
export const debounce = <T>(callback: (...args: T[]) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: T[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
};

/**
 * Formats a given file size into a human-readable string.
 *
 * @param {number} fileSize - The file size in bytes.
 * @returns {string} A human-readable string representing the file size.
 *
 * The formatting rules are as follows:
 * - file size is less than 1 kilobyte (1e3 bytes): display file size in bytes.
 * - file size is between 1 kilobyte (1e3 bytes) and 1 megabyte (1e6 bytes): display file size in kilobytes.
 * - file size is equal to or greater than 1 megabyte (1e6 bytes): display file size in megabytes.
 */
export const formatFileSize = (fileSize: number) => {
  if (fileSize < 1e3) {
    return `${fileSize} bytes`;
  } else if (fileSize >= 1e3 && fileSize < 1e6) {
    return `${(fileSize / 1e3).toFixed(1)} KB`;
  }

  return `${(fileSize / 1e6).toFixed(1)} MB`;
};

/**
 * Converts the given file to a base64 string.
 *
 * Returns a promise that resolves with a base64 string, or rejects with a DOMException.
 *
 * @param {File} file - The file to convert.
 * @returns {Promise<string>} A promise resolving with the base64 string.
 */
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

/**
 * Creates an image URL from a given blob or media source.
 *
 * @param {Blob | MediaSource} blob - The blob or media source to create the URL from.
 * @returns {string} The created image URL.
 */
export const createImageURL = (blob: Blob | MediaSource) => URL.createObjectURL(blob);

/**
 * Creates an image URL from a given base64 string.
 *
 * Fetches the base64 string, converts the response to a blob, and then creates
 * an image URL from the blob.
 *
 * @param {string} base64 - The base64 string to create the URL from.
 * @returns {Promise<string>} A promise resolving with the created image URL.
 */
export const getObjectURL = async (base64: string) => {
  const base64Response = await fetch(base64);
  const blob = await base64Response.blob();

  return createImageURL(blob);
};

/**
 * Transforms a given file type to ensure it has the 'image/' prefix.
 *
 * If the file type already starts with 'image/', it is returned unchanged.
 * Otherwise, the function prefixes the file type with 'image/'.
 *
 * @param {string} fileType - The file type to transform.
 * @returns {string} The transformed file type with the 'image/' prefix.
 */
export const transformFileTypeName = (fileType: string) =>
  fileType.startsWith('image/') ? fileType : `image/${fileType}`;

export const transformFileTypeNames = (fileTypes: string[]) => fileTypes.map(transformFileTypeName);
