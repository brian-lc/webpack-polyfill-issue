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
    // Setup wallet connect objects
    const { userAccount } = this.state;
    const NETLIFY_FUNC =
      'priceless-mayer-402b9f.netlify.app/.netlify/functions';

     fetch(`https://${NETLIFY_FUNC}/check-ownership?address=${userAccount}`
      )
      .then(x => x.json())
      .then(x => {
        console.log('HERE', x);
      })
    
    const media = {
        raw_media_path: 'https://filesamples.com/samples/audio/wav/Symphony%20No.6%20(1st%20movement).wav',
        preview_media_path: 'https://filesamples.com/samples/audio/mp3/Symphony%20No.6%20(1st%20movement).mp3'
    };

    this.setState({ media: media });
 }

 render() {
    const { userAccount } = this.state;
    return (
      <div>
        <h2>Media here</h2>
        <p>{ userAccount }</p>
        <AudioAsset />   
      </div>
    )
  };
};

export default HolderMedia;