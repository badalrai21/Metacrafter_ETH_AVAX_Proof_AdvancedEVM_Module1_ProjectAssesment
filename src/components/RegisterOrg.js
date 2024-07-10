import React, { useState } from 'react';
import { ethers } from 'ethers';
import OrgRegistry from '../contracts/OrgRegistry.json';

function RegisterOrg({ provider }) {
  const [tokenAddress, setTokenAddress] = useState('');

  async function registerOrg() {
    const signer = provider.getSigner();
    const orgRegistryContract = new ethers.Contract('ORG_REGISTRY_CONTRACT_ADDRESS', OrgRegistry.abi, signer);
    await orgRegistryContract.registerOrganization(tokenAddress);
  }

  return (
    <div className="container">
      <h2>Register Organization</h2>
      <input
        type="text"
        placeholder="Token Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <button onClick={registerOrg}>Register</button>
    </div>
  );
}

export default RegisterOrg;
