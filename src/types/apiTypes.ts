// types/apiTypes.ts
import { NextApiRequest, NextApiResponse } from 'next';

export interface APIRequest extends NextApiRequest {
  body: {
    text: string;
  };
}

export type APIResponse = NextApiResponse<{ text: string }>;
