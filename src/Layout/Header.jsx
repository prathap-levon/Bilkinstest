import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/Img/logos/bilkins-logo.png";
import dropdown from "../Assets/Img/icons/dropdown-header.png";
import home from "../Assets/Img/icons/homeIcon.png"
import about from "../Assets/Img/icons/globe.png"
import career from "../Assets/Img/icons/icons8-user-20.png"
import contact from "../Assets/Img/icons/icons8-phone-20.png"
import hiring from "../Assets/Img/icons/icons8-hiring-20.png"
import Instance from "../AxiosConfig";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [alliedJobsCount, setAlliedJobsCount] = useState(0);
  const [nursingJobsCount, setNursingJobsCount] = useState(0);
  const loggedInUserInfo = JSON.parse(localStorage.getItem('loggedInUserInfo'));

  const checkToken = async () => {
    try {
      const response = await Instance.get('/validateToken', {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        }
      });
      if (response.status === 200) {
        setIsLogin(true);
      }
    } catch (error) {
      // No token present means login is required
    }
  }

  const fetchJobCount = async () => {
    try {
      const response = await Instance.get('/getAllJobs');
      if (response.status === 200) {
        let data = response?.data?.jobs;
        if (data) {
          let nCnt = data?.filter((item) => item.jobCategory === 'Nursing Jobs' && item.jobStatus === 'Open');
          setNursingJobsCount(nCnt?.length);

          let aCnt = data?.filter((item) => item.jobCategory === 'Allied Jobs' && item.jobStatus === 'Open');
          setAlliedJobsCount(aCnt?.length);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchJobCount();
    checkToken();
  }, [])


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const closeDropdownOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeDropdownOnEscape);

    return () => {
      document.removeEventListener("keydown", closeDropdownOnEscape);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="header">
        <nav className="navbar justify-content-between navbar-expand-lg bg-body-white">
          <div className="container container-fluid">
            <div className="col-md-3 d-flex justify-content-between col-sm-12 col-xs-12" id="col-md-3">
              <Link className="navbar-brand" to="/">
                <img src={logo} alt="logo" />
              </Link>
              <button
                className="header-dropdown nav-item dropdown"
                onClick={toggleMenu}
                style={{ display: isMobile ? "block" : "none" }}
              >
                <img src={dropdown} alt=".." />
              </button>
              <div
                ref={dropdownRef}
                className={`overlay-menu ${isMenuOpen ? "open" : ""}`}
              >
                <ul>
                  <Link className="sidebar-navbar-brand" to="/">
                    <img src={logo} alt="logo" />
                  </Link>
                  <li >
                    <img src={home} alt=".." />
                    <Link to="/" onClick={handleMenuLinkClick}>Home</Link>
                  </li>
                  <li>
                    <img src={about} alt=".." />
                    <Link to="/about" onClick={handleMenuLinkClick}>About Us</Link>
                  </li>
                  <li>
                    <img src={hiring} alt=".." />
                    <Link to="/location" onClick={handleMenuLinkClick}>Locations</Link>
                  </li>
                  <li>
                    <img src={career} alt=".." />
                    <Link to="/career" onClick={handleMenuLinkClick}>Careers</Link>
                  </li>
                  <li>
                    <img src={contact} alt=".." />
                    <Link to="/contact" onClick={handleMenuLinkClick}>Contact Us</Link>
                  </li>
                  {/* {!isLogin && <div className="col-md-4 mt-4 d-flex  align-items-center">
                    <div className="col-md-4 d-flex  align-items-center">
                      <button onClick={() => navigate("/user/signup")} className="btn-log-in" type="submit">
                        Join Us
                      </button>
                    </div>
                    <button onClick={() => navigate('/user/login')} className="btn-log-in mx-0" type="submit">
                      Login
                    </button>
                  </div>}
                  {isLogin && <div className="col-md-4 mt-4 d-flex  align-items-center">
                    <button onClick={() => {
                      navigate('/user/applied-jobs');
                    }} className="btn-log-in mx-0" type="submit">
                      Dashboard
                    </button>
                  </div>} */}
                </ul>
                <button className="close-dropdown" onClick={() => setIsMenuOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#ce1b28"
                    fill="#ce1b28"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Header Main */}
            <div className="collapse navbar-collapse col-md-9 justify-content-end" id="navbarBilkins" >
              <ul className="navbar-nav justify-content-end  mb-2 mb-lg-0 align-items-center d-flex">
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    aria-expanded="false"
                  >
                    Nursing Jobs
                  </a>
                  <div className="dropdown-menu allied-jobs">
                    <div className="row">
                      <div className="col-12 header-buttons-div">
                        <div className="d-flex gap-3">
                          <button className="header-dropdown-button align-items-center">
                            {nursingJobsCount} jobs available
                          </button>
                          <div className="align-items-center">
                            <span>Nursing Jobs</span>
                            <br />
                            <a href={`/search-jobs?jobtitle=${encodeURIComponent("Nursing Jobs")}&location=`}>View Nursing Jobs</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    //  href="/" 
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Allied Jobs
                  </a>
                  <div className="dropdown-menu allied-jobs">
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex gap-3">
                          <button className="header-dropdown-button align-items-center">
                            {alliedJobsCount} jobs available
                          </button>
                          <div className="align-items-center">
                            <span>Allied Jobs</span>
                            <br />
                            <a href={`/search-jobs?jobtitle=${encodeURIComponent("Allied Jobs")}&location=`}>View Allied Jobs</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    // href="/" 
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Benefits & Pay
                  </a>
                  <div className="dropdown-menu benefits">
                    <div className="row">
                      <div className="col-lg-6">
                        <ul className="list-unstyled">
                          <li><a href="/weekly-pay" className="dropdown-item">Weekly Pay
                          </a></li>
                          <li><a href="/sick-leave" className="dropdown-item" >Sick Leaves
                          </a></li>
                          <li><a href="/holiday" className="dropdown-item" >Holidays
                          </a></li>
                          <li><a href="/short-term" className="dropdown-item" >Short-term Disability Insurance
                          </a></li>
                          <li><a href="/travel" className="dropdown-item" >Travel Reimbursement
                          </a></li>
                        </ul>
                      </div>
                      <div className="col-lg-6">
                        <ul className="list-unstyled">
                          <li><a href="/referal-bonus" className="dropdown-item" >Referal Bonus
                          </a></li>
                          <li><a href="/housing" className="dropdown-item" >Housing
                          </a></li>
                          <li><a href="/education" className="dropdown-item" >Continuous Education
                          </a></li>
                          <li><a href="/employees" className="dropdown-item" >Employee Assistance Pay
                          </a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="navbar-nav">
                <div className="header-buttons">
                  {/* {!isLogin &&
                    <>
                      <button onClick={() => navigate("/user/signup")} className="btn-log-in" type="submit">
                        Join Us
                      </button>
                      <button onClick={() => navigate('/user/login')} className="btn-sign-up" type="submit">
                        Login
                      </button>
                    </>}
                  {isLogin &&
                    <button onClick={() => {
                      navigate('/user/applied-jobs');
                    }} className="btn-log-in mx-0" type="submit">
                      Dashboard
                    </button>
                  } */}
                  <button className="header-dropdown nav-item dropdown" onClick={toggleMenu}>
                    <img src={dropdown} alt=".." />
                  </button>
                  <div ref={dropdownRef} className={`overlay-menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                      <Link className="sidebar-navbar-brand" to="/">
                        <img src={logo} alt="logo" />
                      </Link>
                      <li >
                        <img src={home} alt=".." />
                        <Link to="/" onClick={handleMenuLinkClick}>Home</Link>
                      </li>
                      <li>
                        <img src={about} alt=".." />
                        <Link to="/about" onClick={handleMenuLinkClick}>About Us</Link>
                      </li>
                      <li>
                        <img src={hiring} alt=".." />
                        <Link to="/location" onClick={handleMenuLinkClick}>Locations</Link>
                      </li>
                      <li>
                        <img src={career} alt=".." />
                        <Link to="/career" onClick={handleMenuLinkClick}>Careers</Link>
                      </li>
                      <li>
                        <img src={contact} alt=".." />
                        <Link to="/contact" onClick={handleMenuLinkClick}>Contact Us</Link>
                      </li>
                    </ul>
                    <button className="close-dropdown" onClick={() => setIsMenuOpen(false)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-x"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ce1b28"
                        fill="#ce1b28"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
