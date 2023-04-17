import React, { useEffect } from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import { getAllJobs } from '../features/allJob/allJobSlice';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
  const {
    isLoading,
    jobs,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector(store => store.allJob);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, searchStatus, searchType, sort]);
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
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map(job => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
