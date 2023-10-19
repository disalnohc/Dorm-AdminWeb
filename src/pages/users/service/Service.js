import React from "react"
import img from "../images/services.jpg"
import Back from "../common/Back"
import "../home/featured/Featured.css"
import ServiceCard from "./ServiceCard"

const Service = () => {
  return (
    <>
      <section className='services mb'>
        <Back name='Services' title='Services -All Services' cover={img} />
        <div className="container-blog">
          <h1>Services</h1>
          <p>It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.</p>
          </div>
          <ServiceCard />
      </section>
    </>
  )
}

export default Service
