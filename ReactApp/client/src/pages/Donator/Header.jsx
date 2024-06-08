import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context';
import Approve from '../../components/Approve';
import { navlinks } from './MenuPanel';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="absolute top-0 right-0 m-4">
        {!address && (
          <Approve 
            buttonType="button"
            label="Connect"
            customStyles="bg-white text-black"
            onClickHandler={connect}
          />
        )}
      </div>

        <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          {!address && (
            <div className="flex mx-4">
              <Approve 
                buttonType="button"
                label="Connect"
                customStyles="bg-white text-black"
                onClickHandler={connect}
              />
            </div>
          )}
      </div>
    </div>
  )
}

export default Navbar
