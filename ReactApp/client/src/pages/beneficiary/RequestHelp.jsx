import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../../context';
import { CustomButton, FormField } from '../../components';

const RequestHelp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCharityProject } = useStateContext();
  const [form, setForm] = useState({
    title: '',
    description: '',
    goalAmount: '',
    document: null, 
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, document: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await createCharityProject({
      ...form,
      goalAmount: ethers.utils.parseUnits(form.goalAmount, 18),
    });
    setIsLoading(false);
    navigate('/beneficiary-dashboard');
  };

  return (
    <div className="bg-[#ffff] flex items-center flex-col sm:p-10 p-4 my-[100px]">

<form onSubmit={handleSubmit} className="mt-[10px] flex flex-col gap-[30px]">
  <div className="flex flex-wrap gap-[40px]">
    <div className="w-full">
      <div style={{ fontSize: '18px' }}>Explain your Cause</div>
      <div className="bg-black rounded-md p-0.5" style={{ width: '300px' }}>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleFormFieldChange('title', e)}
          style={{ color: 'black', width: '100%', fontSize: '16px' }}
        />
      </div>
    </div>
  </div>

  <div className="flex flex-wrap gap-[40px]">
    <div className="w-full">
      <div style={{ fontSize: '18px' }}>Goal Amount</div>
      <div className="bg-black rounded-md p-0.5" style={{ width: '300px' }}>
        <input
          type="text"
          value={form.goalAmount}
          onChange={(e) => handleFormFieldChange('goalAmount', e)}
          style={{ color: 'black', width: '100%', fontSize: '16px' }}
        />
      </div>
    </div>
  </div>

  <div className="flex flex-wrap gap-[40px]">
    <div className="w-full">
      <div style={{ fontSize: '18px' }}>Upload Document</div>
      <div className="bg-black rounded-md p-0.5" style={{ width: '300px', color: 'black' }}>
        <input
          type="file"
          id="document"
          accept=".pdf"
          onChange={handleDocumentChange}
          style={{ color: 'white', width: '100%', fontSize: '16px' }} 
        />
      </div>
    </div>
  </div>

  <div className="flex justify-center items-center mt-4">
    <CustomButton 
      buttonType="submit" 
      label="Create Charity Project" 
      customStyles="bg-white border-2 border-black"
    />
  </div>
</form>

    </div>
  );
};

export default RequestHelp;
