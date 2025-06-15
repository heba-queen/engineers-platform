import React from 'react'
import proj1 from '../assets/img/Rectangle 12 (1).png'
import proj2 from '../assets/img/Rectangle 13.png'
import proj3 from '../assets/img/Rectangle 14.png'
import proj4 from '../assets/img/Rectangle 15.png'
import proj5 from '../assets/img/Rectangle 12.png'
import proj6 from '../assets/img/Rectangle 13d.png'
import proj7 from '../assets/img/Rectangle 14 ui.png'
import proj8 from '../assets/img/Rectangle 15l.png'
import CategoryItem from './CategoryItem'


const Category = () => {
  return (
    <section className="Project_Department">
        <div className="text-center my-4">
            <span className="title">Project Department</span>
        </div>
        <div className="container">
            <div className="row">
                <CategoryItem img={proj1} title={'Architectural & Construction'} link={'/projects?cat=Architectural & Construction'} />
                <CategoryItem img={proj2} title={'Artificial Intelligence'} link={'/projects?cat=Artificial Intelligence'} />
                <CategoryItem img={proj3} title={'App & Web Programming'} link={'/projects?cat=App & Web Programming'} />
                <CategoryItem img={proj4} title={'Interior Design'} link={'/projects?cat=Interior Design'} />
            </div>
            <div className="row">
                <CategoryItem img={proj5} title={'Mechanical'} link={'/projects?cat=Mechanical'} />
                <CategoryItem img={proj6} title={'Electronic'} link={'/projects?cat=Electronic'} />
                <CategoryItem img={proj7} title={'UI\UX & Graphic Design'} link={'/projects?cat=UI\UX & Graphic Design'} />
                <CategoryItem img={proj8} title={'Electrical'} link={'/projects?cat=Electrical'} />
            </div>
        </div>
    </section>
  )
}

export default Category