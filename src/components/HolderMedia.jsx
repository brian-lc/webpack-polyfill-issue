import React from 'react'
import ReactAudioPlayer from 'react-audio-player';

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

    // after mounting query to determine if we should display content 
    // Query the serverless function and provide the current user address
    fetch(`/.netlify/functions/check-ownership?address=${userAccount}`)
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
        <p>{ JSON.stringify(media) }</p>
        <ReactAudioPlayer
          src={ media.preview_media_url }
          autoPlay
          controls
        />
        <p>
          <a href={ media.raw_media_url } download> Download High Quality Version</a>
        </p>
      </div>
    )
  };
};

export default HolderMedia;