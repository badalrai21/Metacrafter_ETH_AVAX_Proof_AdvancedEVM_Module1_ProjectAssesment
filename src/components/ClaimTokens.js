import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TokenVesting from '../contracts/TokenVesting.json';

function ClaimTokens({ provider }) {
  const [claimable, setClaimable] = useState(false);

  useEffect(() => {
    async function checkClaimable() {
      const signer = provider.getSigner();
      const tokenVestingContract = new ethers.Contract('TOKEN_VESTING_CONTRACT_ADDRESS', TokenVesting.abi, signer);

      const stakeholder = await tokenVestingContract.stakeholders(await signer.getAddress());
      setClaimable(stakeholder.amount > 0 && block.timestamp >= stakeholder.releaseTime && !stakeholder.claimed);
    }

    checkClaimable();
  }, [provider]);

  async function claimTokens() {
    const signer = provider.getSigner();
    const tokenVestingContract = new ethers.Contract('TOKEN_VESTING_CONTRACT_ADDRESS', TokenVesting.abi, signer);
    await tokenVestingContract.claimTokens();
  }

  return (
    <div className="container">
      <h2>Claim Tokens</h2>
      {claimable ? (
        <button onClick={claimTokens}>Claim Tokens</button>
      ) : (
        <p>You are not eligible to claim tokens yet.</p>
      )}
    </div>
  );
}

export default ClaimTokens;
