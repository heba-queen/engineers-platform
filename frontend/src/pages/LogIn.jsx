import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/UserProvider";

const LogIn = () => {
  const { login } = useAuth();

  const navigateTo = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  console.log(userData);

  const [errors, setErrors] = useState({});
  const [ResponseError, setResponseError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email))
      newErrors.email = "Valid email is required";
    if (!userData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log(userData);
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
    axios
      .post("http://127.0.0.1:8000/api/login", {
        email: userData.email,
        password: userData.password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          login({
            email: response.data.user.email,
            id: response.data.user.id,
            username: response.data.user.username,
            image: response.data.user.image,
            type: response.data.user.status,
            token : response.data.token
          });
          console.log(response.data.user.email);
          setErrors({});
          setUserData({});
          console.log("User LoggedIn");

          navigateTo("/");
        }
      })
      .catch((error) => {
        if (error.status == 401) {
          console.log(error.status);
          setResponseError("Invalid credentials");
        }

        console.log(error);
      });
  };

  return (
    <>
      {/* <div style={{"position": "fixed", "opacity": "0.2" , "zIndex": "-10" }}>
                <img style={{"width" : "100%"}} src={background} alt="" />
            </div> */}
      <div className="background">
        <div className="container">
          <div className="row my-3">
            <div className="text-center">
              <div className="title">
                <span>Login to build a great community</span>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="newProjectForm"
              style={{ maxWidth: "600px", margin: "auto" }}
            >
              <div className="formgroup">
                <label htmlFor="email">
                  User Email:<span style={{ color: "#F81212" }}>*</span>
                </label>
                <input
                  onChange={handleInputChange}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="User Email"
                />
                {errors.email && (
                  <span className="text-danger">{errors.email}</span>
                )}
              </div>

              <div className="formgroup">
                <label htmlFor="Category">
                  Password:<span style={{ color: "#F81212" }}>*</span>
                </label>
                <div style={{ position: "relative", width: "100%" }}>
                  <input
                    onChange={handleInputChange}
                    name="password"
                    type="password"
                    id=""
                    placeholder="Password"
                  />
                  {errors.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
                  {/* {{-- < i style="position: absolutetop: 8pxright: 10pxfont-size: 20pxcolor: #757D7C" className="fa-solid fa-eye"></i> --}} */}
                  {/* <i style={{"position": "absolute", "top": "8px", "right": "10px", "fontSize": "20px", "color":" #757D7C"}} className="fa-solid fa-eye-slash"></i> */}
                </div>
                <div className="text-end mt-1">
                  <a
                    href="/forgot-password"
                    style={{ color: "#007bff", fontSize: "14px" }}
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              {ResponseError != "" && (
                <span className="alert alert-danger mt-3 w-100">
                  {ResponseError}
                </span>
              )}
              <button type="submit" className="addPostBtn ms-auto mt-3">
                <span>Login</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
