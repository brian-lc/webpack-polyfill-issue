class MediaAccessManager {

  static requestAccessFor(ownerAddress) {
    
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