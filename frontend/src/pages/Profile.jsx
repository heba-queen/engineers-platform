import UserProfile from "../components/UserProfile";
import UserInvitations from "../components/UserInvitaions";
import UserProfileNavbar from "../components/UserProfileNavbar";
import Projects from "./Projects";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/UserProvider";
import { serverUrl } from "../static/urls";
import Posts from "./Posts";
import { useParams } from "react-router-dom";
const Profile = (invProj) => {
  const [UserInfo, setUserInfo] = useState(null);
  const [Loading, setLoading] = useState(true);


  const { id } = useParams()

  const { userInfo } = useAuth();

  let currentUserId = userInfo.id;

  if(id != null)
    currentUserId = id;


  useEffect(() => {
    axios
      .post(`${serverUrl}profile`, {
        id: currentUserId,
      }, {
    headers: {
      Authorization: `Token ${userInfo.token}`,
    }
  })
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          setUserInfo({
            id: response.data.id,
            email: response.data.email,
            username: response.data.username,
            age: response.data.age,
            country: response.data.country,
            number: response.data.number,
            status: response.data.status,
            speciality: response.data.speciality,
            image: response.data.image,
          });
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, [currentUserId]);

  // let id = 1;

  // let inv = Invitations.filter((inv) => inv.userId == id);
  console.log("projects");
  console.log(invProj);

  return (
    <div className="container">
      {Loading ? (
        <div>Loading</div>
      ) : (
        <div className="row my-3">
          <UserProfile user={UserInfo} setUserInfo = {setUserInfo} id = {userInfo.id} />

          {
            (UserInfo.status == "1") ?
            <div className="col-md-8">
              <Posts search={false} id={currentUserId} key={currentUserId} />
            </div>
            :
          

          <div className="col-md-8">
            {
              (currentUserId == userInfo.id) &&
            <UserProfileNavbar userType={UserInfo.status} id={currentUserId} />
            }
            {(invProj.invProj == true) &&  (currentUserId == userInfo.id) ? (
              <UserInvitations id={currentUserId} />
            ) : (
              <Projects search={false} id={currentUserId} key={currentUserId} />
            )}
          </div>
          }
        </div>
      )}
    </div>
  );
};

export default Profile;
