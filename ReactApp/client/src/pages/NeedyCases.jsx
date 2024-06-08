  import React, { useState, useEffect } from 'react'
  import { useLocation, useNavigate } from 'react-router-dom';
  import { ethers } from 'ethers';
  import { useStateContext } from '../context';
  import { Number, CustomButton } from '../components';
  const NeedyCases = () => {
    const { state } = useLocation();
    const { projectId, charityProject } = state;

    console.log(projectId);
    console.log(charityProject);

    const location = useLocation();
    const dashboardPath = location.pathname.split('/')[1];

  const goalAmountBigNumber = ethers.BigNumber.from(charityProject.goalAmount);

  const goalAmountEther = ethers.utils.formatEther(goalAmountBigNumber);

  const currentAmountBigNumber = ethers.BigNumber.from(charityProject.currentAmount);

  const currentAmountEther = ethers.utils.formatEther(currentAmountBigNumber);

    const navigate = useNavigate();
    const { donateToProject, contract, address, getProjectDonators, donators } = useStateContext();
    console.log(donators);
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');


    useEffect(() => {
      getProjectDonators(state.projectId);
    }, [])

    const handleDonate = async () => {
      setIsLoading(true);

      await donateToProject(projectId, amount); 

      navigate('/Donator-homepage/cases')
      setIsLoading(false);
    }

    return (
      <div>
        {/* {isLoading && <Loader />} */}
        <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        

          <div className="flex md:w-[150px] w-full justify-end gap-[30px] mt-40 ml-10">
    <Number title={`Goal Amt - ${goalAmountEther}`} value={currentAmountEther} />
  </div>
        </div>
        <div className="mt-[-190px] flex lg:flex-row flex-col gap-5">
          <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">{charityProject.title}</h4>

              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{charityProject.beneficiary}</h4>
                  <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">{charityProject.name}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase mt-[40px]">Donators</h4>

              <div className="mt-[20px] flex flex-col gap-4">
    {donators.length > 0 && donators.map((item, index) => (
      <div key={`${item}-${index}`} className="flex justify-between items-center gap-4">
        <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item}</p>
      </div>
    ))}
  </div>
            </div>
          </div>
          {dashboardPath=='Donator-homepage' && 
            <div className="flex-1">

<div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
  <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#ffff]">
    Donate Here
  </p>
  <div className="mt-[30px]">
    <input 
      type="number"
      step="0.01"
      className="w-full py-[10px] sm:px-[20px] px-[15px] mb-0 outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />

    <CustomButton 
      btnType="button"
      title="Fund Project"
      styles="w-full bg-[#ffff] mt-4"
      handleClick={handleDonate}
    />
  </div>
</div>
          </div>
          }
        </div>
      </div>
    )
  }

  export default NeedyCases