import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const JobContext = createContext();
export const useJob = () => useContext(JobContext);

const JobProvider = ({ children }) => {
  const [job, setJob] = useState([]);
  const [selectJob, setSelectJob] = useState(null);
  const [trigger, setTrigger] = useState(0);

  const axiosInstance = axios.create({
    baseURL: "https://intern-backend-mxe4.onrender.com",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosInstance.get("/job");
        setJob(res.data);
      } catch (err) {
        console.error("Failed to fetch Jobs", err);
      }
    };
    fetchJobs();
  }, [trigger]);
  console.log(job);

  const addJob = async (jobData) => {
    try {
      const res = await axiosInstance.post("/job/", jobData);
      setJob((prev) => [...prev, res.data]);
      setTrigger((pre) => pre + 1);
    } catch (error) {
      console.error("Add Job failed", error);
    }
  };

  const editJob = async (jobId, jobData) => {
    try {
      const res = await axiosInstance.put(`/job/${jobId}`, jobData);
      setTrigger((pre) => pre + 1);
      return res.data;
    } catch (error) {
      console.error("Edit Job failed", error);
    }
  };

  const getJobById = async (jobId) => {
    try {
      const res = await axiosInstance.get(`/job/${jobId}`);
      setSelectJob(res.data);
      setTrigger((pre) => pre + 1);
    } catch (error) {
      console.error("Job finding failed", error);
    }
  };
  const deleteJob = async (jobId) => {
    try {
      await axiosInstance.delete(`/job/${jobId}`);
      setJob((pre) => pre.filter((j) => j.id != jobId));
      setTrigger((pre) => pre + 1);
    } catch (error) {
      console.error("Job finding failed", error);
    }
  };

  return (
    <JobContext.Provider
      value={{
        job,
        addJob,
        editJob,
        getJobById,
        selectJob,
        deleteJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobProvider;
