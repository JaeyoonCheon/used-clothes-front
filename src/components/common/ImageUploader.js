import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import colors from "../../lib/styles/colors";
import { useDispatch } from "react-redux";

import { MAX_IMAGE_UPLOAD } from "../../lib/constant/constants";
import { ReactComponent as AddImageIcon } from "../../asset/add-2935429.svg";
import { changeArrayProduct } from "../../slices/productSlice";

const Wrapper = styled.div`
  display: flex;
  height: 300px;
  align-items: center;
`;

const UploadedImageContainer = styled.div`
  position: relative;

  img {
    width: 280px;
    height: 280px;
    object-fit: cover;
  }
  .add_image_icon {
    width: 280px;
    height: 280px;
  }
  label {
    margin-right: 20px;
    cursor: pointer;
  }
  input {
    display: none;
  }
`;
const ImageNumber = styled.span`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  z-index: 50;

  border: 1px solid ${colors.blue[0]};
  border-radius: 70%;
  background: white;
  color: ${colors.blue[0]};
  text-align: center;
  line-height: 30px;
`;

// 이미지 리사이징 필요
const ImageUploader = () => {
  const dispatch = useDispatch();
  const imgRef = useRef();
  const dataTransfer = new DataTransfer();

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const uploadFiles = () => {
    console.log(imgRef.current.files);

    if (uploadedFiles.length < MAX_IMAGE_UPLOAD) {
      if (!uploadedFiles.includes(imgRef.current.files[0])) {
        setUploadedFiles([...uploadedFiles, ...imgRef.current.files]);
        makePreview();
      }
    }
  };
  const removeFiles = (filename) => {
    setUploadedFiles(
      [...uploadedFiles].filter((file) => file.name !== filename)
    );
    Array.from(imgRef.current.files)
      .filter((file) => file.name !== filename)
      .forEach((file) => dataTransfer.items.add(file));
    imgRef.current.files = dataTransfer.files;
  };
  console.log(uploadedFiles);

  const makePreview = () => {
    const elements = [];

    for (let file in uploadedFiles) {
      console.log(uploadedFiles[file]);
      const fileURL = URL.createObjectURL(uploadedFiles[file]);
      const fileName = uploadedFiles[file].name;
      elements.push(
        <UploadedImageContainer
          key={fileName}
          onClick={() => removeFiles(fileName)}
        >
          <img src={fileURL} alt="item"></img>
          <ImageNumber>{Number(file) + 1}</ImageNumber>
        </UploadedImageContainer>
      );
    }

    return <>{elements.map((element) => element)}</>;
  };

  useEffect(() => {
    dispatch(changeArrayProduct({ name: "itemimage", value: uploadedFiles }));
  }, [uploadedFiles]);

  return (
    <Wrapper>
      <UploadedImageContainer>
        <label htmlFor="file">
          <AddImageIcon className="add_image_icon"></AddImageIcon>
        </label>
        <input
          type="file"
          multiple
          id="file"
          accept="image/*"
          ref={imgRef}
          onChange={uploadFiles}
        ></input>
      </UploadedImageContainer>
      {uploadedFiles && makePreview()}
    </Wrapper>
  );
};

export default ImageUploader;
