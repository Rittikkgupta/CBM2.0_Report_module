// const initialState = {
//     data: null,
//     status: 'idle',
//     error: null,
//   };
  
//   const agentReportReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'FETCH_AGENT_REPORT_REQUEST':
//         return {
//           ...state,
//           status: 'loading',
//         };
//       case 'FETCH_AGENT_REPORT_SUCCESS':
//         return {
//           ...state,
//           status: 'succeeded',
//           data: action.payload,
//           error: null,
//         };
//       case 'FETCH_AGENT_REPORT_FAILURE':
//         return {
//           ...state,
//           status: 'failed',
//           error: action.payload,
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default agentReportReducer;
  