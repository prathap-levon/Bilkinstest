import { useState, useEffect } from "react";
import "./layout.css";
import { FaRegBell, FaRegMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import DefaultUser from "../Assets/Images/DefaultUser.png";
import { useDispatch, useSelector } from 'react-redux';
import Instance from "../../AxiosConfig";
import { setProfile } from "../../features/profileSlice";
import { IMG_URL } from "../../globalConstant";
import Swal from "sweetalert2";
import logoutImg from "../Assets/Images/logoutimg.jpg"
import { useNavigate } from "react-router-dom";

const Header = ({ onCollapseToggle, isCollapsed }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profile = useSelector((state) => state.profile.profile);
  const loggedInUserInfo = JSON.parse(localStorage.getItem("loggedInUserInfo"));
  const navigate=useNavigate();
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setIsDarkMode(true);
    }
  }, []);
  const notificationCount = useSelector((state) => state.notifications.unReadCount);
  const handleNotificationClick = () => {
    navigate('/user/notifications');
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleToggleChange = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
 
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await Instance.get(`/getUserById/${loggedInUserInfo?.userId}`, {
        headers: {
          Authorization: `Bearer ${loggedInUserInfo?.token}`,
        },
      });
      if (response.status === 200) {
        dispatch(setProfile(response?.data?.user));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handlelogout = () => {
    Swal.fire({
      imageUrl: logoutImg,
      imageWidth: "160px",
      title: 'Are you sure You want to <span style="color: var(--maroon-color);">Logout?</span>',
      showCancelButton: true,
      confirmButtonColor: "#555",
      cancelButtonColor: "#ce1b28",
      confirmButtonText: "Yes, logout me!",
      customClass: {
        title: 'swal-title',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("loggedInUserInfo")
        navigate("/user/login")
      }
    })
  }
  return (
    <div style={{ position: "sticky", top: "0", zIndex: "999" }}>
      <nav className={`navbar-header ${isCollapsed ? "collapsed" : ""}`}>
        <div className="d-flex w-100 justify-content-end">
          <div className="d-flex align-items-center gap-2">
            <div className="toggle-container">
              <input
                type="checkbox"
                id="toggle"
                className="toggle-input"
                checked={isDarkMode}
                onChange={handleToggleChange}
              />
              <label htmlFor="toggle" className="toggle-label">
                <span className="toggle-button">
                  {isDarkMode ? <FaMoon className="toggle-icons" /> : <FaSun className="toggle-icons" />}
                </span>
              </label>
            </div>
            

            <button
              type="button"
              aria-controls="navbar-notification"
              aria-expanded="false"
              className="notification-button"
              onClick={handleNotificationClick}
            >
              <FaRegBell className="notification-icon" />
              <span className="notification-badge">{notificationCount}</span>
            </button>

            <div className="d-flex align-items-center gap-2">
              <button
                className="user-image"
                type="button"
                aria-controls="user-menu"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                <img
                  className="profile--icon"
                  src={profile?.profileImage ? `${IMG_URL}${profile?.profileImage}` : DefaultUser}
                />
              </button>
              <div className="user-info">
                <span
                  style={{
                    color: "#ce1b28",
                    fontSize: "16px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                  }}
                >
                  {profile?.firstName} {profile?.lastName}
                </span>
                <br />
                <span className="xl-2">{'Profile'}</span>
              </div>

              {isDropdownOpen && (
                <div
                  className="header-dropdown-menu"
                  role="menu"
                  aria-labelledby="user-menu"
                >
                  <div className="header-dropdown-menu-items" style={{ cursor: "pointer" }}>
                    <Link to="/admin/settings" className="header-dropdown-item" role="menuitem" tabIndex="0">
                      Edit Profile
                    </Link>
                    <div className="header-dropdown-item" role="menuitem" tabIndex="0" onClick={handlelogout}>
                      Log out
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
