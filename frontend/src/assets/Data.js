import proj1 from '../assets/img/proj.jpeg'
import proj2 from '../assets/img/Imaaage.jpg'
import proj3 from '../assets/img/ccc.png'
import prof1 from '../assets/img/Ellipse 3.png'
import prof2 from '../assets/img/Ellipse 4.png'
import prof3 from '../assets/img/dsdsds.png'

import project11 from '../assets/img/project/image1715027676.png'
import project12 from '../assets/img/project/image11715027676.png'
import project13 from '../assets/img/project/image21715027676.png'

import project21 from '../assets/img/project/image1715029276.jpeg'
import project22 from '../assets/img/project/image11715029276.jpeg'
import project23 from '../assets/img/project/image21715029276.jpeg'

import project31 from '../assets/img/project/image1715032831.jpg'
import project32 from '../assets/img/project/image11715032831.jpg'
import project33 from '../assets/img/project/image21715032831.jpg'


import project41 from '../assets/img/project/image1715032946.jpg'
import project42 from '../assets/img/project/image11715032946.jpg'
import project43 from '../assets/img/project/image21715032946.jpg'

import project51 from '../assets/img/project/image1715034848.png'
import project52 from '../assets/img/project/image11715034848.jpg'
import project53 from '../assets/img/project/image21715034848.png'

import project61 from '../assets/img/project/image1715034929.jpg'
import project62 from '../assets/img/project/image11715034929.jpg'
import project63 from '../assets/img/project/image21715034929.jpg'


import user1 from '../assets/img/user_img/1715030988.png';
import user2 from '../assets/img/user_img/1715027461.png';
import user3 from '../assets/img/user_img/1715027378.png';

export const projectsData = [
    {
        id: '1',
        projImg: [project11 , project12 , project13],
        profImg: user1,
        name: 'Reem Al-shair',
        title: 'PRP Website',
        category: 'App & Web Developer',
        desc: 'PRP is a project to support newly created projects, and invest in new startup companies by supporting them financialy and mentoring',
        userId : '1',
        license : 'MIT License'
    },
    {
        id : '2',
        projImg: [project21 , project22 , project23],
        profImg: user2,
        name: 'Ahmed Al-ahmed',
        title: 'Face Detection',
        category: 'Artificial Intelligence',
        desc: 'Face Detection Project helps companies to identify thei employers entering and exiting time based on their face without their interaction, there are no need for idetity cards any more',
        userId : '2',
        license : 'Apache License'
    },
    {
        id : '3',
        projImg: [project31 , project32 , project33],
        profImg: user1,
        name: 'Reem Al-shair',
        title: 'Connect brain to computer',
        category: 'Artificial Intelligence',
        desc: 'The project is a chipset that can be connect to the human brain and optain information about brain which will provide the brain with signals to make the right desigion',
        userId : '1',
        license : 'GNU Public License'
    },
    {
        id : '4',
        projImg: [project41 , project42 , project43],
        profImg: user1,
        name: 'Reem Al-shair',
        title: 'AI Artist',
        category: 'UI/UX Graphic Design',
        desc: 'AI Artist is a website uses artifical intelligence to draw creative images that any graphic designer can use it and update to it',
        userId : '1',
        license : 'GNU Public License'
    },


    {
        id : '5',
        projImg: [project51 , project52 , project53],
        profImg: user2,
        name: 'Ahmed Al-ahmed',
        title: 'Saudi Arabia Search engine',
        category: 'App & Web Developer',
        desc: 'New Search engine espacially for Saudi Arabia users',
        userId : '2',
        license : 'GNU Public License'
    },

    {
        id : '6',
        projImg: [project61 , project62 , project63],
        profImg: user2,
        name: 'Ahmed Al-ahmed',
        title: 'Noon architictal design',
        category: 'Architectural & Construction',
        desc: 'New Designs that can be added to devlop Noon Island',
        userId : '2',
        license : 'GNU Public License'
    },
]

export const PostData = [

{
    id : '1',
    userImage : user3,
    userName : 'noon@info.com',
    date : '15.01.2025',
    desc : 'I am looking for a developers team can make New Saudi Amazon',
    category : "App & Web Developer",
    image :proj1,
},



];


export const Users = [
    {
        id : '1',
        userName : 'Reem Al-shair',
        email : 'reem@gmail.com',
        age : '34',
        number : '1234',
        country : 'Syria',
        job  : 'Web developer',
        image : user1,
        type : '2'
    },

    {
        id : '2',
        userName : 'ahmed al-ahmed',
        email : 'ahmed@gmail.com',
        age : '24',
        number : '1234',
        country : 'America',
        job  : 'Web Developer',
        image : user2,
        type : '2'
    },
    {
        id : '3',
        userName : 'Noon Company',
        email : 'info@noon.com',
        age : '14',
        number : '1234',
        country : 'Saudi Arabia',
        job  : 'Investor',
        image : user3,
        type : '1'
    },
    
];


export const Invitations = [
    {
        id : '1',
        userId : '1',
        companyId : '3',
        projectId : '1',
        date : '15.01.2024',
        desc : 'Invitaion sent , follow the link to check the project'
    },
    {
        id : '1',
        userId : '1',
        companyId : '3',
        projectId : '1',
        date : '15.01.2024',
        desc : 'Invitaion sent , follow the link to check the project'
    },
    {
        id : '1',
        userId : '1',
        companyId : '3',
        projectId : '1',
        date : '15.01.2024',
        desc : 'Invitaion sent , follow the link to check the project'
    },
]