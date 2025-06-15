import React, { useEffect, useState } from "react";
import { projectsData, Users } from "../assets/Data";
import { Link } from "react-router-dom";
import axios from "axios";
import { imageUrl, serverUrl } from "../static/urls";
import { useAuth } from "../context/UserProvider";

const UserInvitations = ({ id }) => {
  const [invitations, setinvitations] = useState(null);
  const [loading, setloading] = useState(true);

  const {userInfo} = useAuth();

  useEffect(() => {
    axios
      .post(`${serverUrl}invitations`, {
        id: id,
      }, {
    headers: {
      "Authorization": `Token ${userInfo.token}`,
    }
  })
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          setinvitations(response.data);
          setloading(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div className="col-md-8 w-100">
          {invitations.map((invitation) => {
            

            return (
              <Link to={`/project/${invitation.project.id}`} key={invitation.project.id}>
                <div className="addPostCon my-3">
                  <Link to={`/profile/invitations/${invitation.author.id}`}>
                  
                  <div className="topDetailes">
                    <div className="imgContPost">
                      <img src={imageUrl + 'media/' + invitation.author.image} alt="Post User" />
                    </div>
                    <div className="nameAndDate">
                      <h6>{invitation.author.username} Sent to You an invitaion</h6>
                    </div>
                  </div>
                  </Link>
                  <div className="post">
                    <span>Click here to check the project : {invitation.project.description}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default UserInvitations;
