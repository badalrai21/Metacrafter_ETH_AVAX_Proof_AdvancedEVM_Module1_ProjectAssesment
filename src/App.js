import React, { useState } from 'react';
import { ethers } from 'ethers';
import ConnectWallet from './components/ConnectWallet';
import RegisterOrg from './components/RegisterOrg';
import AddStakeholder from './components/AddStakeholder';
import ClaimTokens from './components/ClaimTokens';
import './index.css';

function App() {
  const [provider, setProvider] = useState(null);

  function handleConnect(account) {
    setProvider(new ethers.providers.Web3Provider(window.ethereum));
  }

  return (
    <div className="container">
      <h1>Token Vesting DApp</h1>
      {!provider && <ConnectWallet onConnect={handleConnect} />}
      {provider && (
        <div>
          <RegisterOrg provider={provider} />
          <AddStakeholder provider={provider} />
          <ClaimTokens provider={provider} />
        </div>
      )}
      <footer>
        <p>Made by: Badal Kumar Rai</p>
      </footer>
    </div>
  );
}

export default App;
