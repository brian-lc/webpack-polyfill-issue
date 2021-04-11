// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const fetch = require('node-fetch');

const handler = async (event) => {
  try {
    // Get holder address 
    const options = {method: 'GET'};
    const assetContract = '0x97ca7fe0b0288f5eb85f386fed876618fb9b8ab8';
    const tokenId = '3956';
    const queryFragment = `asset_contract_addresses=${assetContract}&token_ids=${tokenId}`;

    console.log('query', queryFragment);

    // Getting the latest details on the token holder
    fetch(`https://api.opensea.io/api/v1/assets?
      order_direction=desc&
      offset=0&
      limit=20&${queryFragment}`, options)
      .then(response => response.json())
      .then(response => {

        console.log('OpenSeaResponse', response);
        const holderAddress = response['assets'][0]['owner']['address'];

        // Pulling the userAddress from the query params
        const userAddress = event.queryStringParameters.address;
        console.log('userAddress', userAddress);
        console.log('holderAddress', holderAddress);

        var media = {};
        if (userAddress == holderAddress) {
          // if user matches holder, return the media paths
          media = {
            raw_media_path: 'https://filesamples.com/samples/audio/wav/Symphony%20No.6%20(1st%20movement).wav',
            preview_media_path: 'https://filesamples.com/samples/audio/mp3/Symphony%20No.6%20(1st%20movement).mp3'
          };
        }
        return {
          statusCode: 200,
          body: JSON.stringify({ media: media }),
        }
      })
      .catch(err => console.error(err));
    
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
