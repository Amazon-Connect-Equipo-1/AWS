/* SingleDashboard
Authors:
        A01777771 Stephen Strange*/

//Import Modules
import React from "react";
import "../../styles/Dashboard/SingleDashboard.css";

const SingleDashboard = (props) => {
  return (
    <div className="sdsb-main-container-dashboard">
      <iframe
        className="sdsb-quicksight-dashboard"
        src="https://us-west-2.quicksight.aws.amazon.com/sn/embed/share/accounts/559202700801/dashboards/f0f0db32-74b6-4fef-8a26-89103d50737b?directory_alias=amazonconnectbancos"
      ></iframe>
    </div>
  );
};

export default SingleDashboard;
