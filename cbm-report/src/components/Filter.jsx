// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Filter.css";
// import SkillSetTable from "./SkillSet";
// import CampaignReport from "./Campaign";
// import AgentActivity from "./AgentwiseActivity";
// import AgentInteractionSummery from "./AgentInteractionsSummary";
// import AgentReportTable from "./AgentPerformance";
// import AgentAuxReport from "./AgentAUXReport";
// import AgentHourlyReport from "./AgentWiseHourly";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import ListItemText from "@mui/material/ListItemText";
// import Select from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";
// import TextField from "@mui/material/TextField";
// import { Button } from "@mui/material";



// const ITEM_HEIGHT = 88;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function Filter() {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [selectedReport, setSelectedReport] = useState("skill-set");
//   const [skillSets, setSkillSets] = useState([]);
//   const [campaigns, setCampaigns] = useState([]);
//   const [agents, setAgents] = useState([]);
//   const [selectedSkillSet, setSelectedSkillSet] = useState([]);
//   const [selectedAgents, setSelectedAgents] = useState([]);
//   const [selectedCampaign, setSelectedCampaign] = useState([]);
//   const [selectedInterval, setSelectedInterval] = useState("");
//   const [selectAllSkillSets, setSelectAllSkillSets] = useState(false);
//   const [selectAllAgents, setSelectAllAgents] = useState(false);
//   const [selectAllCampaigns, setSelectAllCampaigns] = useState(false);
//   const [dataLoaded, setDataLoaded] = useState(false); // Track whether data has been loaded

//   const token = localStorage.getItem("accessToken");

//   useEffect(() => {
//     axios
//       .get("http://192.168.45.59:8080/cbmUAT/skillset/getSkillsetDetail", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setSkillSets(response.data.value || []);
//         setDataLoaded(true); // Data loaded successfully
//       })
//       .catch((error) => console.error("Error fetching skill sets:", error));

//     axios
//       .get("http://192.168.45.59:8080/cbmUAT/campaign/getCampaignDetailAll", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => setCampaigns(response.data.value || []))
//       .catch((error) => console.error("Error fetching campaigns:", error));

//     axios
//       .get("http://192.168.45.59:8080/cbmUAT/usermanagement/getAgentsDetail", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => setAgents(response.data.value || []))
//       .catch((error) => console.error("Error fetching agents:", error));
//   }, [token]);

//   // const handleReportChange = (event) => {
//   //   setSelectedReport(event.target.value);
//   // };

//   const handleReportChange = (event) => {
//     const newReport = event.target.value;
//     setSelectedReport(newReport);

//     // Reset filter options based on the new report selection
//     setStartDate("");
//     setEndDate("");
//     setSelectedSkillSet([]);
//     setSelectedAgents([]);
//     setSelectedCampaign([]);
//     setSelectedInterval("");
//     setSelectAllSkillSets(false);
//     setSelectAllAgents(false);
//     setSelectAllCampaigns(false);
//   };

//   const handleFilterChange = (setter) => (event) => {
//     setter(event.target.value);
//   };

//   const handleSelectChange =
//     (setter, setSelectAll, selectAll, items) => (event) => {
//       const {
//         target: { value },
//       } = event;

//       if (value.includes("All")) {
//         if (selectAll) {
//           setter([]);
//           setSelectAll(false);
//         } else {
//           setter(
//             items.map(
//               (item) => item.userId || item.skillName || item.campaignId
//             )
//           );
//           setSelectAll(true);
//         }
//       } else {
//         setter(value);
//         setSelectAll(value.length === items.length);
//       }
//     };

//   const handleAllSkillSetsToggle = (event) => {
//     const { checked } = event.target;
//     if (checked && dataLoaded) {
//       // Check if data is loaded before setting "All"
//       const allSkillSetNames = skillSets.map((skillSet) => skillSet.skillName);
//       setSelectedSkillSet(allSkillSetNames);
//     } else {
//       setSelectedSkillSet([]);
//     }
//     setSelectAllSkillSets(checked);
//   };

//   const handleAllAgentsToggle = (event) => {
//     const { checked } = event.target;
//     if (checked && dataLoaded) {
//       // Check if data is loaded before setting "All"
//       const allAgentIds = agents.map((agent) => agent.userId);
//       setSelectedAgents(allAgentIds);
//     } else {
//       setSelectedAgents([]);
//     }
//     setSelectAllAgents(checked);
//   };

