import React from "react";
import { NavLink } from "react-router-dom";
import { NavList, NavItem, Panel } from "./NavBar.styles";
import * as styles from "./NavBar.module.css";
import UserMenu from "../UserMenu";
import { unsetError } from "Redux/auth/auth-slice";
import { useDispatch } from "react-redux";

export default function NavBar({ isLoggedIn }) {
  const dispatch = useDispatch();
  const onLinkClick = () => {
    dispatch(unsetError());
  };

  return (
    <Panel>
      <NavList>
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <>
            <NavItem>
              <NavLink
                className={styles.navLinkStyle}
                activeClassName={styles.activeStyle}
                exact
                to="/login"
                onClick={() => onLinkClick()}
              >
                Log in
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={styles.navLinkStyle}
                activeClassName={styles.activeStyle}
                to="/register"
                onClick={() => onLinkClick()}
              >
                Sign up
              </NavLink>
            </NavItem>
          </>
        )}
      </NavList>
    </Panel>
  );
}
