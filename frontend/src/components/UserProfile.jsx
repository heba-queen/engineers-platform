/* eslint-disable react/prop-types */
import defaultImg from "../assets/img/flat-color-icons_add-image.png";
import googleImg from "../assets/img/logos_google-gmail.png";

import whatsappImg from "../assets/img/logos_whatsapp-icon.png";
import { useNavigate } from "react-router-dom";
import profile from "../assets/img/user_img/1677328833.png";
import { useAuth } from "../context/UserProvider";
import { imageUrl, serverUrl } from "../static/urls";
import axios from "axios";
import { useState } from "react";

const UserProfile = ({ user, setUserInfo, id }) => {
  console.log(user);

  const navigateTo = useNavigate();

  const { logout, login } = useAuth();

  const [isEdit, setisEdit] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleLogout = () => {
    logout();
    navigateTo("/");
  };

  const handleEdit = () => {
    setisEdit(!isEdit);
    handleSubmitNewImage();
  };

  const [image, setimage] = useState(null);
  const [imagePreview, setimagePreview] = useState(profile);
  const [error, seterror] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setUserInfo({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimage(file);
      setimagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitNewImage = () => {
    axios
      .post(
        `${serverUrl}updateProfile`,
        {
          id: user.id,
          username: user.username,
          age: user.age,
          email: user.email,
          country: user.country,
          number: user.number,
          speciality: user.speciality,
          image: image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${user.token}`,
          },
        }
      )

      .then((response) => {
        console.log(response.data);
        login({
          email: response.data.email,
          id: response.data.id,
          username: response.data.username,
          image: response.data.image,
          type: response.data.status,
          token: user.token,
        });
      })
      .catch((error) => {
        if (error.status == "406") seterror("Email already taken");
        console.log(error);
      });
  };

  return (
    <div
      className="col-md-4"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px",
        flexDirection: "column",
        border: "1px solid #fff",
        boxShadow: "3px 2px 5px rgba(0, 0, 0, 0.25)",
      }}
    >
      <form
        id="update"
        onSubmit={handleSubmitNewImage}
        method="POST"
        encType="multipart/form-data"
      >
        <div className="Engineer_profile_img_con">
          <img
            src={
              user.image != "" ? `${imageUrl}media/${user.image}` : imagePreview
            }
            alt="User Profile"
          />
          {user.id == id && (
            <div className="chingImg">
              <label htmlFor="image" style={{ cursor: "pointer" }}>
                <img src={defaultImg} alt="Change" style={{ width: "70px" }} />
              </label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          )}
        </div>
      </form>

      <div key={user.id} className="text-center">
        <div className="title">
          {isEdit ? (
            <input
              type="text"
              defaultValue={user.username}
              name="username"
              onChange={handleInputChange}
              style={{ color: "blue" }}
            />
          ) : (
            <span>{user.username}</span>
          )}
        </div>

        <div className="contact_info">
          <div className="gmail_accunt">
            <img src={googleImg} alt="Gmail" />
            {isEdit ? (
              <input
                type="email"
                defaultValue={user.email}
                name="email"
                onChange={handleInputChange}
                style={{ color: "blue" }}
              />
            ) : (
              <span>{user.email}</span>
            )}
          </div>
          {error.length > 1 && !isEdit && (
            <div className="alert alert-danger">{error}</div>
          )}
          <div className="whatsUp">
            <img src={whatsappImg} alt="WhatsApp" />
            {isEdit ? (
              <input
                type="text"
                defaultValue={user.number}
                name="number"
                onChange={handleInputChange}
                style={{ color: "blue" }}
              />
            ) : (
              <span>{user.number}</span>
            )}
          </div>
        </div>
        <div className="item_inf" style={{ fontSize: "large" }}>
          <span>Age:</span>
          {isEdit ? (
            <input
              type="text"
              defaultValue={user.age}
              name="age"
              onChange={handleInputChange}
              style={{ color: "blue" }}
            />
          ) : (
            <span>{user.age}</span>
          )}
        </div>
        <div className="item_inf" style={{ fontSize: "large" }}>
          <span>Country:</span>

          {isEdit ? (
            <input
              type="text"
              defaultValue={user.country}
              name="country"
              onChange={handleInputChange}
              style={{ color: "blue" }}
            />
          ) : (
            <span>{user.country}</span>
          )}
        </div>
        <div className="item_inf" style={{ fontSize: "large" }}>
          <span>Speciality :</span>
          {isEdit ? (
            <input
              type="text"
              defaultValue={user.speciality}
              name="speciality"
              onChange={handleInputChange}
              style={{ color: "blue" }}
            />
          ) : (
            user.speciality
          )}
        </div>
        <div className="my-5">
          {user.id == id && (
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              <a className="logout" onClick={handleLogout}>
                <span>Log out</span>
              </a>

              <a
                className="logout"
                style={{ border: "2px green solid" }}
                onClick={handleEdit}
              >
                <span>{isEdit ? "Submit" : "Edit Profile"}</span>
              </a>

              <a
                className="logout"
                style={{ border: "2px #007bff solid", color: "#007bff" }}
                onClick={() => setShowPasswordModal(true)}
              >
                <span>Change Password</span>
              </a>
            </div>
          )}
        </div>
      </div>
      {showPasswordModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              width: "300px",
            }}
          >
            <h5 className="mb-3">Change Password</h5>
            <input
              type="password"
              placeholder="New Password"
              className="form-control mb-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {passwordMessage && (
              <div className="text-success mb-2">{passwordMessage}</div>
            )}
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-primary"
                onClick={async () => {
                  try {
                    const res = await axios.post(
                      `${serverUrl}change-password/`,
                      {
                        id: user.id,
                        new_password: newPassword,
                      },
                      {
                        headers: {
                          Authorization: `Token ${user.token}`,
                        },
                      }
                    );
                    setPasswordMessage("Password updated!");
                    setTimeout(() => {
                      setShowPasswordModal(false);
                      setPasswordMessage("");
                      setNewPassword("");
                    }, 2000);
                  } catch (err) {
                    setPasswordMessage("Failed to update password.");
                    console.error(err);
                  }
                }}
              >
                Submit
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
