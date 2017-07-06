import Axios from 'axios';

const SOURCE_URL = 'https://www.reddit.com';

function handleError(error) {
  console.warn(error);
  return null;
}

function fetchHotPosts(topic) {
  let encodedURI = window.encodeURI(`${SOURCE_URL}/r/${topic}/hot.json`);

  return Axios.get(encodedURI)
    .then(function(response) {
      return response.data.data.children;
    })
    .catch(handleError);
}

export default { fetchHotPosts };
