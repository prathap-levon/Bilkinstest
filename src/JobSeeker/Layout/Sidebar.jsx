import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./layout.css";
import logo from "../Assets/Images/logo.png";
import {
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { FaHandHolding, FaRegHeart, FaSave } from "react-icons/fa";
import { IoBagRemove, IoMenu, IoSettingsOutline } from "react-icons/io5";
import { IoMdClose, IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiMessage2Line } from "react-icons/ri";
import { TbMoneybag } from "react-icons/tb";
import Swal from "sweetalert2";
import logoutImg from "../Assets/Images/logoutimg.jpg";

function Sidebar({onCollapseToggle}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const handlelogout = () => {
    Swal.fire({
      imageUrl: logoutImg,
      imageWidth: "160px",
      title:
        'Are you sure You want to <span style="color: var(--maroon-color);">Logout?</span>',
      showCancelButton: true,
      confirmButtonColor: "#555",
      cancelButtonColor: "#ce1b28",
      confirmButtonText: "Yes, logout me!",
      customClass: {
        title: "swal-title",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("loggedInUserInfo");
        navigate("/user/login");
      }
    });
  };

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapseToggle(newCollapsedState); // Notify parent component
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div
        className="toggle-btn"
        onClick={toggleSidebar}
      >
        <FiMenu size={26}/>
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`}>
        <aside className={`sidebar-content ${isSidebarOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`}>
          {isSidebarOpen && (
            <div className="overlay overlay-open" onClick={closeSidebar}></div>
          )}
          
          <div className="sidebar-header d-flex justify-content-between align-items-center">
            
            {!isCollapsed && (
             <img style={{ cursor: "pointer" }} src={logo} alt="BILKINS" />
            )}
             <button className="collapse-btn" onClick={toggleCollapse}>
              {isCollapsed ? <IoMenu /> : <IoMdClose />}
            </button>
            {isSidebarOpen && (
            <div className="close-icon" onClick={closeSidebar}>
              <FiX size={26} />
            </div>
          )}
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <Link
                  to="/"
                  className={`nav-link ${
                    location.pathname === "/" ? "active-nav-links" : ""
                  }`}
                >
                  <FiHome className="sidebar-icon" />{!isCollapsed && "Home"}
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/user/dashboard"
                  className={`nav-link ${
                    location.pathname === "/user/dashboard"
                      ? "active-nav-links"
                      : ""
                  }`}
                >
                  <FiGrid className="sidebar-icon" /> {!isCollapsed && "Dashboard"}
                </Link>
              </li> */}
              <li>
                <Link
                  to="/user/applied-jobs"
                  className={`nav-link ${
                    location.pathname === "/user/applied-jobs"
                      ? "active-nav-links"
                      : ""
                  }`}
                >
                  <IoBagRemove className="sidebar-icon" /> {!isCollapsed && "Applied Job"}

                </Link>
              </li>
              <li>
                <Link
                  to="/user/favourite-jobs"
                  className={`nav-link ${
                    location.pathname === "/user/favourite-jobs"
                      ? "active-nav-links"
                      : ""
                  }`}
                >
                  <FaRegHeart className="sidebar-icon" /> {!isCollapsed && "Favourite Job"}
                </Link>
              </li>
              <li>
                <Link
                  to="/user/saved-jobs"
                  className={`nav-link ${
                    location.pathname === "/user/saved-jobs"
                      ? "active-nav-links"
                      : ""
                  }`}
                >
                  <FaSave className="sidebar-icon" /> {!isCollapsed && "Saved Jobs"}
                </Link>
              </li>
              <li>
                <Link
                  to="/user/job-alerts"
                  className={`nav-link ${
                    location.pathname === "/user/job-alerts"
                      ? "active-nav-links"
                      : ""
                  }`}
                >
                  <IoMdNotificationsOutline className="sidebar-icon" /> {!isCollapsed && "Job Alerts"}
                </Link>
              </li>
              <li>
                <Link
                  to="/user/message"
                  className={`nav-link ${
                    location.pathname === "/user/message"
                      ? "active-nav-links"
                      : ""
                  }`}
                >
                  <RiMessage2Line className="sidebar-icon" /> {!isCollapsed && "Message"}
                </Link>
              </li>
              <li>
                <Link
                  to="/user/profile"
                  className={`nav-link ${
                    location.pathname === "/user/profile"
                      ? "active-nav-links"
                      : ""
                  }`}
                >
                  <CgProfile className="sidebar-icon" /> {!isCollapsed && "My Profile"}
                </Link>
              </li>
              <li>
                <Link
                  to="/user/settings"
                  className={`nav-link ${
                    location.pathname === "/user/settings"
                      ? "active-nav-links"
                      : ""
                  }`}
                >
                  <IoSettingsOutline className="sidebar-icon" /> {!isCollapsed && "Settings"}
                </Link>
              </li>
              <li>
                <Link
                  to="/user/help-support"
                  className={`nav-link ${
                    location.pathname === "/user/help-support"
                      ? "active-nav-links"
                      : ""
                  }`}
                >
                  <FiHelpCircle className="sidebar-icon" /> {!isCollapsed && "Help And Support"}
                </Link>
              </li>
              <li>
                <Link
                  to="/user/refer-earn"
                  className={`nav-link ${
                    location.pathname === "/user/refer-earn"
                      ? "active-nav-links"
                      : ""
                  }`}
                >

                  <TbMoneybag className="sidebar-icon" /> {!isCollapsed && "Refer And Earn"}

                </Link>
              </li>
              <li>
                <Link
                  to="/user/referal-requests"
                  className={`nav-link ${
                    location.pathname === "/user/referal-requests"
                      ? "active-nav-links"
                      : ""
                  }`}
                >
                  <FaHandHolding className="sidebar-icon" /> {!isCollapsed && "Claim Request"}
                </Link>
              </li>
             
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}

export default Sidebar;
