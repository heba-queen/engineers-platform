import React from 'react'
import FeatureItem from './FeatureItem'
import feature1 from '../assets/img/bi_intersect.png'
import feature2 from '../assets/img/arcticons_canada-post.png'
import feature3 from '../assets/img/cib_f-secure.png'
import lamp from '../assets/img/Engineer & our Platform.png'
import dot from '../assets/img/dot.svg'
import right from '../assets/img/Right.png'

const Features = () => {
  return (
    <section className="Our_Features">
        <div className="text-center my-4">
            <span className="title">Our Features</span>
        </div>
        <div className="container">
            <div className="row">
                <FeatureItem img={feature1} title={'comprehensive'} body={'Various Engineers Specializations'}/>
                <FeatureItem img={feature2} title={'Add your Post'} body={'You can add what you want as a post'}/>
                <FeatureItem img={feature3} title={'Trusted'} body={'Secure to publish and implement projects'}/>
            </div>
        </div>
        <div className="sectionFoter">
            <div className="container">
                <div className="row">
                    <div className="col-md-8" style={{"display": "flex", "align-items": "center !important"}}>
                        <div style={{"display": "flex", "flex-direction": "column", "align-items":"flex-start","justify-content": "center"}}>
                            <div style={{"width":"300px"}}>
                                <img style={{"width": "100%", "marginBottom": "10px"}} src={lamp}/>
                            </div>
                            <ul className="sectionFoterUl">
                                <li classNameName='liFeatures'><img
                                        width="25px" style={{"paddingTop": "5px"}}
                                        src={dot} /><span> Engineers
                                        Forum.</span></li>
                                <li classNameName='liFeatures'><img
                                        width="25px" style={{"paddingTop": "5px"}}
                                        src={dot} /><span> Safe platform to
                                        deliver your experiences.</span></li>
                                <li classNameName='liFeatures'><img
                                        width="25px" style={{"paddingTop": "5px"}}
                                        src={dot}  /><span> Add your project, with
                                        a full description.</span></li>
                                <li classNameName='liFeatures'><img
                                        width="25px" style={{"paddingTop": "5px"}}
                                        src={dot} /><span> Receiving various
                                        offers from investment owners.</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4 limpImg">
                        <div style={{"width": "220px;"}}>
                            <img style={{"width": "100%"}} src={right}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features