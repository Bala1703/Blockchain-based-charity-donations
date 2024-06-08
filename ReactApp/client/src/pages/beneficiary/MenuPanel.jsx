import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { newcase, viewcases, exit, about } from '../../assets';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div className={`w-[48px] h-[48px] ${isActive && isActive === name} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick} title={name}>
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
    )}
  </div>
)

const navlinks = [
  {
    name: 'projects',
    imgUrl: viewcases,
    link: '/beneficiary-dashboard/projects',
  },
  {
    name: 'charityProject',
    imgUrl: newcase,
    link: '/beneficiary-dashboard/create-charity-project',
  },

  {
    name: 'profile',
    imgUrl: about,
    link: '/beneficiary-dashboard/profile',
  },
  {
    name: 'logout',
    imgUrl: exit,
    link: '/',
  },
];

const MenuPanel = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');

  useEffect(() => {
    const currentPath = location.pathname;
    const activeLink = navlinks.find((link) => link.link === currentPath);
    if (activeLink) {
      setIsActive(activeLink.name);
    }
  }, [location.pathname]);

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] w-[76px] py-4 mt-14">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export { navlinks, MenuPanel };