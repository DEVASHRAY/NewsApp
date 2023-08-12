import client from '../utils/client';
import {API_KEYS} from '../utils/env';

export default async function fetchAllNews() {
  const {data} = await client.get(
    `/everything?q=bitcoin&apiKey=${API_KEYS.NEWS_API_KEY}`,
  );

  return data;
}
