import { Link } from "react-router-dom";

const UserProfileNavbar = ({ userType , id }) => {
  console.log(userType);
  console.log(userType == '1')
return (
  <>
    {userType == "2" && (
      <div className="top_title">
        <span>
          <Link id="post" to={`/profile/invitations/${id}`}>
            Invitations
          </Link>
        </span>
        <span>
          <Link id="pro" to={`/profile/projects/${id}`}>
            Projects
          </Link>
        </span>
      </div>
    )}
  </>
)}

export default UserProfileNavbar;
