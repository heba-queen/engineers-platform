import { useEffect, useState } from "react";
import addImg from "../assets/img/material-symbols_add-circle-outline.png";
import ImageUploader from "./ImageUploader";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserProvider";
import axios from "axios";
import { serverUrl } from "../static/urls";

const ProjectForm = ({ id }) => {
  const [loading, setLoading] = useState((id) ? true : false);
  const { userInfo } = useAuth();

  console.log(userInfo);

  const navigateTo = useNavigate();

  const [project, setproject] = useState({
    category: "Artificial Intelligence",
    license: "MIT License",
  });

  const [images, setImages] = useState([null, null, null]);
  const [imagesPreview, setImagesPreview] = useState([null, null, null]);

  if (id != null) {
    useEffect(() => {
      axios
        .post(`${serverUrl}project/${id}`, {
          userId: userInfo.id,
        } ,  {
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
              desc: response.data.description,
              projImg: [
                response.data.image1,
                response.data.image2,
                response.data.image3,
              ],
              author: response.data.author_id,
            });

            setImages([
                response.data.image1,
                response.data.image2,
                response.data.image3,
              ])

            setLoading(false);
          }
        })
        .catch((error) => console.log(error));
    }, []);
  }

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!project.projectName)
      newErrors.projectName = "Project Name is required ";
    if (!project.desc) newErrors.desc = "Description is required";
    return newErrors;
  };

  

  const handleInput = (e) => {
    const { name, value } = e.target;
    setproject({ ...project, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    console.log(formErrors);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});

      project.images = images;

      submitData();

      setproject({});

      navigateTo("/projects");
    }
  };

  const submitData = () => {

    if(id == null){

    
    axios
      .post(
        "http://127.0.0.1:8000/api/addProject",
        {
          name: project.projectName,
          category: project.category,
          license: project.license,
          description: project.desc,
          image1: project.images[0],
          image2: project.images[1],
          image3: project.images[2],
          author: userInfo.id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${userInfo.token}`,
            
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          setErrors({});

          console.log("Project Created");

          navigateTo("/projects");
        }
      })
      .catch((error) => console.log(error));

    } else {
      
    axios
      .post(
        "http://127.0.0.1:8000/api/editProject",
        {
          id : id,
          name: project.projectName,
          category: project.category,
          license: project.license,
          description: project.desc,
          image1: project.images[0],
          image2: project.images[1],
          image3: project.images[2],
          author: userInfo.id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${userInfo.token}`,
           
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          setErrors({});

          console.log("Project Created");

          navigateTo("/projects");
        }
      })
      .catch((error) => console.log(error));

    }
  };

  return (
    <>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div
          className="col-md-8"
          style={{
            borderTop: "1px solid #fff",
            paddingTop: "10px",
            boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="title">
            <span>Add Your New Project</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="newProjectForm"
            encType="multipart/form-data"
          >
            <div className="formgroup">
              <label htmlFor="name">
                Project Name: <span style={{ color: "#F81212" }}>*</span>
              </label>
              <input
                onChange={handleInput}
                defaultValue={project.name}
                name="projectName"
                type="text"
                id="name"
                placeholder="Project Name"
              />
              {errors.projectName && (
                <span className="text-danger">{errors.projectName}</span>
              )}
            </div>
            <div className="formgroup">
              <label htmlFor="Category">
                Project Category: <span style={{ color: "#F81212" }}>*</span>
              </label>
              <select onChange={handleInput} name="category" id="Category">
                <option defaultChecked selected= {(project.category == "Artificial Intelligence")} defaultValue="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option selected= {(project.category == "App & Web Developer")} defaultValue="App & Web Developer">App & Web Developer</option>
                <option selected= {(project.category == "UI/UX Graphic Design")}  defaultValue="UI/UX Graphic Design">
                  UI/UX Graphic Design
                </option>
                <option selected= {(project.category == "Electronic")}  defaultValue="Electronic">Electronic</option>
                <option selected= {(project.category == "Interior")}  defaultValue="Interior">Interior</option>
                <option selected= {(project.category == "Architectural & Construction")}  defaultValue="Architectural & Construction">
                  Architectural & Construction
                </option>
                <option selected= {(project.category == "Interior Design")}  defaultValue="Interior Design">Interior Design</option>
                <option selected= {(project.category == "Electrical")}  defaultValue="Electrical">Electrical</option>
              </select>
            </div>
            <div className="formgroup">
              <label htmlFor="license">
                Project License: <span style={{ color: "#F81212" }}>*</span>
              </label>
              <select onChange={handleInput} name="license" id="license">
                <option defaultChecked selected= {(project.license == "MIT License")} defaultValue="MIT License">
                  MIT License
                </option>
                <option selected= {(project.license == "Apache License 2.0")} defaultValue="Apache License 2.0">Apache License 2.0</option>
                <option selected= {(project.license == "GNU General Public License 2.0")} defaultValue="GNU General Public License 2.0">
                  GNU General Public License 2.0
                </option>
                <option selected= {(project.license == "GNU General Public License 3.0")} defaultValue="GNU General Public License 3.0">
                  GNU General Public License 3.0
                </option>
                <option selected= {(project.license == "Boost Software License 1.0")} defaultValue="Boost Software License 1.0">
                  Boost Software License 1.0
                </option>
                <option selected= {(project.license == "Eclipse Public License 2.0")} defaultValue="Eclipse Public License 2.0">
                  Eclipse Public License 2.0
                </option>
              </select>
            </div>
            <div className="formgroup">
              <label htmlFor="Description">
                Project Description: <span style={{ color: "#F81212" }}>*</span>
              </label>
              <textarea
                name="desc"
                id="Description"
                cols="30"
                rows="5"
                placeholder="Project Description"
                defaultValue={project.desc}
                onChange={handleInput}
              ></textarea>
              {errors.desc && (
                <span className="text-danger">{errors.desc}</span>
              )}
            </div>
            <ImageUploader
              images={images}
              setImages={setImages}
              imagesPreview={imagesPreview}
              setImagesPreview={setImagesPreview}
            />
            <div
              className="w-100"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px 0",
                borderTop: "1px solid",
              }}
            >
              <button type="submit" className="addPostBtn">
                <img src={addImg} alt="Add" />
                <span>Add new project</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ProjectForm;
