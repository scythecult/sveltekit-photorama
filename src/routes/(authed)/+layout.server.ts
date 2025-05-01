import { PHOTORAMA_BASE_URL } from '$lib/constants/app';
import type { UserInfo } from '$lib/types/userInfo.js';

export const load = async ({ fetch }) => {
  const rawUserInfoData = await fetch(`${PHOTORAMA_BASE_URL}/accounts`);

  if (!rawUserInfoData.ok) {
    return;
  }

  const userInfo: UserInfo = (await rawUserInfoData.json()) || {};

  return { userInfo };
};
