import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createJobThunk, editJobThunk } from './jobThunk';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

export const createJob = createAsyncThunk('job/createJob', createJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', createJobThunk);

export const editJob = createAsyncThunk('job/editJob', editJobThunk);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValue: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(createJob.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(createJob.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      toast.success('Job Created');
    });
    builder.addCase(createJob.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
    builder.addCase(deleteJob.fulfilled, (state, { payload }) => {
      toast.success(payload);
    });
    builder.addCase(deleteJob.rejected, (state, { payload }) => {
      toast.error(payload);
    });
    builder.addCase(editJob.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(editJob.fulfilled, state => {
      state.isLoading = false;
      toast.success('Job Modified...');
    });
    builder.addCase(editJob.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
  },
});

export const { handleChange, clearValue, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
