import React from "react";
import ContactIcon4 from "../../Assets/Img/other-logos/contact-icon-4.png";
import Animate from "../Animation/Animate";


const ContactLocation = () => {
  return (
    <div className="container py-5">
      <div className="row text-center">
        <div className="title-location-card">
          <Animate>
          <h1>Office Locations</h1>
          </Animate>
          
          <p>United States of America</p>
        </div>
      </div>
      <div className="row mt-5">
        
        <div className="mb-4 col-lg-4">
           <div className="cardLocationBody">
             <img className="locationImg" src={ContactIcon4} alt=".." />
             <div className="cardLocation-content">
               <h2>Virginia</h2>
               <p>
               44031 Pipleline Plaza Suite <br/>300 Ashburn VA 20147
               </p>
             </div>
           </div>
        </div>
        <div className="mb-4 col-lg-4">
           <div className="cardLocationBody">
             <img className="locationImg" src={ContactIcon4} alt=".." />
             <div className="cardLocation-content">
               <h2>Maine </h2>
               <p>
               62 PORTLAND RD, STE 25A, <br/> KENNEBUNK, ME 04043
               </p>
             </div>
           </div>
        </div>
        <div className="mb-4 col-lg-4">
           <div className="cardLocationBody">
             <img className="locationImg" src={ContactIcon4} alt=".." />
             <div className="cardLocation-content">
               <h2>New Jersey </h2>
               <p>
               Five Greentree Centre, 525 Route <br/> 73 North STE 104, Marlton, NJ 08053
               </p>
             </div>
           </div>
        </div>
        <div className="mb-4 col-lg-4">
           <div className="cardLocationBody">
             <img className="locationImg" src={ContactIcon4} alt=".." />
             <div className="cardLocation-content">
               <h2>Florida </h2>
               <p>
               7901 4th St N STE 300 <br/> St. Petersburg, FL 33702
               </p>
             </div>
           </div>
        </div>
        <div className="mb-4 col-lg-4">
           <div className="cardLocationBody">
             <img className="locationImg" src={ContactIcon4} alt=".." />
             <div className="cardLocation-content">
               <h2>Ohio </h2>
               <p>
               6545 Market Ave. North STE <br/> 100 North Canton, OH 44721
               </p>
             </div>
           </div>
        </div>
        <div className="mb-4 col-lg-4">
           <div className="cardLocationBody">
             <img className="locationImg" src={ContactIcon4} alt=".." />
             <div className="cardLocation-content">
               <h2>New York </h2>
               <p>
               418 Broadway, STE R, <br/> Albany, NY 12207
               </p>
             </div>
           </div>
        </div>
        <div className="mb-4 col-lg-4">
           <div className="cardLocationBody">
             <img className="locationImg" src={ContactIcon4} alt=".." />
             <div className="cardLocation-content">
               <h2>Oregon </h2>
               <p>
               2355 STATE ST STE 101 SALEM, OR 97301
               </p>
             </div>
           </div>
        </div>
        <div className="mb-4 col-lg-4">
           <div className="cardLocationBody">
             <img className="locationImg" src={ContactIcon4} alt=".." />
             <div className="cardLocation-content">
               <h2>Delaware </h2>
               <p>
               8 The Green STE R Dover, DE 19901
               </p>
             </div>
           </div>
        </div>
        
      </div>
      <div className="map">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3099.738051114962!2d-77.48026352424466!3d39.02128857169784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b63ed73f1b4975%3A0x41b21c46efa2f77a!2s44031%20Pipeline%20Plaza%20STE%20300%2C%20Ashburn%2C%20VA%2020147%2C%20USA!5e0!3m2!1sen!2sin!4v1710932976289!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="embed-responsive-item google-map"
          style={{ width: "100%" }}
        ></iframe>
      </div>
    </div>
  );
};


export default ContactLocation;