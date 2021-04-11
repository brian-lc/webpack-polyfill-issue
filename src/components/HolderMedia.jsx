import React from 'react'
import AudioAsset from './AudioAsset'

class HolderMedia extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      userAccount: this.props.userAccount,
      media: []
    }; 
 }

 componentDidMount() {
    const { userAccount } = this.state;
    const NETLIFY_FUNC =
      'priceless-mayer-402b9f.netlify.app/.netlify/functions';

    // after mounting query to determine if we should display content 
    fetch(`https://${NETLIFY_FUNC}/check-ownership?address=${userAccount}`)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ media: resp['media'] });
        console.log('HERE', resp);
      })
 }

 render() {
    const { userAccount, media } = this.state;
    return (
      <div>
        <h2>Media here</h2>
        <p>{ userAccount }</p>
        <p>{JSON.toString(media)}</p>
        <AudioAsset />   
      </div>
    )
  };
};

export default HolderMedia;