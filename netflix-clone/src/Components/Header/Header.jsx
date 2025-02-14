import React, { useState, useEffect } from "react";
import "./Header.css";
import Logonetflix from "../../assets/Logonetflix.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Detect scroll to change header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`header__container ${isScrolled ? "scrolled" : ""}`}>
      {/* Left Section - Logo & Navigation */}
      <div className="header_left">
        <img src={Logonetflix} alt="Netflix Logo" className="logo" />
        <ul className="nav__menu">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>

      {/* Right Section - Icons & Account */}
      <div className="header_right">
        <SearchIcon className="icon" />
        <NotificationsNoneIcon className="icon" />
        
        {/* Account Dropdown */}
        <div 
          className="account__menu"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <AccountBoxIcon className="icon" />
          <ArrowDropDownIcon className="icon dropdown__arrow" />
          {dropdownOpen && (
            <ul className="account__dropdown">
              <li>Profile</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
