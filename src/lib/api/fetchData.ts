import { type Cookies } from '@sveltejs/kit';
import { serialize } from 'cookie';
import { HTTPMethod } from 'http-method-enum';
import { StatusCodes } from 'http-status-codes';
import { DefaultHeader } from '$lib/constants/request';
import HttpError from '$lib/dto/HttpError';

type FetchDataOptions = {
  headers?: Headers;
  cookies?: Cookies;
  params?: {
    body?: object;
    query?: Record<string, unknown>;
  };
};

type FetchDataRequestOptions = {
  method: HTTPMethod;
  headers?: Headers;
  body?: string;
};

type FetchDataResponsePayload<Payload = Record<string, unknown>> = {
  message?: string;
  jwtToken?: string;
  data: Payload;
  response: Response;
};

const onRequestSuccess = (
  response: Response | undefined,
  url: string,
  requestOptions: RequestInit,
  data?: unknown,
): void | never => {
  if (response) {
    const { status } = response;

    if (status >= StatusCodes.BAD_REQUEST) {
      throw new HttpError(JSON.stringify(data), status, url, requestOptions);
    }
  }
};

const onRequestError = (error: unknown, url: string, requestOptions: RequestInit): never => {
  const message = error instanceof Error ? error.message : undefined;

  throw new HttpError(message, StatusCodes.INTERNAL_SERVER_ERROR, url, requestOptions);
};

export const fetchData = async <Payload>(
  url: string,
  method: HTTPMethod = HTTPMethod.GET,
  options?: FetchDataOptions,
): Promise<FetchDataResponsePayload<Payload>> => {
  const newHeaders = new Headers(DefaultHeader);
  const requestOptions: FetchDataRequestOptions = {
    method,
  };
  let response: Response | undefined;

  if (options?.cookies) {
    const cookies = options.cookies.getAll();

    newHeaders.set('Cookie', cookies.map(({ name, value }) => serialize(name, value)).join('; '));
    requestOptions.headers = newHeaders;
  }

  if (options?.params?.body) {
    requestOptions.body = JSON.stringify(options?.params?.body);
  }

  try {
    response = await fetch(url, requestOptions);
  } catch (error) {
    onRequestError(error, url, requestOptions);
  }

  const data = await response?.json();

  onRequestSuccess(response, url, requestOptions, data);

  return { ...data, response };
};
