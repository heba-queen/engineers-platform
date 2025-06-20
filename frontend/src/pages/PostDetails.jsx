import { useEffect, useState } from "react";
import { imageUrl, serverUrl } from "../static/urls";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddBotton from "../assets/img/material-symbols_add-circle-outline.png";
import { useAuth } from "../context/UserProvider";
import profile from "../assets/img/user_img/1677328833.png";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setloading] = useState(true);
  const [description, setdescription] = useState("");

  const { userInfo } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    let url = serverUrl + "post";

    axios
      .post(url, {
        id: id,
      } , {
    headers: {
      "Authorization": `Token ${userInfo.token}`,
    }
  })
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          setPost(response.data);
          setloading(false);
        }
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        serverUrl + "addComment",
        {
          description: description,
          id: post.id,
          post: post.id,
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
          setdescription("");
          loadData();
        }
      });
  };

  const handleInputData = (e) => {
    setdescription(e.target.value);
  };

  function deleteComment(e, id) {
    e.preventDefault();
    axios
      .post(serverUrl + "deleteComment", {
        id: id,
      }, {
    headers: {
      Authorization: `Token ${userInfo.token}`,
    }
  })
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          loadData();
        }
      });
  }

  return (
    <>
      {/* <div className="erorr_con" id="erorr">
    <div className="error">
        <span>fill all information</span>
        <button className="OK" id="OK">OK</button>
    </div>
</div> */}
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div className="container ">
          <div className="row my-3 d-flex justify-content-center">
            <div className="col-md-8">
              <div className="addPostCon my-3">
                <div className="topDetailes">
                  <div className="imgContPost">
                    <img
                      src={imageUrl + "media/" + post.author_id.image}
                      alt=""
                    />
                  </div>
                  <div className="nameAndDate">
                    <h4>{post.author_id.username}</h4>
                    {/* <span style={{color: "#667170";fontWeight: "400";fontSize: "18px";lineHeight: "33px"}}>{{ $item->created_at }}</span> */}
                  </div>
                </div>
                <div className="post">
                  <span>{post.description}</span>
                  {post.image != "" && (
                    <div className="post_img_container">
                      <img src={imageUrl + "media/" + post.image} alt="" />
                    </div>
                  )}
                </div>
                <div className="like-comment"></div>
                <div className="comment" style={{ flexDirection: "column" }}>
                  {post.comments.map((comment, index) => (
                    <div className="addPostCon my-2" key={index}>
                      <div className="topDetailes d-flex">
                        <div className="imgContPost">
                          <img
                            alt=""
                            style={{ width: "100%" }}
                            src={imageUrl + "media/" + comment.author.image}
                          />
                        </div>
                        <div className="nameAndDate">
                          <h4>{comment.author.username}</h4>
                          {/* <span style={{color: "#667170;fontWeight: "400";fontSize: "18px";lineHeight: "33px"}}>{ " adate "}</span> */}
                        </div>
                        {userInfo.id == comment.author.id && (
                          <div className="d-flex flex-fill justify-content-end">
                            <button
                              className="btn btn-danger"
                              onClick={(e) => deleteComment(e, comment.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="post">
                        <span>{comment.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="addPostCon">
                  <form
                    onSubmit={handleSubmit}
                    action="/addComment"
                    method="POST"
                  >
                    <div className="topsection">
                      <div className="imgContPost">
                        <img
                        src={ (userInfo.image != '' && userInfo.image != null) ? imageUrl + (  (userInfo.image.slice(0,6) == "/media") ? userInfo.image : ('media/' + userInfo.image)  ) : profile}
                          alt=""
                        />
                      </div>
                      <button type="submit" className="addPostBtn">
                        <img src={AddBotton} alt="" />
                        <span>Add comment</span>
                      </button>
                    </div>
                    <div className="bottomSection">
                      <textarea
                        name="comment"
                        onChange={handleInputData}
                        placeholder="Add Comment..."
                        id="text"
                        cols="30"
                        rows="5"
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;
