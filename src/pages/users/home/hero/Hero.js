import React from "react"
import "./hero.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div class="flex-container">
            <p>Welcome to Dorm</p>
            <text className="ip">There are many variations of the passages of Lorem Ipsum available, variations of the passages.</text>
          </div>

          <form className='flex' style={{ flexDirection: 'row' }}>
            <div className='box'>
              <span>City/Street</span>
              <input type='text' placeholder='Location' />
            </div>
            <div className='box'>
              <span>Property Type</span>
              <input type='text' placeholder='Property Type' />
            </div>
            <div className='box'>
              <span>Price Range</span>
              <input type='text' placeholder='Price Range' />
            </div>
            <div className='box'>
              <h4>Advance Filter</h4>
            </div>
            <button className='btn1'>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
