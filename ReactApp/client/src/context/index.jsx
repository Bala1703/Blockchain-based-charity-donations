import React, { useContext, createContext, useState } from "react";
import { ethers } from "ethers";
import { abi } from "../constants";
import { useMetamask, useAddress } from "@thirdweb-dev/react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const contractAddress = "0xb72dEDFc0053383cD4D89FF8811d07cd02821f6a";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const address = useAddress();
  const connect = useMetamask();
  const [charityOrg, setCharityOrg] = useState(null);
  const [beneficiaryDetails, setBeneficiaryDetails] = useState(null);
  const [donorDetails, setDonorDetails] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [approvedProjects, setApprovedProjects] = useState([]);
  const [donators, setDonators] = useState([]);

  const createCharityProject = async (form) => {
    try {
      const data = await contract.createCharityProject(
        form.title,
        form.description,
        form.document,
        form.goalAmount
      );
      await data.wait();
    } 
    catch (error) {}
  };

  const createBeneficiaryAccount = async (form) => {
    try {
      const { name } = form;
      const transaction = await contract.createBeneficiaryAccount(
        name,
      );
      await transaction.wait();
    } 
    catch (error) {}
  };

  const createDonorAccount = async (form) => {
    try {
      const { name } = form;
      const transaction = await contract.createDonorAccount(
        name
      );
      await transaction.wait();
    } 
    catch (error) {}
  };

  const createOrganization = async (form) => {
    try {
      const { OrgName, Desc } = form;
      const transaction = await contract.createOrganization(OrgName, Desc);
      await transaction.wait();
    }
 catch (error) {}
  };

  const approveBeneficiaryProject = async (projectId) => {
    try {
      const transaction = await contract.approveBeneficiaryProject(
        projectId,
        true
      );
      await transaction.wait();
    } catch (error) {}
  };

  const donateToProject = async (projectId, amount) => {
    try {
      const data = await contract.donateToProject(projectId, { value: ethers.utils.parseEther(amount) });
      return data;
    } catch (error) {}
  };

  const getOrganization = async () => {
    try {
      const accountOrg = await contract.c();
      setCharityOrg(accountOrg);
    } catch (error) {}
  };

  const getBeneficiaryDetails = async () => {
    try {
      const data = await contract.getBeneficiaryDetails();
      const [name, Address, balance] = data;
      setBeneficiaryDetails({
        name,
        Address,
        balance,
      });
    } catch (error) {}
  };

  const getDonorDetails = async () => {
    try {
      const data = await contract.getDonorDetails();
      const [name, balance, Address] = data;
      setDonorDetails({
        name,
        balance,
        Address
      });
    } catch (error) {}
  };

  const getApprovedProjects = async () => {
    try {
      const data = await contract.getApprovedProjects();
      const projectsData = data.map((projectArray) => ({
        beneficiary: projectArray[0],
        name: projectArray[1],
        title: projectArray[2],
        desc: projectArray[3],
        document: projectArray[4],
        goalAmount: projectArray[5],
        currentAmount: projectArray[6],
        isActive: projectArray[7],
      }));
      setApprovedProjects(projectsData);
    } catch (error) {}
  };

  const getCharityProjects = async () => {
    try {
      const data = await contract.getCharityProjects();
      const projectsData = data.map((projectArray) => ({
        beneficiary: projectArray[0],
        name: projectArray[1],
        title: projectArray[2],
        desc: projectArray[3],
        document: projectArray[4],
        goalAmount: projectArray[5],
        currentAmount: projectArray[6],
        isActive: projectArray[7],
      }));
      setAllProjects(projectsData);
    } catch (error) {}
  };

  const getProjectStatus = async (projectId) => {
    try {
      const data = await contract.getProjectStatus();
    } catch (error) {
    }
  }

  const getProjectDonators = async (projectId) => {
    try {
      const data = await contract.getProjectDonators(projectId);
      setDonators(data);
    } catch (error) {}
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCharityProject,
        createBeneficiaryAccount,
        createDonorAccount,
        createOrganization,
        donateToProject,
        getBeneficiaryDetails,
        getApprovedProjects,
        getCharityProjects,
        getOrganization,
        getDonorDetails,
        getProjectStatus,
        getProjectDonators,
        approveBeneficiaryProject,
        beneficiaryDetails,
        donorDetails,
        allProjects,
        approvedProjects,
        charityOrg,
        donators,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
