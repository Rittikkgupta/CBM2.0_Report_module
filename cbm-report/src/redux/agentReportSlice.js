// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const URl = 'http://192.168.45.59:8080'

// export const fetchAgentReport = createAsyncThunk(
//   'agentReport/fetchAgentReport',
//   async (filters) => {
//     try {
//       const response = await axios.post({URl} + '/cbmreports/api/reports/agentReport', filters);
//       return response.json.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// const agentReportSlice = createSlice({
//   name: 'agentReport',
//   initialState: {
//     dataList: [], // Assuming your API response contains 'dataList'
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAgentReport.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchAgentReport.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.dataList = action.payload.dataList; // Update dataList with the fetched data
//         state.error = null;
//       })
//       .addCase(fetchAgentReport.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default agentReportSlice.reducer;
