import React from "react";
import styled from "styled-components";

import colors from "../../lib/styles/colors";

const FooterContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 100px;
  border-top: 0.3px solid ${colors.mono[1]};
`;

const Footer = () => {
  return <FooterContainer></FooterContainer>;
};

export default Footer;
