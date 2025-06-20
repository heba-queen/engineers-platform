import React from 'react';
import { Link } from 'react-router-dom';
import profile from "../assets/img/user_img/1677328833.png";
import { imageUrl } from '../static/urls';

const ProjectCard = ({ project }) => {
  console.log(project)
  const authorImage = imageUrl + 'media/' + project.author.image;
  return (
    <div className="col-md-4 col-sm-6 my-3">
      <Link to={`/project/${project.id}`}>
        <div className="projectCon">
          <img
            src={`${imageUrl}${project.image1}`}
            alt="Project"
            style={{ width: '100%', height: '250px' }}
          />
          <Link to={`/profile/invitations/${project.author.id}`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '5px' }}>
            <div className="imgContPost">
              <img src={ (project.author.image == '') ? profile : authorImage } alt="User" />
            </div>
            <span className="name">{`${project.author.username}`}</span>
          </div>
          </Link>
          <span className="proName">{project.name}</span>
          <span className="proCat">{project.category}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
