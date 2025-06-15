import logo from "../assets/img/logoBig.png";
import post from "../assets/img/file-icons_postscript.png";
import code from "../assets/img/simple-icons_codeproject.png";
import profile from "../assets/img/user_img/1677328833.png";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/UserProvider";
import { imageUrl } from "../static/urls";


const Navbar = () => {

    const { userInfo , logout } = useAuth();

    console.log(userInfo)

  const navigateTo = useNavigate();

  
  const handleLogout = () => {
    logout();
    navigateTo("/");
  };

  

  return (
    <nav className="navbar navbar-expand-lg" style={{ padding: "5px 20px" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <div className="navLogoCon">
            <img style={{ width: "60px" }} src={logo} />
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse eng-nav-items"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 postProject">
            <li className="nav-item">
              <Link
                id="parts1"
                className="parts nav-link active"
                aria-current="page"
                to="/posts"
              >
                <img src={post} />
                <span className="categoryName">Posts</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                id="parts2"
                className="parts nav-link active"
                aria-current="page"
                to="/projects"
              >
                <img src={code} />
                <span className="categoryName">Projects</span>
              </Link>
            </li>
          </ul>
          <div className="linkContainer">
            {/* @if(session()->has('LoginUser')) */}
            {userInfo != null ? (
              <a className="link" onClick={handleLogout}>
                <span>log out</span>
              </a>
            ) : (
              <>
                <Link className="link" to="/login">
                  <span>log in</span>
                </Link>
                <Link className="link" to="/signup">
                  <span>sign up</span>
                </Link>
              </>
            )}
            {/* @endif */}
          </div>
          {/* @if(session()->has('LoginUser')) */}
          {userInfo != null && (
            <div className="profile_nav_img_con"> 
              <Link to={`/profile/invitations/${userInfo.id}`}>
                <img src={userInfo.image != '' ? imageUrl + ((userInfo.image.slice(0,6) == "/media") ? userInfo.image.slice(1,userInfo.image.length) : ('media/' + userInfo.image)) : profile} />
              </Link>
            </div>
          )}
          {/* @endif */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