//   const handleAllCampaignsToggle = (event) => {
//     const { checked } = event.target;
//     if (checked && dataLoaded) {
//       // Check if data is loaded before setting "All"
//       const allCampaignIds = campaigns.map((campaign) => campaign.campaignId);
//       setSelectedCampaign(allCampaignIds);
//     } else {
//       setSelectedCampaign([]);
//     }
//     setSelectAllCampaigns(checked);
//   };

//   useEffect(() => {
//     const requestData = {
//       startDateTime: startDate || null,
//       endDateTime: endDate || null,
//       skillSet: selectedSkillSet,
//       agentName: selectedAgents,
//       campaignId: selectedCampaign,
//       interval: selectedInterval || "",
//     };

//     console.log("Request data:", requestData);
//     axios
//       .post(
//         "http://192.168.45.59:8080/cbmreports/api/reports/SkillSetReport",
//         requestData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       )
//       .then((response) => {
//         console.log("Response data:", response.data);
//       })
//       .catch((error) => console.error("Error fetching report:", error));
//   }, [
//     startDate,
//     endDate,
//     selectedSkillSet,
//     selectedAgents,
//     selectedCampaign,
//     selectedInterval,
//     selectedReport,
//     token,
//     dataLoaded, // Include dataLoaded in dependencies
//   ]);
//   const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format

//   const getReportName = (selectedReport) => {
//     switch (selectedReport) {
//       case "skill-set":
//         return "Skillset Performance Report";
//       case "campaign-report":
//         return "Campaign Performance Report";
//       case "agent-report":
//         return "Agent Performance Report";
//       case "agent-wise-hourly-report":
//         return "Agent Wise Hourly Report";
//       case "agent-wise-activity-split":
//         return "Agent wise Activity Split";
//       case "agent-interaction-summery":
//         return "Agent Interactions Summary";
//       case "agent-aux-reason-codes-report":
//         return "Agent AUX Reason Codes Report";
//       default:
//         return "Selected Report";
//     }
//   };

//   const handleDownload = async () => {
//     // Initialize requestData with common parameters
//     const requestData = {
//       startDateTime: startDate,
//       endDateTime: endDate,
//       skillSet: selectedSkillSet,
//       agentName: selectedAgents,
//       campaignId: selectedCampaign,
//       page: 0, // Static value for page
//       size: 0, // Static value for size
//     };
  
//     // Determine endpoint based on selected report
//     let endpoint = "";
//     switch (selectedReport) {
//       case "skill-set":
//         endpoint = "http://192.168.45.59:8080/cbmreports/api/reports/downloadSkillSetReport";
//         break;
//       case "campaign-report":
//         endpoint =  "http://192.168.45.59:8080/cbmreports/api/reports/downloadCampaignReport";
//         break;
//       case "agent-report":
//         endpoint = "http://192.168.45.59:8080/cbmreports/api/reports/downloadAgentReport";
//         break;
//       case "agent-wise-hourly-report":
//         endpoint = "http://192.168.45.59:8080/cbmreports/api/reports/downloadAgentWiseHourlyReport";
//         break;
//       case "agent-wise-activity-split":
//         endpoint = "http://192.168.45.59:8080/cbmreports/api/reports/downloadAgentWiseActivityReport";
//         break;
//       case "agent-interaction-summery":
//         endpoint = "http://192.168.45.59:8080/cbmreports/api/reports/downloadAgentInteractionReport";
//         break;
//       case "agent-aux-reason-codes-report":
//         endpoint = "http://192.168.45.59:8080/cbmreports/api/reports/downloadAgentAuxCodesReportReport";
//         break;
//       default:
//         console.error("Unsupported report type:", selectedReport);
//         return;
//     }
  
//     try {
//       // Make POST request to the determined endpoint
//       const response = await axios.post(endpoint, requestData, {
//         responseType: "blob", // Set response type to blob for file download
//         headers: { Authorization: `Bearer ${token}` }, // Include authorization header
//       });
  
//       // Create a URL for the downloaded file
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `${selectedReport}_report.csv`); // Set default file name based on report type
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error(`Error downloading ${selectedReport} report:`, error);
//     }
//   };
  


