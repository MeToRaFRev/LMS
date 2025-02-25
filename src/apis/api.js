import axios from 'axios';

const BASE_URL = 'https://apis.cbs.gov.il/series';

// Helper function that retries a promise-returning function
const retryRequest = async (fn, retries = 3, delay = 1000) => {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt < retries) {
        // Wait for the specified delay before the next attempt
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
};

export const fetchSeriesLevel = async (level, subject) => {
  const params = {
    id: level,
    subject: subject,
    format: 'json',
    download: false,
    lang: 'he',
  };

  try {
    const response = await retryRequest(() =>
      axios.get(`${BASE_URL}/catalog/level`, { params })
    );
    // The API returns data in a nested structure, we need to extract the actual array
    return response.data?.catalogs?.catalog || [];
  } catch (error) {
    console.error('Error fetching series level:', error);
    throw error;
  }
};

export const fetchSeriesData = async (id, startPeriod, endPeriod) => {
  const params = {
    id,
    format: 'json',
    download: false,
    lang: 'he',
    startPeriod,
    endPeriod,
  };
  console.log('fetchSeriesData params:', JSON.stringify(params));
  try {
    const response = await retryRequest(() =>
      axios.get(`${BASE_URL}/data/list`, { params })
    );
    // Extract the actual data array from the response
    return response.data?.DataSet?.Series?.[0]?.obs || [];
  } catch (error) {
    console.error('Error fetching series data:', error);
    throw error;
  }
};
