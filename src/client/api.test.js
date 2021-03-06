import testCollections from './testCollections';

const TIMEOUT_MS = 2000;
const DELAY_MS = 1000;

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
  return process(new Promise((resolve, reject) => {
    if(page > testCollections.length) {
      reject('no more pages available');
    }else {
      setTimeout(() => {
        resolve({
          status: 200,
          data: testCollections[page]
        });
      }, DELAY_MS);
    }
  }))
}