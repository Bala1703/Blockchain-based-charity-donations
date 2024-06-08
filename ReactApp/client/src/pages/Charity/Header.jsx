import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context';
import Approve from '../../components/Approve';
import { navlinks } from './MenuPanel';

const Header = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="absolute top-0 right-20 m-4">
        {!address && (
          <Approve 
            buttonType="button"
            label="Connect"
            customStyles="bg-white text-black"
            onClickHandler={() => {
              connect();
              console.log('wallet connected');
            }}
          />
        )}
      </div>
        <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          </div>

          <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>

      {!address && (
            <div className="flex mx-4">
              <Approve 
                buttonType="button"
                label="Connect"
                customStyles="bg-[#8c6dfd]" 
                onClickHandler={() => {
                  connect();
                  console.log('wallet connected');
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header