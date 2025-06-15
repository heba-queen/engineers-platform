import { useEffect, useState } from "react";
import SlideShow from "../components/SlideShow";
import InviteButton from "../components/InviteButton";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../static/urls";
import { useAuth } from "../context/UserProvider";
import { MdDelete, MdEdit } from "react-icons/md";

const ProjectProfile = () => {
  const [count, setcount] = useState(0);

  let { id } = useParams();
  const [project, setproject] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userInfo } = useAuth();

  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .post(`${serverUrl}project/${id}`, {
        userId: userInfo.id,
      }, {
    headers: {
      Authorization: `Token ${userInfo.token}`,
    }
  })
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          setproject({
            id: response.data.id,
            name: response.data.name,
            category: response.data.category,
            license: response.data.license,
            description: response.data.description,
            projImg: [
              response.data.image1,
              response.data.image2,
              response.data.image3,
            ],
            author: response.data.author_id,
          });
          setcount(response.data.invite);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEdit = () => {
    navigateTo("/editProject/" + id);
  };


  const handleDelete = ()=> {
    axios
      .post(`${serverUrl}deleteProject`, {
        id: project.id,
      }, {
    headers: {
      Authorization: `Token ${userInfo.token}`,
    }
  })
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          navigateTo("/projects");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="container" style={{ minHeight: "80vh" }}>
          <>
            <div className="projict_interface_title mx-5 my-3">
              <span>
                {project.name} -{" "}
                <span style={{ color: "orange", fontSize: "smaller" }}>
                  Licensed By
                </span>{" "}
                {project.license}
              </span>
            </div>
            <SlideShow images={project.projImg} />
            <div className="discription mx-5 my-2">
              <div className="discription_title">
                <span>Project Description</span>
                <pre
                  style={{ whiteSpace: "pre-wrap", MozWhiteSpace: "pre-wrap" }}
                >
                  {project.description}
                </pre>
              </div>
            </div>
          </>

          {project.author == userInfo.id && (
            <div className="d-flex w-100 gap-2 align-items-center justify-content-center">
              <div className="d-flex align-items-center justify-content-center p-3 ">
                <button onClick={handleEdit} className="btn btn-success">
                  Edit Project
                  <MdEdit />
                </button>
              </div>

              <div className="d-flex align-items-center justify-content-center p-3">
                <button onClick={handleDelete} className="btn btn-danger">
                  Delete Project
                  <MdDelete />
                </button>
              </div>
            </div>
          )}

          <InviteButton
            setcount={setcount}
            type={userInfo.type}
            token = {userInfo.token}
            count={count}
            id={id}
            userOwner={project.author}
          />
        </div>
      )}
    </>
  );
};

export default ProjectProfile;