//   return (
//     <div>
//       {/* Dynamic header displaying the selected report */}
//       <div
//         style={{
//           textAlign: "center",
//           color: "black",
//           fontSize: "30px",
//           fontFamily: "Times New Roman, Georgia",
//           margin: "4px",
//         }}
//       >
//         <h2>{getReportName(selectedReport)}</h2>
//       </div>
//       <div className="filters">
//         {/* Report option */}
//         <div className="filter-item">
//           <FormControl sx={{ m: 1, width: 200 }}>
//             <InputLabel id="report-name-select-label">Report Name</InputLabel>
//             <Select
//               labelId="report-name-select-label"
//               id="report-name-select"
//               value={selectedReport}
//               onChange={handleReportChange}
//               input={<OutlinedInput label="Report Name" />}
//               MenuProps={MenuProps}
//             >
//               <MenuItem value="skill-set">Skillset Performance Report</MenuItem>
//               <MenuItem value="campaign-report">
//                 Campaign Performance Report
//               </MenuItem>
//               <MenuItem value="agent-report">Agent Performance Report</MenuItem>
//               <MenuItem value="agent-wise-hourly-report">
//                 Agent Wise Hourly Report
//               </MenuItem>
//               <MenuItem value="agent-wise-activity-split">
//                 Agent wise Activity Split
//               </MenuItem>
//               <MenuItem value="agent-interaction-summery">
//                 Agent Interactions Summary
//               </MenuItem>
//               <MenuItem value="agent-aux-reason-codes-report">
//                 Agent AUX Reason Codes Report
//               </MenuItem>
//             </Select>
//           </FormControl>
//         </div>

