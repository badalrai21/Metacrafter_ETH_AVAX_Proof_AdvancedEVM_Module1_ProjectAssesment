import React, { useState } from 'react';
import { ethers } from 'ethers';
import TokenVesting from '../contracts/TokenVesting.json';

function AddStakeholder({ provider }) {
  const [stakeholder, setStakeholder] = useState('');
  const [amount, setAmount] = useState(0);
  const [vestingPeriod, setVestingPeriod] = useState(0);

  async function addStakeholder() {
    const signer = provider.getSigner();
    const tokenVestingContract = new ethers.Contract('TOKEN_VESTING_CONTRACT_ADDRESS', TokenVesting.abi, signer);
    await tokenVestingContract.addStakeholder(stakeholder, ethers.utils.parseUnits(amount, 18), vestingPeriod);
  }

  return (
    <div className="container">
      <h2>Add Stakeholder</h2>
      <input
        type="text"
        placeholder="Stakeholder Address"
        value={stakeholder}
        onChange={(e) => setStakeholder(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Vesting Period (seconds)"
        value={vestingPeriod}
        onChange={(e) => setVestingPeriod(e.target.value)}
      />
      <button onClick={addStakeholder}>Add Stakeholder</button>
    </div>
  );
}

export default AddStakeholder;
