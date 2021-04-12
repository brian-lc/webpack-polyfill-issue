// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const fetch = require('node-fetch');

const handler = async (event) => {
  try {

    // Build OpenSea query 
    const assetContract = '0x97ca7fe0b0288f5eb85f386fed876618fb9b8ab8';
    const tokenId = '3956';
    const apiRoot = 'https://api.opensea.io/api/v1/assets';
    const queryFragment = `asset_contract_addresses=${assetContract}&token_ids=${tokenId}`;
    const query = `${apiRoot}?order_direction=desc&offset=0&limit=1&${queryFragment}`;
    //const query = "https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=1&asset_contract_addresses=0x97ca7fe0b0288f5eb85f386fed876618fb9b8ab8&token_ids=3956";
    
    console.log('query', query);

    // Request token metadata
    const options = {method: 'GET'};
    const resp = await fetch(query, options);
    const jresp = await resp.json();
    console.log(JSON.stringify(jresp));

    // Extract owner address/current user address
    const holderAddress = jresp['assets'][0]['owner']['address'];
    const userAddress = event.queryStringParameters.address;
    console.log('userAddress', userAddress);
    console.log('hldrAddress', holderAddress);

    var media = {};
    // Compare owner to address passed in through the API request
    if (userAddress.trim().toLowerCase() === holderAddress.trim().toLowerCase()) {
      // if user matches holder, return the media paths
      console.log('ADDRESS MATCH - media returned');
      media = {
        raw_media_url: 'https://filesamples.com/samples/audio/wav/Symphony%20No.6%20(1st%20movement).wav',
        preview_media_url: 'https://filesamples.com/samples/audio/mp3/Symphony%20No.6%20(1st%20movement).mp3'
      };
    } else {
      console.log('NO MATCH - empty media object returned');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ media: media})
    }
    
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
