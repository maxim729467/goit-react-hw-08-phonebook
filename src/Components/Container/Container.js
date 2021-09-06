import React from "react";
import { StyledContainer, FallbackContainer } from "./Container.styles";
import { useSelector } from "react-redux";
import { getLoader } from "Redux/contacts/contacts-selectors";
import authSelectors from "Redux/auth/auth-selectors";
import Loader from "react-loader-spinner";

export default function Container({ children }) {
  const state = useSelector((state) => state);
  const isContactLoading = getLoader(state);
  const isUserLoading = authSelectors.isUserLoading(state);
  const loader = isContactLoading || isUserLoading;

  return (
    <StyledContainer>
      {children}
      {loader && (
        <FallbackContainer>
          <Loader type="Circles" color="#FF4500" height={80} width={80} />
        </FallbackContainer>
      )}
    </StyledContainer>
  );
}
