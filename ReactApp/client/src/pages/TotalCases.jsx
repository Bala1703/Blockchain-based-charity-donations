import React, { useState, useEffect } from 'react';
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const TotalCases = () => {
  const { address, contract, getApprovedProjects, approvedProjects } = useStateContext();

  const fetchCampaigns = async () => {
    getApprovedProjects();
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns 
      title="Cases"
      charityProjects={approvedProjects}
    />
  );
}

export default TotalCases;
