import { APIRequestContext, request } from '@playwright/test';

export async function getApiClient(baseURL: string): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1',
    },
  });
}