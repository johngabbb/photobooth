import React from "react";

interface Props {}

const PhotoLayout = (props: Props) => {
  return (
    <>
      <div className="grid grid-rows-3">
        <div className="h-20"></div>
        <div className="h-20"></div>
        <div className="h-20"></div>
      </div>
    </>
  );
};

export default PhotoLayout;
