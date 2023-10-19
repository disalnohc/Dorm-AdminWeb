import React from "react"
import "./contact.css"

const Contact = () => {
  return (
    <>
      <section className='contact'>
        <div className='container-contact'>
          <h1>Contact Us</h1>
          <p>It is a long established fact that a reader will be distracted by the of readable content of a page when lookings at its layouts the points of using.</p>
          <form className='shadow'>
            <h4>Fillup The Form</h4> <br />
            <div>
              <input type='text' placeholder='Name' className="contact-input" />
              <input type='text' placeholder='Email' className="contact-input" />
            </div>
            <input type='text' placeholder='Subject' className="contact-subject" />
            <button>Submit Request</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
