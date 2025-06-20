import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import SearchForm from "../components/SearchForm";
import AddPost from "../components/AddPost";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/UserProvider";
import { serverUrl } from "../static/urls";

const Posts = ({ search, id }) => {
  const { userInfo } = useAuth();
  const location = useLocation();
  const [posts, setposts] = useState(null);
  const [postsCopy, setpostsCopy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.post( serverUrl+"posts" , {
      userId : (id != null) ? id : 0,
    }).then((response) => {
      console.log(response.data);
      if (response.status == 200) {
        setposts(response.data);
        
        setLoading(false);
        setpostsCopy(response.data);
      }
    });
  }, [location.key]);

  const [searchData, setsearchData] = useState({
    search: "",
    cat: "all",
  });
  const handleSearch = (e) => {
    e.preventDefault();
    let pp = postsCopy.filter((post) => {
      if (
        post.description
          .toLowerCase()
          .includes(searchData.search.toLowerCase()) &&
        (post.category == searchData.cat || searchData.cat == "all")
      ) {
        return post;
      }
    });
    setposts(pp);
  };

  return (
    <>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          {/* {error && <ErrorMessage message="Fill all information" onClose={onCloseError} />} */}
          <div className="container" style={{ minHeight: "75vh" }}>
            <div className="row my-3">
              {(search) && (
                <SearchForm
                  search={searchData}
                  setsearch={setsearchData}
                  handleSearch={handleSearch}
                  align={true}
                />
              )}
              <div className="col-md-8">
                {userInfo.type == 1 && <AddPost />}
                {posts.map((postInfo, index) => (
                  <PostCard key={index} post={postInfo} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
