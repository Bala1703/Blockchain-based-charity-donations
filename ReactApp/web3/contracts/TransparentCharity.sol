//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

contract Contract {
    struct Donator {
        string name;
        uint256 balance;
        address payable Address;
        mapping(uint256 => uint256) donations; 
    }

    struct CharityProject {
        address payable beneficiary;
        string name;
        string title;
        string desc;
        string document;
        uint256 goalAmount;
        uint256 currentAmount;
        bool isActive;
        address[] donators;
        uint256[] donations;
    }

    struct Beneficiary {
        string name;
        // string[] documents;
        address payable Address;
        uint256 balance;
    }

    struct CharityOrg {
        string OrgName;
        address OrgAddress;
        string Desc;
        uint256 orgBalance;
    }

    CharityOrg public c;

    mapping(address => Donator) private donors;
    address[] private donorAddresses;

    mapping(address => Beneficiary) private beneficiaries;
    CharityProject[] private charityProjects;

    event DonationMade(
        address indexed donor,
        uint256 indexed projectId,
        uint256 amount
    );

    event ProjectApproved(
        address indexed beneficiary,
        uint256 indexed projectId
    );

    event FundsDepositedToBeneficiary(
        address donor,
        uint256 indexed projectId,
        uint256 amount
    );

    function createDonorAccount(string memory _name) external {
        require(donors[msg.sender].balance == 0, "Account already exists.");
        donors[msg.sender].Address = payable(msg.sender);
        donors[msg.sender].balance = payable(msg.sender).balance;
        donors[msg.sender].name = _name;
        donorAddresses.push(msg.sender);
    }

    modifier onlyDonor() {
        require(
            donors[msg.sender].Address == msg.sender,
            "Only donor can call this function."
        );
        _;
    }

    function getDonorDetails()
        external
        view
        onlyDonor
        returns (
            string memory,
            uint256,
            address
        )
    {
        Donator storage donor = donors[msg.sender];
        return (donor.name, donor.balance, donor.Address);
    }

    function depositFunds(uint256 amount) external payable onlyDonor {
        payable(msg.sender).transfer(amount);
        donors[msg.sender].balance += amount;
    }

    function getDonorAccountBalance()
        external
        view
        onlyDonor
        returns (uint256)
    {
        return donors[msg.sender].balance;
    }

    function donateToProject(uint256 projectId) external payable onlyDonor {
        uint256 amount = msg.value;
        require(projectId < charityProjects.length, "Invalid project ID.");
        require(charityProjects[projectId].isActive, "Project is not active.");
        require(amount > 0, "Donation amount must be greater than zero.");
        require(donors[msg.sender].balance >= amount, "Insufficient funds.");

        (bool sent, ) = payable(charityProjects[projectId].beneficiary).call{
            value: amount
        }("");

        if (sent) {
            donors[msg.sender].balance -= amount;
            donors[msg.sender].donations[projectId] += amount;

            charityProjects[projectId].currentAmount += amount;
            charityProjects[projectId].donators.push(msg.sender);
            charityProjects[projectId].donations.push(amount);

        } else {
            revert("Failed to send donation to the beneficiary.");
        }

        emit DonationMade(msg.sender, projectId, amount);
    }

    function createBeneficiaryAccount(
        string memory _name
    ) external {
        require(
            bytes(beneficiaries[msg.sender].name).length == 0,
            "Account already exists."
        );
        beneficiaries[msg.sender].name = _name;
        beneficiaries[msg.sender].Address = payable(msg.sender);
        beneficiaries[msg.sender].balance = payable(msg.sender).balance;
    }

    modifier onlyBeneficiary() {
        require(
            beneficiaries[msg.sender].Address == msg.sender,
            "Only beneficiary can call this function."
        );
        _;
    }

    function getBeneficiaryDetails()
        public
        view
        onlyBeneficiary
        returns (
            string memory,
            address,
            uint256
        )
    {
        Beneficiary storage beneficiary = beneficiaries[msg.sender];
        return (
            beneficiary.name,
            beneficiary.Address,
            beneficiary.balance
        );
    }

    function getBeneficiaryBalance()
        external
        view
        onlyBeneficiary
        returns (uint256)
    {
        return beneficiaries[msg.sender].balance;
    }

    function createCharityProject(
        string memory _title,
        string memory _desc,
        string memory document,
        uint256 _goalAmount
    ) external onlyBeneficiary returns (uint256) {

        CharityProject memory project;
        project.name = beneficiaries[msg.sender].name;
        project.title = _title;
        project.desc = _desc;
        project.document = document;
        project.beneficiary = payable(msg.sender);
        project.goalAmount = _goalAmount;
        project.currentAmount = 0;
        project.isActive = false;
        uint256 projectId = charityProjects.length;
        charityProjects.push(project);
        return projectId;
    }

    function getCharityProjects()
        external
        view
        returns (CharityProject[] memory)
    {
        return charityProjects;
    }

    function getProjectDonators(uint256 projectId)
        external
        view
        returns (address[] memory)
    {
        require(charityProjects[projectId].isActive, "Invalid project");

        return charityProjects[projectId].donators;
    }

    function getApprovedProjects()
        external
        view
        returns (CharityProject[] memory)
    {
        uint256 approvedCount = 0;
        for (uint256 i = 0; i < charityProjects.length; i++) {
            if (charityProjects[i].isActive) {
                approvedCount++;
            }
        }

        CharityProject[] memory approvedProjects = new CharityProject[](
            approvedCount
        );
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < charityProjects.length; i++) {
            if (charityProjects[i].isActive) {
                approvedProjects[currentIndex] = charityProjects[i];
                currentIndex++;
            }
        }

        return approvedProjects;
    }

    function createOrganization(
        string memory orgName,
        string memory description
    ) external {
        require(
            c.OrgAddress == address(0),
            "Charity organization already exists."
        );

        c = CharityOrg({
            OrgName: orgName,
            OrgAddress: payable(msg.sender),
            Desc: description,
            orgBalance: payable(msg.sender).balance
        });
    }

    modifier onlyOrganization() {
        require(
            msg.sender == c.OrgAddress,
            "Only Charity Organization can call this function"
        );
        _;
    }

    function approveBeneficiaryProject(uint256 projectId, bool approve)
        external
        onlyOrganization
    {
        require(projectId < charityProjects.length, "Invalid project ID.");

        CharityProject storage project = charityProjects[projectId];
        require(!project.isActive, "Project is already active.");

        if (approve) {
            project.isActive = true;
        }

    }

    function checkProjectCompletion(uint256 projectId) external {
        require(projectId < charityProjects.length, "Invalid project ID");

        CharityProject storage project = charityProjects[projectId];

        require(project.isActive, "Project is already inactive");

        if (project.currentAmount == project.goalAmount) {
            project.isActive = false;
        }
    }

    function getProjectStatus(uint256 projectId)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            address,
            bool
        )
    {
        require(projectId < charityProjects.length, "Invalid project ID.");

        CharityProject storage project = charityProjects[projectId];

        return (
            project.name,
            project.title,
            project.desc,
            project.document,
            project.goalAmount,
            project.currentAmount,
            project.beneficiary,
            project.isActive
        );
    }
}