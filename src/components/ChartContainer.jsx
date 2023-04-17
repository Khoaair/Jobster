import React, { useState } from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useSelector } from 'react-redux';

const ChartContainer = () => {
  const [barChart, setBartChart] = useState(true);
  const { monthlyApplications: data } = useSelector(store => store.allJob);
  console.log(data);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button
        type='button'
        onClick={() => {
          setBartChart(!barChart);
        }}
      >
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartContainer;
