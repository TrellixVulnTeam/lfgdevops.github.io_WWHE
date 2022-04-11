import React from "react";
import styled, { css } from "styled-components";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

const WidthContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

const WidthContainerCenter = styled.div`
  width: 45%;

  @media (max-width: 1024px) {
    width: 45%;
  }
`;

const MobileContainerCenter = styled.div`
  width: 90%;
`;

export const WidthContainer = (props) => {
  return (
    <>
      <BrowserView>
        <WidthContainerWrapper>
          <WidthContainerCenter>{props.children}</WidthContainerCenter>
        </WidthContainerWrapper>
      </BrowserView>
      <MobileView>
        <WidthContainerWrapper>
          <MobileContainerCenter>{props.children}</MobileContainerCenter>
        </WidthContainerWrapper>
      </MobileView>
    </>
  );
};
