import React, { useRef } from "react";
import styled from "styled-components";

const ImageUploader = () => {
  const imgRef = useRef();

  return (
    <>
      <img></img>
      <input type="file" accept="image/*" ref={imgRef}></input>
    </>
  );
};

export default ImageUploader;
