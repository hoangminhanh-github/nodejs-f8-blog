import React from "react";
import ImageUploading from "react-images-uploading";

import toBase64 from "../../ultis/toBase64";
export function UploadImg() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = async (imageList, addUpdateIndex) => {
    // // data for submit
    // const base64 = imageList[0].data_url;
    // // const base64 = await toBase64(imageList);
    // console.log(base64);
    // // setImages(base64);
  };

  return (
    <div className="UploadImg">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
