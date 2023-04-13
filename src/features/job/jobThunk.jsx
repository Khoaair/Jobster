import { showLoading, hideLoading, getAllJobs } from '../allJob/allJobSlice';
import customFetch from '../../utils/axios';
import { logoutUser } from '../user/userSlice';
import { clearValue } from './jobSlice';
import authHeader from '../../utils/authHeader';

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post('/jobs', job, authHeader(thunkAPI));
    thunkAPI.dispatch(clearValue());
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkAPI.rejectWithValue(error.response.msg);
  }
};
export const deleteJobThunk = async (jobID, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(
      `/jobs/${jobID}`,
      authHeader(thunkAPI)
    );
    thunkAPI.dispatch(getAllJobs());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(
      `/jobs/${jobId}`,
      job,
      authHeader(thunkAPI)
    );
    thunkAPI.dispatch(clearValue());
    return resp.data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
