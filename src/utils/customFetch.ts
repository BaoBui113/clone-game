// lib/fetcher.js
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://royalgames.test:8000/api';
const AUTHOR_TOKEN = process.env.NEXT_PUBLIC_AUTHORIZE_TOKEN || '';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const customFetch = async (url: string, options: FetchOptions = {}) => {
  console.log('AUTHOR_TOKEN', AUTHOR_TOKEN);
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        Authorization: AUTHOR_TOKEN,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred');
    }

    return await response.json();
  } catch (error: any) {
    console.error('Fetch Error:', error);
    throw error;
  }
};
