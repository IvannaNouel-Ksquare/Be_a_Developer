import React, { ReactNode } from "react";
import ViewQuestions from "../../components/ShowQuestions";
import DefaultNavBarAdminTemplate from "../../templates/DefaultNavBarAdminTemplate ";
import "./style.css";

const Admin = () => { 
  return (
    <DefaultNavBarAdminTemplate>
      <div className="container-admin">
        <ViewQuestions></ViewQuestions>
      </div>
    </DefaultNavBarAdminTemplate>
  );
};

export default Admin;
