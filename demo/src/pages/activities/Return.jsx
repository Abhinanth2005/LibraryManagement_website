import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Return(){
  const navigate2 = useNavigate();
  const [cname, setNamec] = useState("")

  const [cemail, setEmailc] = useState("")
  const [cadd, setAddc] = useState("")

  const [cerror, setErrorc] = useState("")
  const [cemailerror, setEmailErrorc] = useState("")
  const [cadderror, setAddErrorc] = useState("")
  const submitform = (e) => {
    e.preventDefault()
    var isValid = true;

    if (cname.trim() === "") {
      setErrorc("enter name please")
      isValid = false;
    }
    else if (!cname.match(/^[a-zA-Z]/)) {
      setErrorc("enter a valid name")
      isValid = false;
    }
    if (cemail.trim() === "") {
      setEmailErrorc("enter  email")
      isValid = false;
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(cemail)) {
      setEmailErrorc("enter a valid email")
      isValid = false;
    }
    if(cadd.trim() ===""){
      setAddErrorc("please enter the address")
    }
    if (isValid){
      alert("Message sended successfully")
      // form.current.reset()
    }
  }
  return(<div>

      
    <div class="container min-vh-90 mt-5 pb-5">
      <div class="row g-3">
        <div class="col-6">
          <h2 class="section-title fw-bold text-dark">Contact</h2>
          <p class="section-sub fst-italic">Have a question or concern? <br />
          we'd love to hear from you. please fill out the form below and we'll get back to you as soon as possible. </p>
          <form className="contact-form" onSubmit={submitform} >
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-primary fs-5 fw-bold" for="name" >Name</label>
                <input className="form-control border-dark " required placeholder="enter your name" value={cname} onChange={(e)=>{setNamec(e.target.value)}} />
                <p className="text-danger">{cerror}</p>
              
              </div>
              <div className="col-md-6">
                <label className="form-label text-primary fs-5 fw-bold" for="email">Email</label>
                <input  type="email"  required className="form-control border-dark" placeholder="enter your email"  value={cemail} onChange={(e)=>{setEmailc(e.target.value)}} />
                
                <p className="text-danger">{cemailerror}</p>
                
              </div>
              <div className="col-12">
                <label className="form-label text-primary fs-5 fw-bold" for="message">Message</label>
                <textarea rows="4" className="form-control border-dark" 
                  placeholder="enter your message..." required  value={cadd} onChange={(e)=>{setAddc(e.target.value)}}></textarea>
                  <p className="text-danger">{cadderror}</p>
                  
                
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">Send Message</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-6 ms-auto">
          <div className="p-4 rounded-4 bg-light h-100 ms-5 mb-4 ">
            <h2 className="mb-3 ms-5 mt-4  ">Contact us</h2>
            <ul className="list-unstyled  mb-4 ms-5 mt-4 ">
              <li>1800-266-2345</li>
              <li className="fst-italic">customercare@mybooks.co.in</li>
              <li className="fst-italic">Help & contact</li>
              <li className="fst-italic">FAQs</li>
            </ul>
            <h3 className="mb-2 mt-2 ms-5 ">Find us</h3>
            <p className=" mb-1 ms-5 fst-italic">12 city road,Hamburg, IN</p>
            <p className="mb-3 mb-lg-4 ms-5 fst-italic">Call: +91 5566778899</p>
            <div className="d-flex gap-2 ms-5 fst-italic">

            </div>
          </div>
        </div>
      </div>
    </div>
  <div className="d-flex justify-content-end"><button className="btn btn-outline-danger me-5" onClick={()=>{navigate2('/activities')}}>Back</button></div>
  
  </div>)
  
}


