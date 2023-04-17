import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showStats } from '../../features/allJob/allJobSlice';
import { ChartContainer, StatsContainer } from '../../components';

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(store => store.allJob);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, []);
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartContainer />}
    </>
  );
};

export default Stats;
