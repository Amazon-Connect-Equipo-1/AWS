/* Dashboard
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import React from "react";
import "../../styles/Dashboard/Dashboard.css";
import AgentActiveCalls from "../AgentList/AgentActiveCalls";
import AgentsAAndQASupplier, {
  AgentAAndQAContext,
} from "../AgentsAAndQASupplier";
import SingleDashboard from "./SingleDashboard";

const Dashboard = (props) => {
  return (
    <div className="dsb-main-container" data-aos="fade-up">
      <div
        className="dsb-card-container"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <SingleDashboard />
        {/* <AgentsAAndQASupplier>
          <AgentActiveCalls isActiveCalls={false} />
        </AgentsAAndQASupplier> */}
      </div>
    </div>
  );
};

export default Dashboard;
