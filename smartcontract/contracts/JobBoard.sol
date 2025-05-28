// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract JobBoard {
    uint public jobCount;

    struct Job {
        uint id;
        address client;
        string description;
        uint256 budget;
        bool isOpen;
        address developer;
        bool isPaid;
    }

    struct Application {
        address developer;
        string github;
        string pitch;
        bool hired;
    }

    mapping(uint => Job) public jobs;
    mapping(uint => Application[]) public jobApplications;

    event JobPosted(uint jobId, address client, uint amount);
    event AppliedToJob(uint jobId, address developer);
    event DeveloperHired(uint jobId, address developer, uint amount);

    /// @notice Post a job and fund it with ETH
    function postJob(string calldata _description) external payable {
        require(msg.value > 0, "Payment required");

        jobCount++;
        jobs[jobCount] = Job({
            id: jobCount,
            client: msg.sender,
            description: _description,
            budget: msg.value,
            isOpen: true,
            developer: address(0),
            isPaid: false
        });

        emit JobPosted(jobCount, msg.sender, msg.value);
    }

    /// @notice Developer applies to a job
    function applyToJob(uint _jobId, string calldata _github, string calldata _pitch) external {
        Job storage job = jobs[_jobId];
        require(job.isOpen, "Job is closed");

        jobApplications[_jobId].push(Application({
            developer: msg.sender,
            github: _github,
            pitch: _pitch,
            hired: false
        }));

        emit AppliedToJob(_jobId, msg.sender);
    }

    /// @notice Client selects a developer and funds are released
    function hireDeveloper(uint _jobId, uint _applicantIndex) external {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.client, "Not job owner");
        require(job.isOpen, "Job already closed");
        require(_applicantIndex < jobApplications[_jobId].length, "Invalid applicant");

        Application storage chosenApp = jobApplications[_jobId][_applicantIndex];

        job.developer = chosenApp.developer;
        job.isOpen = false;
        job.isPaid = true;
        chosenApp.hired = true;

        (bool success, ) = payable(chosenApp.developer).call{value: job.budget}("");
        require(success, "Payment failed");

        emit DeveloperHired(_jobId, chosenApp.developer, job.budget);
    }

    /// @notice View applicants for a job
    function getApplicants(uint _jobId) external view returns (Application[] memory) {
        return jobApplications[_jobId];
    }

    /// @notice View all jobs
    function getAllJobs() public view returns (Job[] memory) {
        Job[] memory allJobs = new Job[](jobCount);
        for (uint256 i = 1; i <= jobCount; i++) {
            allJobs[i - 1] = jobs[i];
        }
        return allJobs;
    }

    /// @notice Cancel a job and refund client
    function cancelJob(uint _jobId) external {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.client, "Unauthorized");
        require(job.isOpen, "Job already closed");

        job.isOpen = false;

        (bool success, ) = payable(job.client).call{value: job.budget}("");
        require(success, "Refund failed");
    }
}
