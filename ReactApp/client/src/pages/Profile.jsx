import React, { useState, useEffect } from 'react';
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Profile = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    const data = await getUserCampaigns();
    setCampaigns(data);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      campaigns={campaigns}
    />
  );
}

export default Profile;
