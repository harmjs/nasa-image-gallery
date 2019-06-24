export const Content = function(query, collection) {
  this.query = query;
  this.currentChunk = 0;
  this.totalHits = collection.metadata.total_hits;
  this.chunks = {};

  return this.add(0, collection);
}

const ContentPrototype = {
  CHUNK_SIZE: 12,
  COLLECTION_SIZE: 100,
  add: function(pageIndex, collection) {
    const start = pageIndex * this.COLLECTION_SIZE;

    const addedChunks = collection.items.reduce((chunks, item, index) => {
      const current = start + index;
      const currentChunk = Math.floor(current / this.CHUNK_SIZE);
      const currentIndex = current % this.CHUNK_SIZE;

      if(!chunks.hasOwnProperty(currentChunk)) {
        if(this.chunks.hasOwnProperty(currentChunk)) { 
          chunks[currentChunk] = this.chunks[currentChunk].slice();
        }else { 
          chunks[currentChunk] = [...Array(this.CHUNK_SIZE)]
        }
      }
      chunks[currentChunk][currentIndex] = new Item(item);

      return chunks;
    }, {});

    const nextChunks = Object.assign({}, this.chunks, addedChunks);

    return Object.assign(
      Object.create(ContentPrototype),
      this,
      { chunks: nextChunks }
    )
  }
}

Content.prototype = ContentPrototype;

const Item = function(item) {  
  const { 
    description, media_type, nasa_id, title, keywords
  } = item.data[0];

  this.nasaId = nasa_id;

  this.title = title;
  this.keywords = keywords;
  this.description = description;
  this.type = media_type;

  this.thumbnail = item.links[0].href;
}

