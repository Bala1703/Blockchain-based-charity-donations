import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../../context";
import { CustomButton, FormField } from "../../components";

const CreateOrganization = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    createOrganization,
    getOrganization,
    charityOrg
  } = useStateContext();

  const [form, setForm] = useState({
    OrgName: "",
    Desc: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await createOrganization({ ...form });
    setIsLoading(false);
    navigate("/charityorg-dashboard");
  };

  useEffect(() => {
    getOrganization();
  }, []);

  return (
    <div className="bg-[#ffff] flex justify-center items-center flex-col sm:p-10 p-4 my-[100px]">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#ffff] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-black">
          Profile
        </h1>
      </div>

      {charityOrg && charityOrg.OrgName !== '' ? (
        <div >
          <div className="beneficiary-container m-5">
            <div className="card mb-3 bg-[#fff] border-0">
              <div className="flex">
                <div className="w-1/1">
                </div>
                <div className="w-2/2">
                  <div className="card-body text-[#808191] m-1 ">
                    <h4 className="card-label m-1 ">
                      <b className="text-[#000]">Organization Name :</b>
                      {charityOrg.OrgName.toString()}
                    </h4>
                    <p className="card-text2 m-1">
                      <b className="text-[#000]">Address :</b> {charityOrg.OrgAddress.toString()}
                    </p>
                    <h3 className="card-text3 m-1">
                      <b className="text-[#000]">Balance :</b> {charityOrg.orgBalance.toString()}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-[65px] flex flex-col gap-[30px] bg-white">
<form
  onSubmit={handleSubmit}>
<div style={{ fontSize: '18px' }}>Enter your Name</div>
<br />
<div className="bg-black p-0.5" style={{ width: '300px' }}>
  <input
    value={form.name}
    onChange={(e) => handleFormFieldChange("name", e)}
    style={{ color: 'black', width: '100%', fontSize: '16px' }}
  />
</div>

  <div className="flex justify-center items-center mt-[40px]">
    <CustomButton
      buttonType="submit"
      label="Create Profile"
      customStyles="bg-white border-2 border-black"
      />
  </div>
</form>
</div>

      )}
    </div>
  );
};

export default CreateOrganization;
