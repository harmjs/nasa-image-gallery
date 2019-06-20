import axios from 'axios';

export async function search(q) {
  const response = await axios.get('/search', {
    params: {
      q
    }
  });

  console.log(response.data);
}