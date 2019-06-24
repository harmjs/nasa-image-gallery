const TIMEOUT_MS = 2000;

function process(apiPromise) {
  return new Promise(async function(resolve, reject) {
    const timeoutPromise = new Promise(function(resolve, reject) {
      setTimeout(() => {
        reject('request timed out after ' + TIMEOUT_MS + ' ms');
      }, TIMEOUT_MS)
    })

    try {
      const response = await Promise.race([ apiPromise, timeoutPromise ]);
      if(response.status === 200) {
        resolve(response.data);
      }else {
        reject('server error: ' + response.status);
      }
    }

    catch(err) {
      reject(err);
    }
  })
}

export const getNASACollection = function(query, page) { 
  const apiPromise = axios.get('./search', {
    params: { 
      query, page
    }
  })
  return process(apiPromise);
}