import React from "react"
import Back from "../common/Back"
import RecentCard from "../home/recent/RecentCard"
import "../home/recent/recent.css"
import img from "../images/about.jpg"

const Booking = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Book A Room' title='Book a Room - Our Rooms' cover={img} />
        <div className="container-blog">
          <h1>Book A Room</h1>
          <p>It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.</p>
          </div>
        <div className='container recent'>
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Booking
