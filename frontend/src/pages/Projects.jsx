import {useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import ProjectCard from "../components/ProjectCard";

import icon from "../assets/img/material-symbols_add-circle-outline.png";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/UserProvider";
import { serverUrl } from "../static/urls";



const Projects = ({ search, id }) => {
  const [projects, setProjects] = useState(null);
  const [projectsCopy, setProjectsCopy] = useState(null);
  const [loading, setLoading] = useState(true);

  const {userInfo} = useAuth();

  useEffect(() => {
    let url = serverUrl + "projects"
    
    axios.post(url , {
      'id' : id    
    }).then((response) => {
      console.log(response.data);
      if (response.status == 200) {
        setProjects(response.data);
        setLoading(false);
        setProjectsCopy(response.data);
      }
    });
  }, []);

  const [queryParameters] = useSearchParams();
  let cat = "";
  if (queryParameters.get("cat") != null) cat = queryParameters.get("cat");

  const [searchData, setsearchData] = useState({
    search: "",
    cat:
      queryParameters.get("cat") != null ? queryParameters.get("cat") : "all",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    let pp = projectsCopy.filter((project) => {
      if (
        project.name.toLowerCase().includes(searchData.search.toLowerCase()) &&
        (project.category == searchData.cat || searchData.cat == "all")
      ) {
        return project;
      }
    });
    setProjects(pp);
  };

  return (
    <div className="container" style={{ minHeight: "75vh" }}>
      <div className="row my-3">
        {search && (
          <>
            <div className="text-center">
              <div className="title">
                <span>Search For More Project</span>
              </div>
            </div>
            <div className="col-md-12">
              <SearchForm
                cat={cat}
                align={false}
                search={searchData}
                setsearch={setsearchData}
                handleSearch={handleSearch}
              />
            </div>
          </>
        )}

        { (id == null || id == userInfo.id) && (userInfo.type == '2') && (
          <div className="col-md-12" style={{ paddingTop: "30px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Link className="addPostBtn" to="/addproject">
                <img src={icon} alt="Add Project" />
                <span>Add new project</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="row">
          {projects.map((project, key) => (
            <ProjectCard key={key} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
