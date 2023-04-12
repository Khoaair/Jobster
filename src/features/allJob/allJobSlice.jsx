import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import jobSlice from '../job/jobSlice';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  async (_, thunkAPI) => {
    let url = `/jobs`;
    try {
      const resp = await customFetch.get(url, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('There was an error ');
    }
  }
);

const allJobSlice = createSlice({
  name: 'allJob',
  initialState,
  reducers: {
    showLoading: state => {
      state.isLoading = true;
    },
    hideLoading: state => {
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllJobs.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getAllJobs.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
    });
    builder.addCase(getAllJobs.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
  },
});

export const { showLoading, hideLoading } = allJobSlice.actions;
export default allJobSlice.reducer;
