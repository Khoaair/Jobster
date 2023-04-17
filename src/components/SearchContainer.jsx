import React from 'react';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useDispatch, useSelector } from 'react-redux';
import { FormRow, FormRowSelect } from '.';
import {
  handleChange,
  clearFilter,
  getAllJobs,
} from '../features/allJob/allJobSlice';

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector(store => store.allJob);
  const { jobTypeOptions, statusOptions } = useSelector(store => store.job);
  const dispatch = useDispatch();

  const handleSearch = e => {
    // is loading check later
    // if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(clearFilter());
  };
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          {/* Search position */}
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            lableText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            lableText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filter
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
