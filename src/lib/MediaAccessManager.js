class MediaAccessManager {

  

  static requestAccessFor(userAddress) {
    const NETLIFY_FUNC =
      'priceless-mayer-402b9f.netlify.app.netlify.com/.netlify/functions';
      fetch(
        `https://${NETLIFY_FUNC}/check-ownership?address=${userAddress}`
      )
        .then(x => x.json())
        .then(x => {
          console.log('HERE', x);
        })
    
    const mediaObjects = {
      media: {
          raw_media_path: 'https://filesamples.com/samples/audio/wav/Symphony%20No.6%20(1st%20movement).wav',
          preview_media_path: 'https://filesamples.com/samples/audio/mp3/Symphony%20No.6%20(1st%20movement).mp3'
      }
    };

    return (mediaObjects);
  }
}

export default MediaAccessManager;