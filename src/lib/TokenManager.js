class TokenManager {

  /**
  * Builds the TokenManager instance
  * @param {string} contractAddress - The OpenSea AssetContract address (e.g '0x97ca7fe0b0288f5eb85f386fed876618fb9b8ab7' ) 
  * @param {string} tokenId - The OpenSea specific tokenId, scoped to contract address (e.g '5321')
  */ 
  contstructor(assetContract, tokenId){
    this.assetContract = assetContract;
    this.tokenId = tokenId;
  }

  /**
   * Utility method to call openSea API
   */
  static fetchOpenSeaRecord(queryFragment){
    const options = {method: 'GET'};

    fetch(`https://api.opensea.io/api/v1/assets?
      order_direction=desc&
      offset=0&
      limit=20&${queryFragment}`, options)
      .then(response => {

        console.log(response)
        return(response.body);
      })
      .catch(err => console.error(err));
  }

  /**
   * Raw token details from OpenSea API
   * @return {string} JSON object from Opensea
   */
  static tokenDetails() {
    return this.fetchOpenSeaRecord(`asset_contract_addresses=${this.assetContract}&token_ids=${this.tokenId}`);
  }

  /**
   * Pulls the token record from OpenSea API and returns the meta data object
   * Used to populate UI with details from the NFT 
   * @param {string} ownerAddress - Find token based on Id and owner
   */
  static getTokenRecordByOwner(ownerAddress) {
    return this.fetchOpenSeaRecord(`owner=${ownerAddress}&token_ids=${this.tokenId}`);
  }

}

export default TokenManager;