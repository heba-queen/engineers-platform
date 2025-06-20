import { useState } from "react";
import addImg from '../assets/img/material-symbols_add-circle-outline.png'
import addImgIcon from '../assets/img/flat-color-icons_add-image.png'

import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../context/UserProvider";
import { serverUrl } from "../static/urls";
const AddPost = () => {

  const navigateTo  = useNavigate();

  const { userInfo } = useAuth();


  const [post, setpost] = useState({
    category: 'Artificial Intelligence',

    image: null,
  })

  const [errors, setErrors] = useState({})
  const [imagePreview, setImagePreview] = useState(null)
  const [image, setImage] = useState(null)


  const validateForm = () => {
    const newErrors = {}
    if (!post.desc) newErrors.desc = 'Please fill your post details'
    return newErrors
  }



  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
      setImage(file)
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setpost({ ...post, [name]: value })
    console.log(post)
  }

  const handleSubmit = (e) => {

    e.preventDefault()
    const formErrors = validateForm()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      post.image = image;

      submitData();

      setErrors({})
      setpost({
        desc : ''
      })
      
      
      navigateTo('/posts');
    }
  }


  const submitData = () => {
      axios
        .post(
          serverUrl + "/addPost",
          {
            category: post.category,
            description: post.desc,
            image: post.image,
            author : userInfo.id
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
            setErrors({});
  
            console.log("Project Created");
  
            navigateTo("/posts");
          }
        })
        .catch((error) => console.log(error));
    };


  return (
    <div className="addPostCon">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="topsection justify-content-end">

          <button type="submit" className="addPostBtn">
            <img src={addImg} alt="Add" />
            <span>Add post</span>
          </button>
        </div>
        <div className="bottomSection">
          <textarea value={post.description} onChange={handleInputChange} name="desc" placeholder="Add new post..." id="text" cols="30" rows="5"></textarea>
          {errors.desc && (<span className='text-danger'>{errors.desc}</span>)}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="inputCon my-2" style={{ width: "50%" }}>
            <select onChange={handleInputChange} name="category" id="type">
              <option value="Artificial Intelligence" selected>
                Artificial Intelligence
              </option>
              <option value="App & Web Developer">App & Web Developer</option>
              <option value="UI/UX Graphic Design">UI/UX Graphic Design</option>
              <option value="Electronic">Electronic</option>
              <option value="Interior">Interior</option>
              <option value="Architectural & Construction">Architectural & Construction</option>
              <option value="Interior Design">Interior Design</option>
              <option value="Electrical">Electrical</option>
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#1E477A" }}>
            <label htmlFor="image_pro" style={{ cursor: "pointer" }}>
              <span>Add image</span>
              <img src={imagePreview || addImgIcon} style={{ "width": "60px" }} alt="Add Image" />
            </label>
            <input onChange={handleImageChange} type="file" id="image_pro" name="profileImage" style={{ display: "none" }} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
