import React from 'react'

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
      </div>
    )
  };
};

export default HolderMedia;