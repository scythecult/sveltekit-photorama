import { type Actions, error, fail } from '@sveltejs/kit';
import { HTTPMethod } from 'http-method-enum';
import { StatusCodes } from 'http-status-codes';
import sharp from 'sharp';
import { FormActionName, InputName } from '$lib/constants/action';
import { AppPath, PHOTORAMA_BASE_URL } from '$lib/constants/app';
import { CookieName } from '$lib/constants/request';
import type { AvatarPayload, ResponsePayload } from '$lib/types/responsePayload';
import { checkIsFileSizeValid, checkIsFileTypeValid, checkIsImageDimensionsValid } from '$lib/utils/validation.js';

export const load = async ({ fetch, cookies }) => {
  const signupSessionId = cookies.get(CookieName.SIGNUP_SESSION_ID);

  if (!signupSessionId) {
    return {
      avatarUrl: '',
    };
  }

  const response = await fetch(`${PHOTORAMA_BASE_URL}${AppPath.IMAGES}`, {
    method: HTTPMethod.GET,
  });

  if (response.ok) {
    const {
      data: { avatarUrl },
    }: ResponsePayload<AvatarPayload> = await response.json();

    return {
      avatarUrl,
    };
  }

  error(StatusCodes.INTERNAL_SERVER_ERROR);
};

export const actions: Actions = {
  [FormActionName.SIGNUP_AVATAR]: async ({ fetch, request }) => {
    const data = await request.formData();
    const avatarFile = data.get(InputName.AVATAR) as File;
    const validationResult = {
      isFileSizeValid: false,
      isFileTypeValid: false,
      isImageDimensionsValid: false,
    };

    if (!avatarFile) {
      return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
        validationResult,
      });
    }

    const sharpImage = sharp(await avatarFile.arrayBuffer());
    const { format, size, width, height } = await sharpImage.metadata();

    // TODO Refactor?
    validationResult.isFileSizeValid = checkIsFileSizeValid(size!);
    validationResult.isFileTypeValid = checkIsFileTypeValid(format);
    validationResult.isImageDimensionsValid = checkIsImageDimensionsValid(width!, height!);

    if (!Object.values(validationResult).every(Boolean)) {
      return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
        validationResult,
      });
    }

    const convertedImage = await sharpImage.webp({ quality: 85 }).toBuffer();

    const response = await fetch(`${PHOTORAMA_BASE_URL}${AppPath.IMAGES}`, {
      method: HTTPMethod.POST,
      body: JSON.stringify({ image: convertedImage }),
    });

    if (response.ok) {
      return {
        validationResult,
      };
    }

    error(StatusCodes.INTERNAL_SERVER_ERROR);
  },

  [FormActionName.SIGNUP_AVATAR_DEFAULT]: async ({ fetch }) => {
    const image = await sharp({
      create: { width: 200, height: 200, channels: 4, background: { r: 155, g: 155, b: 155, alpha: 0 } },
    })
      .webp({ quality: 85 })
      .toBuffer();

    const response = await fetch(`${PHOTORAMA_BASE_URL}${AppPath.IMAGES}`, {
      method: HTTPMethod.POST,
      body: JSON.stringify({ image }),
    });

    if (response.ok) {
      const {
        data: { avatarUrl },
      }: ResponsePayload<AvatarPayload> = await response.json();

      return {
        avatarUrl,
        validationResult: {
          isFileSizeValid: true,
          isFileTypeValid: true,
          isImageDimensionsValid: true,
        },
      };
    }

    error(StatusCodes.INTERNAL_SERVER_ERROR);
  },
};
