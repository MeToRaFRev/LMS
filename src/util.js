// util.js
import axios from 'axios';
import { parse } from 'fast-xml-parser';

export async function fetchData(requestDetails) {
  const { url, method = 'GET', headers = {}, params = {}, data = null } = requestDetails;
  
  try {
    const jsonResponse = await axios({
      url,
      method,
      headers: { ...headers, Accept: 'application/json' },
      params,
      data,
    });
    return jsonResponse.data;
  } catch (jsonError) {
    console.warn('JSON request failed, trying XML fallback:', jsonError);
    
    const xmlParams = { ...params };
    if (xmlParams.format && xmlParams.format.toString().toLowerCase() === 'json') {
      xmlParams.format = 'xml';
    }
    
    try {
      const xmlResponse = await axios({
        url,
        method,
        headers: { ...headers, Accept: 'application/xml' },
        params: xmlParams,
        data,
      });
      return parse(xmlResponse.data, { ignoreAttributes: false });
    } catch (xmlError) {
      console.error('XML request failed:', xmlError);
      throw new Error('Both JSON and XML requests failed.');
    }
  }
}

export const transformCatalogData = (data) => {
  if (!data || !data.catalogs || !data.catalogs.catalog) {
    return [];
  }
  return data.catalogs.catalog.map((item) => ({
    // Use the entire 'path' as a unique id (comma-separated string)
    id: item.path.join(','),
    name: item.name,
    description: item.pathDesc || '',
  }));
};

export const fetchSubCatalogData = (id) => {
  return fetchData({
    url: `https://apis.cbs.gov.il/series/catalog/path?id=${id}&format=json&download=false`,
    method: 'GET'
  })
    .then((data) => {
      console.log('Sub-catalog data:', data);
      return transformCatalogData(data);
    })
    .catch((error) => {
      console.error('Failed to fetch sub-catalog data:', error);
      return [];
    });
};
