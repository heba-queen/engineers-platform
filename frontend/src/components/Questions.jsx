import React from 'react'
import QuestionItem from './QuestionItem'

const Questions = () => {
  return (
    <section className="Project_Department">
        <div className="text-center my-4">
            <span className="title">Common Questions</span>
        </div>
        <div className="container">
            <div className="contener">
                <QuestionItem num={'1'} que={'What about Property Right Protection Platform?'} ans={'Property Right Protection Platform is a platform for engineering projects that allows you to have a lot of engineering ideas to invest in, in addition to being a forum for engineers to deliver their projects in various disciplines.'} />
                <QuestionItem num={'2'} que={'How to use Property Right Protection Platform?'} ans={'Property Right Protection Platform provides all the creative and professional services you need to grow and develop your business, which can be requested from talented people who are ready to serve you in accomplishing your tasks easily via the Internet and at economical prices commensurate with individuals and entrepreneurs with emerging projects.'} />
                <QuestionItem num={'3'} que={'What if I am not satisfied with the service I receive?'} ans={'Property Right Protection Platform fully guarantees your rights. Be assured when buying any service offered on the site. Our platform acts as a mediator between the buyer and seller and protects the financial rights of both parties.'} />
                <QuestionItem num={'4'} que={'How does the platform guarantee my rights?'} ans={'In the event that you are not satisfied with the service, you can simply cancel the request.'} />
            </div>
        </div>
    </section>
  )
}

export default Questions