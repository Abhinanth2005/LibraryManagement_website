import React from 'react'

const Contacts = () => {
  return (
    <div>
    
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="mb-3 text-center">Contact Us</h3>

              <form>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>

                <button className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

          </div>
        
  )
}

export default Contacts
