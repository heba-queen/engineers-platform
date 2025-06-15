import { useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import SidebarImage from "./SidebarImage";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../static/urls";
import { useAuth } from "../context/UserProvider";

const AddProject = () => {
  const { id } = useParams();

  return (
    <div className="container">
      <div className="row my-3">
        <ProjectForm id={id} />
        <SidebarImage />
      </div>
    </div>
  );
};

export default AddProject;
