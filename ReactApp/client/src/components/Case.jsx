import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Approve from "./Approve";
import { useStateContext } from "../context";

const Case = ({
  beneficiary,
  name,
  title,
  desc,
  document, 
  goalAmount,
  currentAmount,
  isActive,
  projectId,
  handleClick,
}) => {
  const { approveBeneficiaryProject } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const navigate = useNavigate();

  const approveProject = async () => {
    setIsLoading(true);
    try {
      await approveBeneficiaryProject(projectId);
      setIsApproved(true);
      navigate("/charityorg-dashboard/projects-to-approve");
    } catch (error) {
      console.log("Approval failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={handleClick}
    >
      <a href={document} download>
        Download Document
      </a>

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <p className="ml-[1px] mt-[2px] font-epilogue font-bold text-[20px] text-[#ffff]">
            Case ID : {projectId.toString()}
          </p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title.toString()}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {desc.toString()}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          
        </div>

        {isActive && (
          <div className="flex justify-center items-center mt-[40px]">
            <p className="font-epilogue font-semibold text-[16px] text-white mr-2">
              Approved
            </p>
          </div>
        )}

        {!isApproved && !isActive && (
          <div className="flex justify-center items-center mt-[40px]">
            <Approve
              btnType="button"
              title="Approve"
              styles="bg-[#ffff]"
              handleClick={approveProject}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Case;
