import React, { useEffect } from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import { getAllJobs } from '../features/allJob/allJobSlice';

const JobsContainer = () => {
  const { isLoading, jobs } = useSelector(store => store.allJob);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
  }, []);
  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    );
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No job to display... </h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>Job info</h5>
      <div className='jobs'>
        {jobs.map(job => {
          console.log(job);
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
