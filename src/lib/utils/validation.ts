import { ImageDimension, MAX_PICTURE_SIZE, PICTURE_ALLOWED_FILE_TYPES } from '$lib/constants/common';
import {
  EMAIL_REGEXP,
  MIN_NAME_LENGTH,
  MIN_USERNAME_LENGTH,
  MIN_YEARS_OLD_AMOUNT,
  PASSWORD_REGEXP,
} from '$lib/constants/validation';
import { transformFileTypeName, transformFileTypeNames } from './common';

export const checkIsEmailValid = (email: string) => Boolean(email && EMAIL_REGEXP.test(email));

export const checkIsFullnameValid = (fullname: string) => Boolean(fullname && fullname.length >= MIN_NAME_LENGTH);

export const checkIsPasswordValid = (password: string) => Boolean(password && PASSWORD_REGEXP.test(password));

export const checkIsBirthdateValid = (birthdate: number) => Boolean(birthdate >= MIN_YEARS_OLD_AMOUNT);

export const checkIsUsernameValid = (username: string) => Boolean(username && username.length >= MIN_USERNAME_LENGTH);

/**
 * Checks if a given file type is valid.
 *
 * If `fileTypes` is provided, then the function will check if the `fileType` is
 * included in the `fileTypes` array. Otherwise, it will check if the `fileType`
 * is included in the `ALLOWED_FILE_TYPES` array.
 *
 * @param {string} fileType - The file type to check.
 * @param {string[]} [fileTypes] - An array of allowed file types.
 * @returns {boolean} True if the file type is valid, false otherwise.
 */
export const checkIsFileTypeValid = (fileType: string, fileTypes?: string[]) => {
  const fileTypeFinal = transformFileTypeName(fileType);
  const fileTypesFinal = transformFileTypeNames(fileTypes ?? PICTURE_ALLOWED_FILE_TYPES);

  return fileTypesFinal.includes(fileTypeFinal);
};

/**
 * Checks if a given file size is valid.
 *
 * @param {number} fileSize - The file size in bytes.
 * @returns {boolean} True if the file size is valid, false otherwise.
 */
export const checkIsFileSizeValid = (fileSize: number) => fileSize <= MAX_PICTURE_SIZE;

/**
 * Checks if the given image dimensions are valid.
 *
 * The dimensions are valid if both the width and height are within the range of
 * `ImageDimension.min` and `ImageDimension.max`.
 *
 * @param {number} width - The width of the image.
 * @param {number} height - The height of the image.
 * @returns {boolean} True if the dimensions are valid, false otherwise.
 */
export const checkIsImageDimensionsValid = (width: number, height: number) =>
  width <= ImageDimension.max &&
  height <= ImageDimension.max &&
  width >= ImageDimension.min &&
  height >= ImageDimension.min;
