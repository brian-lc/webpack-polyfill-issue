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
    this.setState({ media: [] });
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