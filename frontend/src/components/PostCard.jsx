import { useState } from "react";
import { imageUrl, serverUrl } from "../static/urls";
import profile from "../assets/img/user_img/1677328833.png";
import commentImage from "../assets/img/fluent_comment-48-regular.png";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserProvider";

const PostCard = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [editedDescription, setEditedDescription] = useState(post.description);
  const [image, setimage] = useState(post.image);
  const [imagePreview, setimagePreview] = useState(null);

  const { userInfo } = useAuth();

  const [category, setcategory] = useState(post.category);

  const navigateTo = useNavigate();

  const handleCategoryChange = (e) => {
    setcategory(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setimagePreview(URL.createObjectURL(file));
    setimage(file);
  };

  const updatePost = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const deletePost = () => {
    axios
      .post(serverUrl + "deletePost", {
        id: post.id,
      } , {
    headers: {
      Authorization: `Token ${userInfo.token}`,
    }
  })
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          navigateTo("/posts");
        }
      });
  };

  const handleSave = () => {
    axios
      .post(
        serverUrl + "updatePost",
        {
          id: post.id,
          category: category,
          description: editedDescription,
          image: image,
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
          navigateTo("/posts");
        }
      });

    setShowModal(false);
  };

  return (
    <>
      <div className="addPostCon my-3">
        <Link to={`/post/${post.id}`}>
          <Link to={`/profile/invitations/${post.author.id}`}>
            <div className="topDetailes">
              <div className="imgContPost">
                <img
                  src={
                    post.author.image != ""
                      ? imageUrl + "media/" + post.author.image
                      : profile
                  }
                  alt="User"
                />
              </div>
              <div className="nameAndDate">
                <h4>{post.author.username}</h4>
                <span
                  style={{
                    color: "#667170",
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "33px",
                  }}
                >
                  {post.date}
                </span>
              </div>
            </div>
          </Link>
          <div className="post">
            <span>{post.description}</span>
          </div>
          {post.image && (
            <div className="post_img_container">
              <img src={imageUrl + post.image.slice(1,post.image.length) } alt="Post" />
            </div>
          )}
        </Link>
        <div className="like-comment" style={{ zIndex: "9999 !important" }}>
          {post.author.id == userInfo.id && (
            <div
              className="comment"
              style={{ cursor: "pointer" }}
              onClick={updatePost}
            >
              <span>Edit</span>
              <MdEdit />
            </div>
          )}
          <div className="comment" style={{ cursor: "pointer" }}>
            <span>{post.comments} Comment</span>
            <img src={commentImage} alt="Comment Icon" />
          </div>
          {post.author.id == userInfo.id && (
            <div
              className="comment "
              style={{ cursor: "pointer" }}
              onClick={deletePost}
            >
              <span>Delete</span>
              <MdDelete />
            </div>
          )}
        </div>
      </div>

      {/* Modal/Popup */}
      {showModal && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              maxWidth: "500px",
            }}
          >
            <h2>Edit Post</h2>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                rows="5"
              />
            </div>

            <div className="inputCon my-2" style={{ width: "50%" }}>
              <select onChange={handleCategoryChange} name="category" id="type">
                <option value="Artificial Intelligence" selected>
                  Artificial Intelligence
                </option>
                <option value="App & Web Developer">App & Web Developer</option>
                <option value="UI/UX Graphic Design">
                  UI/UX Graphic Design
                </option>
                <option value="Electronic">Electronic</option>
                <option value="Interior">Interior</option>
                <option value="Architectural & Construction">
                  Architectural & Construction
                </option>
                <option value="Interior Design">Interior Design</option>
                <option value="Electrical">Electrical</option>
              </select>
            </div>

            {post.image && (
              <div className="form-group" style={{ marginTop: "15px" }}>
                <label>Current Image</label>
                <img
                  src={
                    imagePreview != null ? imagePreview : imageUrl + post.image
                  }
                  alt="Post"
                  style={{ width: "100%", marginTop: "10px" }}
                />
                <input
                  type="file"
                  className="form-control-file"
                  style={{ marginTop: "10px" }}
                  onChange={handleImageChange}
                />
              </div>
            )}

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                className="btn btn-secondary"
                onClick={handleClose}
                style={{ marginRight: "10px" }}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;
