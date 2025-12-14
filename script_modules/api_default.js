import axios from 'axios'

export default async function api_default({ url, method = 'GET', body = '', token = '' } = {}) {
  try {
    const response = await axios({
      method,s
      url,
      headers: {
        accept: 'application/json',
        Authorization: token ? 'Bearer ' + token : undefined
      },
      timeout: 5000,
      data: body // Only needed for POST/PUT/PATCH requests
    });

    return response.data.content;

  } catch (error) {
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Body:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    //throw error;
  }
}
