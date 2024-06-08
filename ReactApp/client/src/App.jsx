import React from "react";
import { Route, Routes } from "react-router-dom";
import { NeedyCases } from "./pages";
import RequestHelp from './pages/beneficiary/RequestHelp';
import TotalCases from './pages/TotalCases';
import CasestoVerify from './pages/Charity/CasestoVerify';
import NeedyHomePage from './pages/beneficiary/NeedyHomePage';
import DonatorHomePage from './pages/Donator/DonatorHomePage';
import TrusteeHomePage from './pages/Charity/TrusteeHomePage';
import NeedyProfile from "./pages/beneficiary/NeedyProfile";
import DonatorProfile from './pages/Donator/DonatorProfile';
import TrusteeProfile from './pages/Charity/TrusteeProfile';
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import CustomPage from './CustomPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomPage/>} />

      <Route path="/Login" element={<Login />} />

      <Route path="/Signup" element={<Signup />} />
      
      <Route path="/beneficiary-dashboard/*" element={<NeedyHomePage />}>
        <Route path="projects" element={<TotalCases />} />
        <Route path="create-charity-project" element={<RequestHelp />} />
        <Route path="charityproject-details/:id" element={<NeedyCases />} />
        <Route path="profile" element={<NeedyProfile />} />
      </Route>

      <Route path="/Donator-homepage/*" element={<DonatorHomePage />}>
        <Route path="cases" element={<TotalCases />} />
        <Route path="charityproject-details/:id" element={<NeedyCases />} />
        <Route path="profile" element={<DonatorProfile />} />
      </Route>

      <Route path="/charityorg-dashboard/*" element={<TrusteeHomePage />}>
        <Route path="projects" element={<TotalCases />} />
        <Route path="charityproject-details/:id" element={<NeedyCases />} />
        <Route path="projects-to-approve" element={<CasestoVerify />} />
        <Route path="profile" element={<TrusteeProfile />} />
      </Route>
    </Routes>
  );
};

export default App;
