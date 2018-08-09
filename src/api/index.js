import axios from 'axios';

export function fetchItem() {
  const headers = {
    'Content-Type': 'application/json',
  };
  const instance = axios.create({
    baseURL: 'https://cdn.contentful.com',
    headers,
  });
  instance.defaults.headers.common['Authorization'] = 'Bearer 27f6bda4b5b427ad338ca178f534fcb450b74cc3647bfcd70361757bb7e75493';

  return instance.get(
    '/spaces/4nsws7fpa2v3/entries/',
  ).then((data) => {
    return data;
  });
}
