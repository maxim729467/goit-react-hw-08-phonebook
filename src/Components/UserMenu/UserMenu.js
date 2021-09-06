import React from "react";
import { useSelector } from "react-redux";
import { UserInfo, Avatar, UserName, Button } from "./UserMenu.styles";
import authSelectors from "Redux/auth/auth-selectors";
import { useDispatch } from "react-redux";
import operations from "Redux/auth/auth-operations";
import avatar from "Images/avatar.png";

export default function UserMenu() {
  const userName = useSelector((state) => authSelectors.getUsername(state));
  const dispatch = useDispatch();

  const onBtnClick = () => {
    dispatch(operations.logOut());
  };

  return (
    <UserInfo>
      <Avatar alt="avatar" src={avatar} width={30} height={30} />
      <UserName>Welcome, {userName}</UserName>
      <Button onClick={() => onBtnClick()} type="button">
        Log out
      </Button>
    </UserInfo>
  );
}