//         {/* Date-Range Filter */}
//         <div className="date-range">
//           <div className="date-pickers">
//             <FormControl fullWidth sx={{ m: 1 }}>
//               <TextField
//                 id="start-date-picker"
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => {
//                   const selectedStartDate = e.target.value;
//                   setStartDate(selectedStartDate);
//                   setEndDate(""); // Reset end date when start date changes
//                 }}
//                 InputLabelProps={{ shrink: true }}
//                 inputProps={{ max: today }}
//                 label="Start Date"
//               />
//             </FormControl>
//             <FormControl fullWidth sx={{ m: 1 }}>
//               <TextField
//                 id="end-date-picker"
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 inputProps={{ min: startDate, max: today }}
//                 label="End Date"
//               />
//             </FormControl>
//           </div>
//         </div>

//         {/* campaign filter for skill set and campaign report */}
//         {(selectedReport === "skill-set" ||
//           selectedReport === "campaign-report") && (
//           <div className="filter-item">
//             <FormControl sx={{ m: 1, width: 200 }}>
//               <InputLabel id="campaign-multiple-checkbox-label">
//                 Campaign ID
//               </InputLabel>
//               <Select
//                 labelId="campaign-multiple-checkbox-label"
//                 id="campaign-multiple-checkbox"
//                 multiple
//                 value={selectedCampaign}
//                 onChange={handleSelectChange(
//                   setSelectedCampaign,
//                   setSelectAllCampaigns,
//                   selectAllCampaigns,
//                   campaigns
//                 )}
//                 input={<OutlinedInput label="Campaign ID" />}
//                 renderValue={(selected) => selected.join(", ")}
//                 MenuProps={MenuProps}
//               >
//                 <MenuItem key="All" value="All">
//                   <Checkbox
//                     checked={selectAllCampaigns}
//                     onChange={handleAllCampaignsToggle}
//                   />
//                   <ListItemText primary="Select All" />
//                 </MenuItem>
//                 {campaigns.map((campaign) => (
//                   <MenuItem
//                     key={campaign.campaignId}
//                     value={campaign.campaignId}
//                   >
//                     <Checkbox
//                       checked={selectedCampaign.includes(campaign.campaignId)}
//                     />
//                     <ListItemText primary={campaign.campaignId} />
//                   </MenuItem>
//                 ))}
//               </Select>
            
//             </FormControl>
//           </div>
//         )}

//         {/* Skill-set filter  */}
//         {(selectedReport === "skill-set" ||
//           selectedReport === "campaign-report" ||
//           selectedReport === "agent-report" ||
//           selectedReport === "agent-wise-hourly-report" ||
//           selectedReport === "agent-wise-activity-split" ||
//           selectedReport === "agent-interaction-summery") && (
//           <div className="filter-item">
//             <FormControl sx={{ m: 1, width: 200 }}>
//               <InputLabel id="skillset-multiple-checkbox-label">
//                 Skill Set
//               </InputLabel>
//               <Select
//                 labelId="skillset-multiple-checkbox-label"
//                 id="skillset-multiple-checkbox"
//                 multiple
//                 value={selectedSkillSet}
//                 onChange={handleSelectChange(
//                   setSelectedSkillSet,
//                   setSelectAllSkillSets,
//                   selectAllSkillSets,
//                   skillSets
//                 )}
//                 input={<OutlinedInput label="Skill Set" />}
//                 renderValue={(selected) => selected.join(", ")}
//                 MenuProps={MenuProps}
//               >
//                 <MenuItem key="All" value="All">
//                   <Checkbox
//                     checked={selectAllSkillSets}
//                     onChange={handleAllSkillSetsToggle}
//                   />
//                   <ListItemText primary="Select All" />
//                 </MenuItem>
//                 {skillSets.map((skill) => (
//                   <MenuItem key={skill.skillName} value={skill.skillName}>
//                     <Checkbox
//                       checked={selectedSkillSet.includes(skill.skillName)}
//                     />
//                     <ListItemText primary={skill.skillName} />
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </div>
//         )}
//         {/* Agent filter */}
//         <div className="filter-item">
//           <FormControl sx={{ m: 1, width: 200 }}>
//             <InputLabel id="agent-multiple-checkbox-label">
//               Agent Name
//             </InputLabel>
//             <Select
//               labelId="agent-multiple-checkbox-label"
//               id="agent-multiple-checkbox"
//               multiple
//               value={selectedAgents}
//               onChange={handleSelectChange(
//                 setSelectedAgents,
//                 setSelectAllAgents,
//                 selectAllAgents,
//                 agents
//               )}
//               input={<OutlinedInput label="Agent Name" />}
//               renderValue={(selected) => selected.join(", ")}
//               MenuProps={MenuProps}
//             >
//               <MenuItem key="All" value="All">
//                 <Checkbox
//                   checked={selectAllAgents}
//                   onChange={handleAllAgentsToggle}
//                 />
//                 <ListItemText primary="Select All" />
//               </MenuItem>
//               {agents.map((agent) => (
//                 <MenuItem key={agent.userId} value={agent.userId}>
//                   <Checkbox checked={selectedAgents.includes(agent.userId)} />
//                   <ListItemText primary={agent.userId} />
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </div>
//         <Button style={{ marginLeft: '14px' }} variant="contained" color="primary" onClick={handleDownload}>
//   Download
// </Button>

//       </div>
      

//       {/* based on report name import the report */}
//       <div className="report-container">
//         {selectedReport === "skill-set" && (
//           <SkillSetTable
//             startDate={startDate ? new Date(startDate) : null}
//             endDate={endDate ? new Date(endDate) : null}
//             skillSet={selectedSkillSet.includes("All") ? [] : selectedSkillSet}
//             agentName={selectedAgents.includes("All") ? [] : selectedAgents}
//             campaignId={
//               selectedCampaign.includes("All") ? [] : selectedCampaign
//             }
//             interval={selectedInterval}
//           />
//         )}
//         {selectedReport === "campaign-report" && (
//           <CampaignReport
//             startDate={startDate ? new Date(startDate) : null}
//             endDate={endDate ? new Date(endDate) : null}
//             skillSet={selectedSkillSet.includes("All") ? [] : selectedSkillSet}
//             agentName={selectedAgents.includes("All") ? [] : selectedAgents}
//             campaignId={
//               selectedCampaign.includes("All") ? [] : selectedCampaign
//             }
//             interval={selectedInterval}
//           />
//         )}
//         {selectedReport === "agent-report" && (
//           <AgentReportTable
//             startDate={startDate ? new Date(startDate) : null}
//             endDate={endDate ? new Date(endDate) : null}
//             skillSet={selectedSkillSet.includes("All") ? [] : selectedSkillSet}
//             agentName={selectedAgents.includes("All") ? [] : selectedAgents}
//             campaignId={
//               selectedCampaign.includes("All") ? [] : selectedCampaign
//             }
//             interval={selectedInterval}
//           />
//         )}
//         {selectedReport === "agent-wise-hourly-report" && (
//           <AgentHourlyReport
//             startDate={startDate ? new Date(startDate) : null}
//             endDate={endDate ? new Date(endDate) : null}
//             skillSet={selectedSkillSet.includes("All") ? [] : selectedSkillSet}
//             agentName={selectedAgents.includes("All") ? [] : selectedAgents}
//             campaignId={
//               selectedCampaign.includes("All") ? [] : selectedCampaign
//             }
//             interval={selectedInterval}
//           />
//         )}
//         {selectedReport === "agent-wise-activity-split" && (
//           <AgentActivity
//             startDate={startDate ? new Date(startDate) : null}
//             endDate={endDate ? new Date(endDate) : null}
//             skillSet={selectedSkillSet.includes("All") ? [] : selectedSkillSet}
//             agentName={selectedAgents.includes("All") ? [] : selectedAgents}
//             campaignId={
//               selectedCampaign.includes("All") ? [] : selectedCampaign
//             }
//             interval={selectedInterval}
//           />
//         )}

//         {selectedReport === "agent-interaction-summery" && (
//           <AgentInteractionSummery
//             startDate={startDate ? new Date(startDate) : null}
//             endDate={endDate ? new Date(endDate) : null}
//             skillSet={selectedSkillSet.includes("All") ? [] : selectedSkillSet}
//             agentName={selectedAgents.includes("All") ? [] : selectedAgents}
//             campaignId={
//               selectedCampaign.includes("All") ? [] : selectedCampaign
//             }
//             interval={selectedInterval}
//           />
//         )}

//         {selectedReport === "agent-aux-reason-codes-report" && (
//           <AgentAuxReport
//             startDate={startDate ? new Date(startDate) : null}
//             endDate={endDate ? new Date(endDate) : null}
//             skillSet={selectedSkillSet.includes("All") ? [] : selectedSkillSet}
//             agentName={selectedAgents.includes("All") ? [] : selectedAgents}
//             campaignId={
//               selectedCampaign.includes("All") ? [] : selectedCampaign
//             }
//             interval={selectedInterval}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
// export default Filter;




import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Filter.css";
import SkillSetTable from "./SkillSet";
import CampaignReport from "./Campaign";
import AgentActivity from "./AgentwiseActivity";
import AgentInteractionSummery from "./AgentInteractionsSummary";
import AgentReportTable from "./AgentPerformance";
import AgentAuxReport from "./AgentAUXReport";
import AgentHourlyReport from "./AgentWiseHourly";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";



const ITEM_HEIGHT = 88;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Filter() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedReport, setSelectedReport] = useState("skill-set");
  const [skillSets, setSkillSets] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedSkillSet, setSelectedSkillSet] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("");
  const [selectAllSkillSets, setSelectAllSkillSets] = useState(false);
  const [selectAllAgents, setSelectAllAgents] = useState(false);
  const [selectAllCampaigns, setSelectAllCampaigns] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false); // Track whether data has been loaded

  const token = window.localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("http://192.168.45.59:8080/cbmUAT/skillset/getSkillsetDetail", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setSkillSets(response.data.value || []);
        setDataLoaded(true); // Data loaded successfully
      })
      .catch((error) => console.error("Error fetching skill sets:", error));

    axios
      .get("http://192.168.45.59:8080/cbmUAT/campaign/getCampaignDetailAll", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCampaigns(response.data.value || []))
      .catch((error) => console.error("Error fetching campaigns:", error));

    axios
      .get("http://192.168.45.59:8080/cbmUAT/usermanagement/getAgentsDetail", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setAgents(response.data.value || []))
      .catch((error) => console.error("Error fetching agents:", error));
  }, [token]);

  // const handleReportChange = (event) => {
  //   setSelectedReport(event.target.value);
  // };

  const handleReportChange = (event) => {
    const newReport = event.target.value;
    setSelectedReport(newReport);

    // Reset filter options based on the new report selection
    setStartDate("");
    setEndDate("");
    setSelectedSkillSet([]);
    setSelectedAgents([]);
    setSelectedCampaign([]);
    setSelectedInterval("");
    setSelectAllSkillSets(false);
    setSelectAllAgents(false);
    setSelectAllCampaigns(false);
  };

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSelectChange =
    (setter, setSelectAll, selectAll, items) => (event) => {
      const {
        target: { value },
      } = event;

      if (value.includes("All")) {
        if (selectAll) {
          setter([]);
          setSelectAll(false);
        } else {
          setter(
            items.map(
              (item) => item.userId || item.skillName || item.campaignId
            )
          );
          setSelectAll(true);
        }
      } else {
        setter(value);
        setSelectAll(value.length === items.length);
      }
    };

  const handleAllSkillSetsToggle = (event) => {
    const { checked } = event.target;
    if (checked && dataLoaded) {
      // Check if data is loaded before setting "All"
      const allSkillSetNames = skillSets.map((skillSet) => skillSet.skillName);
      setSelectedSkillSet(allSkillSetNames);
    } else {
      setSelectedSkillSet([]);
    }
    setSelectAllSkillSets(checked);
  };

  const handleAllAgentsToggle = (event) => {
    const { checked } = event.target;
    if (checked && dataLoaded) {
      // Check if data is loaded before setting "All"
      const allAgentIds = agents.map((agent) => agent.userId);
      setSelectedAgents(allAgentIds);
    } else {
      setSelectedAgents([]);
    }
    setSelectAllAgents(checked);
  };

  const handleAllCampaignsToggle = (event) => {
    const { checked } = event.target;
    if (checked && dataLoaded) {
      // Check if data is loaded before setting "All"
      const allCampaignIds = campaigns.map((campaign) => campaign.campaignId);
      setSelectedCampaign(allCampaignIds);
    } else {
      setSelectedCampaign([]);
    }
    setSelectAllCampaigns(checked);
  };

  useEffect(() => {
    const requestData = {
      startDateTime: startDate || null,
      endDateTime: endDate || null,
      skillSet: selectedSkillSet,
      agentName: selectedAgents,
      campaignId: selectedCampaign,
      interval: selectedInterval || "",
    };

    console.log("Request data:", requestData);
    axios
      .post(
        "http://192.168.45.59:8080/cbmreports/api/reports/SkillSetReport",
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Response data:", response.data);
      })
      .catch((error) => console.error("Error fetching report:", error));
  }, [
    startDate,
    endDate,
    selectedSkillSet,
    selectedAgents,
    selectedCampaign,
    selectedInterval,
    selectedReport,
    token,
    dataLoaded, // Include dataLoaded in dependencies
  ]);
  const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format

  const getReportName = (selectedReport) => {
    switch (selectedReport) {
      case "skill-set":
        return "Skillset Performance Report";
      case "campaign-report":
        return "Campaign Performance Report";
      case "agent-report":
        return "Agent Performance Report";
      case "agent-wise-hourly-report":
        return "Agent Wise Hourly Report";
      case "agent-wise-activity-split":
        return "Agent wise Activity Split";
      case "agent-interaction-summery":
        return "Agent Interactions Summary";
      case "agent-aux-reason-codes-report":
        return "Agent AUX Reason Codes Report";
      default:
        return "Selected Report";
    }
  };

  const handleDownload = async () => {
    // Initialize requestData with common parameters
    const requestData = {
      startDateTime: startDate,
      endDateTime: endDate,
      skillSet: selectedSkillSet,
      agentName: selectedAgents,
      campaignId: selectedCampaign,
      page: 0, // Static value for page
      size: 0, // Static value for size
    };
  
    // Determine endpoint based on selected report
    let endpoint = "";
    switch (selectedReport) {
      case "skill-set":
        endpoint = "http://192.168.45.59:8080/cbmreports/api/reports/downloadSkillSetReport";
        break;
      case "campaign-report":
        endpoint =  "http://192.168.45.59:8080/cbmreports/api/reports/downloadCampaignReport";
        break;
      case "agent-report":
        endpoint = "http://192.168.45.59:8080/cbmreports/api/reports/downloadAgentReport";
        break;
      case "agent-wise-hourly-report":
        endpoint = "http://192.168.45.59:8080/cbmreports/api/reports/downloadAgentWiseHourlyReport";
        break;
      case "agent-wise-activity-split":
        endpoint = "http://192.168.45.59:8080/cbmreports/api/reports/downloadAgentWiseActivityReport";
        break;
      case "agent-interaction-summery":
        endpoint = "http://192.168.45.59:8080/cbmreports/api/reports/downloadAgentInteractionReport";
        break;
      case "agent-aux-reason-codes-report":
        endpoint = "http://192.168.45.59:8080/cbmreports/api/reports/downloadAgentAuxCodesReportReport";
        break;
      default:
        console.error("Unsupported report type:", selectedReport);
        return;
    }
  
    try {
      // Make POST request to the determined endpoint
      const response = await axios.post(endpoint, requestData, {
        responseType: "blob", // Set response type to blob for file download
        headers: { Authorization: `Bearer ${token}` }, // Include authorization header
      });
  
      // Create a URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${selectedReport}_report.csv`); // Set default file name based on report type
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error downloading ${selectedReport} report:`, error);
    }
  };
  


  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);
    // Reset end date only if it's before the selected start date
    if (endDate && selectedStartDate > endDate) {
      setEndDate('');
    }
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;
    setEndDate(selectedEndDate);
    // Restrict start date to dates before or up to selected end date
    if (selectedEndDate && startDate > selectedEndDate) {
      setStartDate(selectedEndDate);
    }
  };


  return (
    <div>
      {/* Dynamic header displaying the selected report */}
      <div
        style={{
          textAlign: "center",
          color: "black",
          fontSize: "30px",
          fontFamily: "Times New Roman, Georgia",
          margin: "4px",
        }}
      >
        <h2>{getReportName(selectedReport)}</h2>
      </div>
      <div className="filters">
        {/* Report option */}
        <div className="filter-item">
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="report-name-select-label">Report Name</InputLabel>
            <Select
              labelId="report-name-select-label"
              id="report-name-select"
              value={selectedReport}
              onChange={handleReportChange}
              input={<OutlinedInput label="Report Name" />}
              MenuProps={MenuProps}
            >
              <MenuItem value="skill-set">Skillset Performance Report</MenuItem>
              <MenuItem value="campaign-report">
                Campaign Performance Report
              </MenuItem>
              <MenuItem value="agent-report">Agent Performance Report</MenuItem>
              <MenuItem value="agent-wise-hourly-report">
                Agent Wise Hourly Report
              </MenuItem>
              <MenuItem value="agent-wise-activity-split">
                Agent wise Activity Split
              </MenuItem>
              <MenuItem value="agent-interaction-summery">
                Agent Interactions Summary
              </MenuItem>
              <MenuItem value="agent-aux-reason-codes-report">
                Agent AUX Reason Codes Report
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Date-Range Filter */}
        {/* <div className="date-range">
          <div className="date-pickers">
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="start-date-picker"
                type="date"
                value={startDate}
                onChange={(e) => {
                  const selectedStartDate = e.target.value;
                  setStartDate(selectedStartDate);
                  setEndDate(""); // Reset end date when start date changes
                }}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: today }}
                label="Start Date"
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="end-date-picker"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: startDate, max: today }}
                label="End Date"
              />
            </FormControl>
          </div>
        </div> */}

<div className="date-range">
      <div className="date-pickers">
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            id="start-date-picker"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{ max: today, min: '1900-01-01' }}
            label="Start Date"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            id="end-date-picker"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{ max: today, min: startDate || '1900-01-01' }}
            label="End Date"
          />
        </FormControl>
      </div>
    </div>    
    
    
    
    
    
    
     {/* campaign filter for skill set and campaign report */}
        {(selectedReport === "skill-set" ||
          selectedReport === "campaign-report") && (
          <div className="filter-item">
            <FormControl sx={{ m: 1, width: 200 }}>
              <InputLabel id="campaign-multiple-checkbox-label">
                Campaign ID
              </InputLabel>
              <Select
                labelId="campaign-multiple-checkbox-label"
                id="campaign-multiple-checkbox"
                multiple
                value={selectedCampaign}
                onChange={handleSelectChange(
                  setSelectedCampaign,
                  setSelectAllCampaigns,
                  selectAllCampaigns,
                  campaigns
                )}
                input={<OutlinedInput label="Campaign ID" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                <MenuItem key="All" value="All">
                  <Checkbox
                    checked={selectAllCampaigns}
                    onChange={handleAllCampaignsToggle}
                  />
                  <ListItemText primary="Select All" />
                </MenuItem>
                {campaigns.map((campaign) => (
                  <MenuItem
                    key={campaign.campaignId}
                    value={campaign.campaignId}
                  >
                    <Checkbox
                      checked={selectedCampaign.includes(campaign.campaignId)}
                    />
                    <ListItemText primary={campaign.campaignId} />
                  </MenuItem>
                ))}
              </Select>
            
            </FormControl>
          </div>
        )}

        {/* Skill-set filter  */}
        {(selectedReport === "skill-set" ||
          selectedReport === "campaign-report" ||
          selectedReport === "agent-report" ||
          selectedReport === "agent-wise-hourly-report" ||
          selectedReport === "agent-wise-activity-split" ||
          selectedReport === "agent-interaction-summery") && (
          <div className="filter-item">
            <FormControl sx={{ m: 1, width: 200 }}>
              <InputLabel id="skillset-multiple-checkbox-label">
                Skill Set
              </InputLabel>
              <Select
                labelId="skillset-multiple-checkbox-label"
                id="skillset-multiple-checkbox"
                multiple
                value={selectedSkillSet}
                onChange={handleSelectChange(
                  setSelectedSkillSet,
                  setSelectAllSkillSets,
                  selectAllSkillSets,
                  skillSets
                )}
                input={<OutlinedInput label="Skill Set" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                <MenuItem key="All" value="All">
                  <Checkbox
                    checked={selectAllSkillSets}
                    onChange={handleAllSkillSetsToggle}
                  />
                  <ListItemText primary="Select All" />
                </MenuItem>
                {skillSets.map((skill) => (
                  <MenuItem key={skill.skillName} value={skill.skillName}>
                    <Checkbox
                      checked={selectedSkillSet.includes(skill.skillName)}
                    />
                    <ListItemText primary={skill.skillName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
        {/* Agent filter */}
        <div className="filter-item">
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="agent-multiple-checkbox-label">
              Agent Name
            </InputLabel>
            <Select
              labelId="agent-multiple-checkbox-label"
              id="agent-multiple-checkbox"
              multiple
              value={selectedAgents}
              onChange={handleSelectChange(
                setSelectedAgents,
                setSelectAllAgents,
                selectAllAgents,
                agents
              )}
              input={<OutlinedInput label="Agent Name" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              <MenuItem key="All" value="All">
                <Checkbox
                  checked={selectAllAgents}
                  onChange={handleAllAgentsToggle}
                />
                <ListItemText primary="Select All" />
              </MenuItem>
              {agents.map((agent) => (
                <MenuItem key={agent.userId} value={agent.userId}>
                  <Checkbox checked={selectedAgents.includes(agent.userId)} />
                  <ListItemText primary={agent.userId} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button style={{ marginLeft: '14px' }} variant="contained" color="primary" onClick={handleDownload}>
  Download
</Button>

      </div>
      

      {/* based on report name import the report */}
      <div className="report-container">
        {selectedReport === "skill-set" && (
          <SkillSetTable
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            skillSet={selectedSkillSet.includes("All") ? [] : selectedSkillSet}
            agentName={selectedAgents.includes("All") ? [] : selectedAgents}
            campaignId={
              selectedCampaign.includes("All") ? [] : selectedCampaign
            }
            interval={selectedInterval}
          />
        )}
        {selectedReport === "campaign-report" && (
          <CampaignReport
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            skillSet={selectedSkillSet.includes("All") ? [] : selectedSkillSet}
            agentName={selectedAgents.includes("All") ? [] : selectedAgents}
            campaignId={
              selectedCampaign.includes("All") ? [] : selectedCampaign
            }
            interval={selectedInterval}
          />
        )}
        {selectedReport === "agent-report" && (
          <AgentReportTable
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            skillSet={selectedSkillSet.includes("All") ? [] : selectedSkillSet}
            agentName={selectedAgents.includes("All") ? [] : selectedAgents}
            campaignId={
              selectedCampaign.includes("All") ? [] : selectedCampaign
            }
            interval={selectedInterval}
          />
        )}
        {selectedReport === "agent-wise-hourly-report" && (
          <AgentHourlyReport
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            skillSet={selectedSkillSet.includes("All") ? [] : selectedSkillSet}
            agentName={selectedAgents.includes("All") ? [] : selectedAgents}
            campaignId={
              selectedCampaign.includes("All") ? [] : selectedCampaign
            }
            interval={selectedInterval}
          />
        )}
        {selectedReport === "agent-wise-activity-split" && (
          <AgentActivity
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            skillSet={selectedSkillSet.includes("All") ? [] : selectedSkillSet}
            agentName={selectedAgents.includes("All") ? [] : selectedAgents}
            campaignId={
              selectedCampaign.includes("All") ? [] : selectedCampaign
            }
            interval={selectedInterval}
          />
        )}

        {selectedReport === "agent-interaction-summery" && (
          <AgentInteractionSummery
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            skillSet={selectedSkillSet.includes("All") ? [] : selectedSkillSet}
            agentName={selectedAgents.includes("All") ? [] : selectedAgents}
            campaignId={
              selectedCampaign.includes("All") ? [] : selectedCampaign
            }
            interval={selectedInterval}
          />
        )}

        {selectedReport === "agent-aux-reason-codes-report" && (
          <AgentAuxReport
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            skillSet={selectedSkillSet.includes("All") ? [] : selectedSkillSet}
            agentName={selectedAgents.includes("All") ? [] : selectedAgents}
            campaignId={
              selectedCampaign.includes("All") ? [] : selectedCampaign
            }
            interval={selectedInterval}
          />
        )}
      </div>
    </div>
  );
}
export default Filter;

