import React, { ReactNode } from "react";
import ViewMatch from "../../components/History";
import DefaultNavBarTemplate from "../../templates/DefaultNavBarTemplate";
import "./style.css";

const UserHistory = () => { 
  return (
    <DefaultNavBarTemplate>
      <div className="container-match">
        <ViewMatch></ViewMatch>
      </div>
    </DefaultNavBarTemplate>
  );
};

export default UserHistory;
