import { Center, Input, Textarea } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import styled, { css } from "styled-components";

const SunkenInputWrapper = styled.div`
  box-shadow: inset 2px 5px 20px black;
  border-radius: 5px;
  background: hsl(11, 49%, 11%);
  padding: 4px;
  color: white;
`;

export const SunkenInput = ({ placeholder, value, setValue }) => {
  return (
    <div>
      <SunkenInputWrapper>
        <Center>
          <Input
            variant="unstyled"
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
          />
        </Center>
      </SunkenInputWrapper>
    </div>
  );
};

export const SunkenTextArea = ({ placeholder, value, setValue }) => {
  return (
    <div>
      <SunkenInputWrapper>
        <Center>
          <Textarea
            variant="unstyled"
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
          />
        </Center>
      </SunkenInputWrapper>
    </div>
  );
};
