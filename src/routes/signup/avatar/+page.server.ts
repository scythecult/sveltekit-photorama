import { type Actions, fail } from '@sveltejs/kit';
import { HTTPMethod } from 'http-method-enum';
import { StatusCodes } from 'http-status-codes';
import sharp from 'sharp';
import { fetchData } from '$lib/api/fetchData';
import { FormActionName, InputName } from '$lib/constants/action';
import { AppPath, PHOTORAMA_BASE_URL } from '$lib/constants/app';
import { CookieName } from '$lib/constants/request';
import type { ResponseSignupAvatarPayload } from '$lib/types/responsePayload';
import { isFileSizeValid, isFileTypeValid, isImageDimensionsValid } from '$lib/utils/utils';

export const load = async ({ cookies }) => {
  const signupSessionId = cookies.get(CookieName.SIGNUP_SESSION_ID);
  let avatarUrl = '';

  if (signupSessionId) {
    const {
      data: { avatarUrl: savedAvatarUrl },
    } = await fetchData<ResponseSignupAvatarPayload>(`${PHOTORAMA_BASE_URL}${AppPath.IMAGES}`, HTTPMethod.GET, {
      cookies,
    });

    avatarUrl = savedAvatarUrl;
  }

  return {
    isLoading: false,
    avatarUrl,
  };
};

export const actions: Actions = {
  [FormActionName.SIGNUP_AVATAR]: async ({ request, cookies }) => {
    const data = await request.formData();
    const avatarFile = data.get(InputName.AVATAR) as File;

    const result = {
      avatarUrl: '',
      isLoading: true,
      validationResult: {
        isFileSizeValid: false,
        isFileTypeValid: false,
        isImageDimensionsValid: false,
      },
    };

    if (avatarFile.size) {
      const sharpImage = sharp(await avatarFile.arrayBuffer());
      const { format, size, width, height } = await sharpImage.metadata();
      const validationResult = {
        isFileSizeValid: isFileSizeValid(size!),
        isFileTypeValid: isFileTypeValid(`image/${format}`),
        isImageDimensionsValid: isImageDimensionsValid(width!, height!),
      };

      if (!Object.values(validationResult).every(Boolean)) {
        return fail(StatusCodes.UNPROCESSABLE_ENTITY, {
          ...result,
          isLoading: false,
          validationResult,
        });
      }

      const convertedImage = await sharpImage.webp({ quality: 85 }).toBuffer();

      const {
        data: { avatarUrl },
      } = await fetchData<ResponseSignupAvatarPayload>(`${PHOTORAMA_BASE_URL}${AppPath.IMAGES}`, HTTPMethod.POST, {
        cookies,
        params: {
          body: { image: convertedImage },
        },
      });

      return {
        avatarUrl,
        isLoading: false,
        validationResult,
      };
    }

    return {
      ...result,
      isLoading: false,
    };
  },

  [FormActionName.SIGNUP_AVATAR_DEFAULT]: async ({ cookies }) => {
    const convertedImage = await sharp({
      create: { width: 200, height: 200, channels: 4, background: { r: 155, g: 155, b: 155, alpha: 0 } },
    })
      .webp({ quality: 85 })
      .toBuffer();

    const {
      data: { avatarUrl },
    } = await fetchData<ResponseSignupAvatarPayload>(`${PHOTORAMA_BASE_URL}${AppPath.IMAGES}`, HTTPMethod.POST, {
      cookies,
      params: {
        body: { image: convertedImage },
      },
    });

    return {
      isLoading: false,
      avatarUrl,
      validationResult: {
        isFileSizeValid: true,
        isFileTypeValid: true,
        isImageDimensionsValid: true,
      },
    };
  },
};
