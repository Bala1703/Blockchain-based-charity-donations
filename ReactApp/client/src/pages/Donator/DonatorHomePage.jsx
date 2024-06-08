import React from 'react';
import { Outlet } from 'react-router-dom';

import {MenuPanel} from './MenuPanel';
import Header from './Header';

const DonorDashLayout = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <MenuPanel />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Header />
        <Outlet/>
      </div>
    </div>
  );
};

export default DonorDashLayout;
