import React from "react"
import Awards from "./awards/Awards"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import Recent from "./recent/Recent"
import Team from "./team/Team"
import Contact from "../contact/Contact"
import Blog from "./blog/Blog"
import Channel from "./channel/Channel"
import Calendar from "./calendar/calendar"

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Recent />
      <Awards />
      <Team />
      <Blog />
      <Channel />
      <Calendar />
      <Contact />
    </>
  )
}

export default Home
