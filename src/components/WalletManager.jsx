import React from 'react'
import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"

import HolderMedia from './HolderMedia'


class WalletManager extends React.Component {

  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleWalletConnectOrUpdate = this.handleWalletConnectOrUpdate.bind(this);
    this.handleWalletDisconnect = this.handleWalletDisconnect.bind(this);

    // Create a connector
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });
    // Pull some state from existing connection
    if(connector.connected){
      this.state = {
        connector: connector,
        userAccount: connector.session.accounts,
        chainId: connector.session.chainId,
      }
    } else {
      this.state = { 
        connector: connector,
        userAccount: '0x123',
        chainId: -1
      }; 
    }
  }

  componentDidMount() {
    // TODO
  }

  handleWalletConnectOrUpdate(error, payload) {
    console.log('WalletConnectOrUpdate');
    if (error) {
      throw error;
    }
    // Get provided accounts and chainId
    const { accounts, chainId } = payload.params[0];
    this.setState({
      userAccount: accounts,
      chainId: chainId
    });
  };

  handleWalletDisconnect(error, payload) {
    if (error) {
      throw error;
    }
  };

  handleLoginClick() {
    const { connector } = this.state;
    connector.createSession();
    // this.setState({isWalletConnected: true});
    // subscribe to key events
    connector.on('connect', this.handleWalletConnectOrUpdate);
    connector.on('session_update', this.handleWalletConnectOrUpdate);
    connector.on('disconnect', this.handleWalletDisconnect);
  }

  handleLogoutClick() {
    const { connector } = this.state;
    connector.killSession();
    this.setState({isWalletConnected: false});
  }

  render() {
    const { connector, userAccount } = this.state;

    if (connector.connected) {
      // Connected wallet UI
      return (
        <div>
          <h2>Wallet connected</h2>
          <button type='button'
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={this.handleLogoutClick} >
            Disconnect Wallet
          </button>
          <HolderMedia userAccount={userAccount} />
        </div>
      );
    }

    // Connect wallet UI
    return (
      <div>
        <h2>Connect wallet</h2>
        <button type='button' 
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={this.handleLoginClick} >
          Connect Wallet
        </button>
      </div>
    );
  }
};

export default WalletManager;