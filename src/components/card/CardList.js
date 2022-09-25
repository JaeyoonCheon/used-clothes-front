import React from "react";
import styled from "styled-components";

import Card from "./Card";

const Wrapper = styled.div``;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: auto;
`;

const CardList = () => {
  return (
    <Wrapper>
      <Row>
        <Card></Card>
      </Row>
    </Wrapper>
  );
};

export default CardList;
