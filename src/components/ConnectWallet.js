import React, { useState } from 'react';
import { ethers } from 'ethers';

function ConnectWallet({ onConnect }) {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      onConnect(accounts[0]);
    } else {
      alert('Please install MetaMask');
    }
  }

  return (
    <div className="container">
      <button onClick={connectWallet}>Connect Wallet</button>
      {account && <p>Connected as: {account}</p>}
    </div>
  );
}

export default ConnectWallet;
