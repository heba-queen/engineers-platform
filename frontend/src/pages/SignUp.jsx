import { useState } from "react";
import Formfield from "../components/Formfield";
import eng from "../assets/img/cdcd.png";
import investor from "../assets/img/logos_customerio-icon.png";
import add_img from "../assets/img/flat-color-icons_add-image.png";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/UserProvider";
import { serverUrl } from "../static/urls";

const SignUp = () => {
  const navigateTo = useNavigate();
  const { login } = useAuth();
   const [errormessage, seterrormessage] = useState('');
  const [userData, setUserData] = useState({
    name: "",
    age: 0,
    country: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    type: "1", // Default to Engineer
    job: "",
    profileImage: null,
  });

  console.log(userData);

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!userData.name) newErrors.name = "Full Name is required ";
    if (!userData.age || isNaN(userData.age))
      newErrors.age = "Valid age is required";
    if (!userData.country) newErrors.country = "Country is required";
    if (!userData.job) newErrors.job = "Job is required";
    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email))
      newErrors.email = "Valid email is required";
    if (!userData.phone || !/^\d{10}$/.test(userData.phone))
      newErrors.phone = "phone number should be 10 digits";
    if (!userData.password) newErrors.password = "Password is required";
    if (userData.password !== userData.confirm)
      newErrors.confirm = "Passwords do not match";
    return newErrors;
  };

  const handleInputChange = (e) => {
    if (e.target.type == "number") {
 
      setUserData({ ...userData, [e.target.name]: e.target.valueAsNumber });
    } else {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
    }
    console.log(userData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData({ ...userData, profileImage: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    console.log(formErrors);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      submitData();
    }
  };

  const submitData = () => {
    console.log(userData);

    axios
      .post(
        serverUrl + "signup",
        {
          username: userData.name,
          password: userData.password,
          email: userData.email,
          age: userData.age,
          country: userData.country,
          number: userData.phone,
          speciality: userData.job,
          status: userData.type,
          image: userData.profileImage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
         console.log(response.data);
        console.log(response.status);
        if (response.status == 201 || response.status == 200) {
          login({
            email: response.data.user.email,
            id: response.data.user.id,
            username: response.data.user.username,
            image: response.data.user.image,
            type : response.data.user.status,
            token : response.data.token
          });
          setErrors({});
          setUserData({});
          seterrormessage('')
          console.log("User Created");

          navigateTo("/");
        }
      })
      .catch((error) => { console.log(error)
        setErrors({});
        seterrormessage('User already exist !')
      });
  };

  return (
    <div>
      <div className="background">
        <div className="container">
          <div className="row my-3">
            <div className="text-center">
              <div className="title">
                <span>First Step to be famous Sign Up with us</span>
              </div>
            </div>
            <h6 style={{ paddingBottom: "10px" }}>Important Information:</h6>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row">
                <Formfield
                  onChange={handleInputChange}
                  error={errors.name}
                  name={"name"}
                  col={"col-md-12"}
                  hint={"Enter your full name"}
                  type={"text"}
                />
              </div>
              <div className="row">
                <Formfield
                  name={"age"}
                  col={"col-md-6"}
                  hint={"Enter your age"}
                  type={"number"}
                  onChange={handleInputChange}
                  error={errors.age}
                />
                <Formfield
                  name={"country"}
                  col={"col-md-6"}
                  hint={"Enter your country"}
                  type={"text"}
                  onChange={handleInputChange}
                  error={errors.country}
                />
              </div>
              <Formfield
                onChange={handleInputChange}
                error={errors.email}
                name={"email"}
                col={"col-md-12"}
                hint={"Enter your email"}
                type={"text"}
              />
              <Formfield
                onChange={handleInputChange}
                error={errors.phone}
                name={"phone"}
                col={"col-md-12"}
                hint={"Enter your number"}
                type={"text"}
              />
              <Formfield
                onChange={handleInputChange}
                error={errors.password}
                name={"password"}
                col={"col-md-12"}
                hint={"Enter your Password"}
                type={"password"}
              />
              <Formfield
                onChange={handleInputChange}
                error={errors.confirm}
                name={"confirm"}
                col={"col-md-12"}
                hint={"Re-write password"}
                type={"password"}
              />

              {/* <div className="row">
                                <div className="col-md-12">
                                    <div className="formgroup" style="width: 98.4% !important">
                                        <label for="Category">Password:<span style="color:#F81212 ">*</span></label>
                                        <div style="position: relativewidth: 100%">
                                            <input  name="Password" type="password" name="" id="" placeholder="Password"/>
                                            <i style="position: absolutetop: 8pxright: 10pxfont-size: 20pxcolor: #757D7C"
                                                className="fa-solid fa-eye-slash"></i>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

              <div className="d-flex justify-content-around my-3">
                <div className="d-flex gap-2 align-items-center">
                  <label htmlFor="">
                    <img src={eng} style={{ width: "35px" }} />
                    <span>Engineer:</span>
                  </label>
                  {userData.type == "2" ? (
                    <input
                      onChange={handleInputChange}
                      name="type"
                      value="2"
                      type="radio"
                      checked
                    />
                  ) : (
                    <input
                      onChange={handleInputChange}
                      name="type"
                      value="2"
                      type="radio"
                    />
                  )}
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <label htmlFor="">
                    <img src={investor} style={{ width: "35px" }} />
                    <span>Investor:</span>
                  </label>
                  {userData.type == "1" ? (
                    <input
                      onChange={handleInputChange}
                      name="type"
                      value="1"
                      type="radio"
                      checked
                    />
                  ) : (
                    <input
                      onChange={handleInputChange}
                      name="type"
                      value="1"
                      type="radio"
                    />
                  )}
                </div>
              </div>

              <div
                style={{ paddingBottom: "15px", borderTop: "1px solid" }}
              ></div>
              <h6 style={{ paddingBottom: "10px" }}>Your Speciality:</h6>
              <Formfield
                onChange={handleInputChange}
                error={errors.job}
                name={"job"}
                col={"col-md-12"}
                hint={"Ex: Graphic designer"}
                type={"text"}
              />

              <div className="row">
                <div className="formgroup">
                  <label htmlFor="Description">Add Profile Image:</label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "5px",
                      background: "rgba(251, 245, 213, 0.25)",
                      width: "150px",
                    }}
                  >
                    <label style={{ cursor: "pointer" }} htmlFor="image_pro">
                      <img
                        src={imagePreview || add_img}
                        style={{ width: "70px" }}
                      />
                    </label>
                    <input
                      onChange={handleImageChange}
                      name="profileImage"
                      type="file"
                      style={{ display: "none" }}
                      id="image_pro"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center m-3">
              <span className="text-danger">{errormessage}</span>
              </div>
              <button
                type="submit"
                className="addPostBtn ms-auto"
                style={{ width: "fitContent", border: "none" }}
              >
                <span>Create Account</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
