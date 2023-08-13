import client from '../utils/client';
import {API_KEYS} from '../utils/constant';

export default async function fetchAllNews({page = 1}) {

  const {data} = await client.get(
    `/everything?page=${page}&q=bitcoin&apiKey=${API_KEYS.NEWS_API_KEY}`,
  );

  return data;
}
