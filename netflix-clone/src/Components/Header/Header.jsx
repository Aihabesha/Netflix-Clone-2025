import React from "react";
import "./Header.css";
import Logonetflix from "../../assets/Logonetflix.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Header() {
  return (
    <div className="header__container">
      <div className="header_left">
        <ul>
          <li>
            <img src={Logonetflix} alt="Logonetflix" width="100" />
          </li>
          {/* <li>Netflix</li> */}
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="header_right">
        <ul>
          <li>
            {" "}
            <SearchIcon />{" "}
                  </li>
            <li>Kids</li>
          <li>
            {" "}
            <NotificationsNoneIcon />{" "}
          </li>
          <li>
            {" "}
            <AccountBoxIcon />{" "}
          </li>
          <li>
            {" "}
            <ArrowDropDownIcon />{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
