import axios from 'axios';
import { serverUrl } from '../static/urls';
import { useAuth } from '../context/UserProvider';

const InviteButton = ({ type, count, id , setcount , userOwner , token }) => {
  console.log(userOwner)
  const {userInfo } = useAuth();

  if (type !== '1') return null;
  

  const increaseCount = ()=>{
    

    axios
      .post(`${serverUrl}invite` , {
        userOwner : userOwner,
        userId : userInfo.id,
        projectId : id,
      },
     {
    headers: {
      Authorization: `Token ${token}`,
    }
  })
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          setcount(2)
          
        }
      })
      .catch((error) => console.log(error));

  }

  return (
    <div className="text-center my-5">
      {count === 0 ? (
        <a onClick={increaseCount} className="btn btn-success">
          Invite for a meeting
        </a>
      ) : (
        <span className="alert alert-success">Already Invited</span>
      )}
    </div>
  );
};

export default InviteButton;
