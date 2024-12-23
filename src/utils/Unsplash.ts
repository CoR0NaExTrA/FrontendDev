import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: 'RE3CpTHRigrGJgAZAokE_hHlj6CHmlzI8B4w4MZ4pZ8',
});

export const searchImages = async (query: string) => {
  try {
    const response = await unsplash.search.getPhotos({ query });
    return response.response?.results || [];
  } catch (error) {
    console.error('Error fetching images from Unsplash', error);
    return [];
  }
};