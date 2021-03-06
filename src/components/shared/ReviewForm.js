import React from 'react';
import styled from "@emotion/styled";
import { Input, Button } from './Form';

export const Container = styled.div`
  display: flex;
  align-items: center;
  > button {
    margin-left: 1rem;
  }
`;

export const ReviewForm = ({ inputValue, onChange, onSearch, buttonText }) => {
  return(
    <Container>
      <Input value={inputValue} onChange={onChange}/>
      <Button onClick={onSearch}>{buttonText}</Button>
    </Container>
  )
};

