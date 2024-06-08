import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { viewcases, exit, newcase, about } from '../../assets';

const Icon = ({ customStyles, name, imgUrl, isActive, disabled, onClickHandler }) => (
  <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${customStyles}`} onClick={onClickHandler} label={name} >
    {!isActive ? (
      <>
        <img src={imgUrl} alt="Not found" className="w-1/2 h-1/2" />
        <p>{name}</p>
      </>
    ) : (
      <img src={imgUrl} alt="Not found" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
    )}
  </div>
)

const navlinks = [
  {
    name: 'Cases',
    imgUrl: viewcases,
    link: '/charityorg-dashboard/projects',
  },
  {
    name: 'Verify ',
    imgUrl: newcase,
    link: '/charityorg-dashboard/projects-to-approve',
  },
  
  {
    name: 'Profile',
    imgUrl: about,
    link: '/charityorg-dashboard/profile',
  },
  {
    name: 'Logout',
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

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon 
              key={link.name}
              {...link}
              isActive={isActive}
              onClickHandler={() => {
                if(!link.disabled) {
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