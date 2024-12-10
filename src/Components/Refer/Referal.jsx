import React,{ useState } from "react";
import "./refer.css"
import banner1 from '../../Assets/Img/bg/refer-upside.png';
import banner2 from '../../Assets/Img/bg/refer-downside.png';
import starimg from '../../Assets/Img/bg/StarFour.png';
import groupimg from '../../Assets/Img/bg/DeWatermark 21.jpg';
import regimg from '../../Assets/Img/bg/Group 34.png';
import subitimg from '../../Assets/Img/bg/Group 35.png';
import shareimg from '../../Assets/Img/bg/Group 48095507.png';
import lineimg from '../../Assets/Img/bg/Vector 5.png';
import { IoCopyOutline } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { FaSquareFull } from "react-icons/fa";

const Referal=()=>{
    const [copiedText, setCopiedText] = useState(null);
    const dashes = Array(95).fill('_').join(' ');

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    };
    return(
        <>
          <div className="title_section">
             <div className="Referal-baner">
                <img src={banner1} height="50%"  className="banner_img1" alt="" />
                <img src={banner2} height="50%"  className="banner_img2" alt="" />
             </div>
             <div className="title_content">
                 <div className="content">
                   <h1>Refer a traveler to Bilkins</h1>
                   <p className="desc_cont">Refer a traveler to Bilkins and you both can earn up to $600! Get $100 when your referral registers and submits their first application, plus $500 when they complete their first assignment. Join Bilkins today and start earning with our rewarding referral program</p>
                   <button>Register</button>
                   <h4 className="content_login">Have an account?  <span style={{color:'#CE1B28'}}>Login Now</span></h4>
                   <p className="terms_condition">Referral Program Terms and Conditions</p>
                 </div>
                 <div className="img_content">
                    <div>
                        <img src={starimg} alt="" />
                    </div>
                    <div>
                        <img src={groupimg} style={{borderRadius:"30px",overflow:"hidden"}} alt="" />
                    </div>
                 </div>
             </div>
          </div>
          <div className="how_it_work_cont">
              <h1 style={{textAlign:"center",fontWeight:'800',color:'#CE1B28'}}>How It Works</h1>
              <h4 style={{fontSize:'17px',textAlign:'center',color:'gray'}}>Register and browse the job select and your dream job is Ready!</h4>
              <div className="list_of_howitworks">
                <div className="img_list_howitwork">
                 <img src={regimg} alt="" />
                 <img src={lineimg} alt="" />
                 <img src={subitimg} alt="" />
                 <img src={lineimg} alt="" />
                 <img src={shareimg} alt="" />
                </div>
                <div className="cont_list_howitwork">
                    <div style={{width:'25%'}}>
                        <h1 style={{textAlign:'center',fontSize:'20px',fontWeight:'bold',padding:'20px'}}>1.Register</h1>
                        <p style={{textAlign:'center',fontSize:'13px',color:'gray'}}>Register with Bilkins then invite a friend to join with your unique link</p>
                    </div>
                    <div style={{width:'25%'}}>
                        <h1 style={{textAlign:'center',fontSize:'20px',fontWeight:'bold',padding:'20px'}}>2.Submit</h1>
                        <p style={{textAlign:'center',fontSize:'13px',color:'gray'}}>Once they've applied and had their first application packet submitted, you each get $100. That's a win for you, and a win for them!</p>
                    </div>
                    <div style={{width:'25%'}}>
                        <h1 style={{textAlign:'center',fontSize:'20px',fontWeight:'bold',padding:'20px'}}>3.Share and Earn</h1>
                        <p style={{textAlign:'center',fontSize:'13px',color:'gray'}}>After they complete their first assignment with Nomad Health, you each get an additional $500. That's a total of $600 for you, and $600 for your friend</p>
                    </div>

                </div>
              </div>
          </div>
          <h3 style={{fontSize:'19px',fontWeight:'800',padding:'0px 235px',marginTop:'8vh'}}>Share your link with Friends!</h3>
          <div className="share_your_link_list">
              <div className="link_list_for_share" >
                <div>
                    <div className="refer_copyLink">
                      <span style={{fontSize:'15px',padding:'0px 20px'}}>https://wwm.bilkins.aji-ref=nabagdj</span>
                      <button 
                       style={{
                        backgroundColor:'#CE1B28',
                        height:'100%',
                        border:'none',
                        borderRadius:'5px',
                        width:'100px'
                       }} 
                       onClick={() =>
                        copyToClipboard("https://wwm.bilkins.aji-ref=nabagdj")
                       }
                       >
                      <IoCopyOutline style={{color:'white'}} />
                      {copiedText === "https://wwm.bilkins.aji-ref=nabagdj" ? <span style={{color:'white',marginLeft:'5px'}}>copied</span> : <span style={{color:'white',marginLeft:'5px'}}>copy</span> }
                      </button> 
                    </div>
                </div>
                <button className="twitter_button">
                    <FaXTwitter style={{color:'white'}} />
                    <span style={{color:'white'}}>Share On Twitter</span>
                </button>
                <button className="facebook_button">
                    <FaFacebookF style={{color:'white'}} />
                    <span style={{color:'white'}}>Share On Facebook</span>
                </button>
                <button className="more_option">
                <IoIosMore style={{color:'#CE1B28',fontSize:'30px'}}/>
                </button>
              </div>
          </div>
          <div className="refer_a_friend">
               <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'5px'}}> <FaSquareFull style={{color:'#CE1B28',fontSize:'10divx'}} /> <span>Fill Form</span></div>
               <h3 style={{fontWeight:'700',textAlign:'center'}}>Refer a Friends</h3>
               <div className="input_list_refer_friend">
                   <input style={{width:'400px',padding:'10px 20px',borderRadius:'5px',border:'1px solid gray',backgroundColor:'#FAFAFA'}} type="text" placeholder="Enter Name" />
                   <input style={{width:'400px',padding:'10px 20px',borderRadius:'5px',border:'1px solid gray',backgroundColor:'#FAFAFA'}} type="text" placeholder="Email Address" />
                   <button className="invitation_button">Invitation</button>
               </div>
          </div>
          <div>
            <h3 style={{textAlign:'center',fontWeight:'900',color:'gray',marginTop:'10vh'}}>Hurry Up!</h3>
            <h1 style={{fontWeight:'bold',color:'#CE1B28',padding:'0px 150px'}}>Register Now</h1>
            <h3 style={{fontWeight:'900',color:'gray',marginTop:'10vh',padding:'0px 150px'}}>Bonus Terms </h3>
            <hr style={{ borderTop: '1px dashed #000' }}/>
            {/* {dashes} */}
            <h4 style={{color:'#CE1B28',fontSize:'17px',fontWeight:'600',padding:'10px 150px',marginTop:'20px'}}>“Referral” Bonus Terms and Eligibility</h4>
            <p style={{padding:'0px 150px'}}>*This offer may be changed or terminated at any time. Earn a $100 Referral Bonus when someone you refer (a “Referred”) (1) registers as a new member between 12:01 AM ET on May 30, 2023, and 11:59 PM ET on June 30, 2024 (“Offer Period”) using your referral link or another method provided by Nomad Health, and (2) submits a new application to a facility within 30 days of registering. The Referred must be a new user to Nomad Health and must not have previously submitted a packet or completed an assignment. You can earn a Referral Bonus only once for each new member you refer.</p>
            <h4 style={{color:'#CE1B28',fontSize:'17px',fontWeight:'600',padding:'10px 150px',marginTop:'20px'}}>Referral Completed Assignment Bonus Terms and Eligibility</h4>
            <p style={{padding:'0px 150px'}}>*This offer may be changed or terminated at any time. Earn a $500 Referral “Completed Assignment” Bonus when your referral successfully completes their first assignment within one year of their registration date. You can earn this bonus only once for each referred member.</p>
            <p style={{padding:'10px 150px'}}>Both you and your referrals must reside in the 50 United States or the District of Columbia and adhere to the Refer-A-Friend Program Terms. Referral Bonuses will be added to your next payment, provided your referrals are deemed Qualified Referrals according to the program terms. A referral will not qualify if their application is deemed fraudulent, abusive, unethical, suspicious, or otherwise not in compliance with our Refer-A-Friend Program Terms.</p>
          </div>

          
        </>
    )
}
export default Referal;