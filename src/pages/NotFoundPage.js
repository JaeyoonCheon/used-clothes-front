import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundContainer = styled.div`
  #notfound {
    position: relative;
    height: 100vh;
  }

  #notfound .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .notfound {
    max-width: 767px;
    width: 100%;
    line-height: 1.4;
    text-align: center;
    padding: 15px;
  }

  .notfound .notfound-404 {
    position: relative;
    height: 220px;
  }

  .notfound .notfound-404 h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 186px;
    font-weight: 200;
    margin: 0px;
    background: linear-gradient(130deg, #ffa34f, #ff6f68);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    text-transform: uppercase;
  }

  .notfound h2 {
    font-size: 33px;
    font-weight: 200;
    text-transform: uppercase;
    margin-top: 0px;
    margin-bottom: 25px;
    letter-spacing: 3px;
  }

  .notfound p {
    font-size: 16px;
    font-weight: 200;
    margin-top: 0px;
    margin-bottom: 25px;
  }

  .notfound a {
    color: #ff6f68;
    font-weight: 200;
    text-decoration: none;
    border-bottom: 1px dashed #ff6f68;
    border-radius: 2px;
  }

  @media only screen and (max-width: 480px) {
    .notfound .notfound-404 {
      position: relative;
      height: 168px;
    }

    .notfound .notfound-404 h1 {
      font-size: 142px;
    }

    .notfound h2 {
      font-size: 22px;
    }
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Oops! Nothing was found</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.{" "}
            <Link to="/">Return to homepage</Link>
          </p>
        </div>
      </div>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
