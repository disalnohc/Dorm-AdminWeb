import React from "react"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = () => {
  return (
    <>
      <section className='blog-out mb'>
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

export default Recent
