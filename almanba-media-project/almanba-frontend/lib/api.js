// lib/api.js
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export async function fetchAPI(path, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const requestUrl = `${STRAPI_API_URL}/api${path}`;

  try {
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      console.error('Response status text:', response.statusText);
      throw new Error(`An error occurred please try again: ${response.statusText} (URL: ${requestUrl})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('FetchAPI Error:', error);
    throw error; // Re-throw the error so it can be caught by the caller
  }
}