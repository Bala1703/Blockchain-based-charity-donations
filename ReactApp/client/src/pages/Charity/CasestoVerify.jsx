import React, { useState, useEffect } from 'react'
import { DisplayCampaigns } from '../../components';
import { useStateContext } from '../../context'

const AllProjects = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const { address, contract, allProjects, getCharityProjects } = useStateContext();

  useEffect(() => {
    if(contract) getCharityProjects();
  }, [address, contract]);
  return (
    <DisplayCampaigns 
      title="Unapproved Cases"
      isLoading={isLoading}
      charityProjects={allProjects}
    />
  )
}

export default AllProjects