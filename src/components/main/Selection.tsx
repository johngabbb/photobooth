import React from "react";

interface Props {}

const Selection = (props: Props) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full w-full space-y-10">
        <button
          type="button"
          className="cursor-pointer bg-yellow-600 rounded-lg min-w-50 
                     text-xl border-1 border-neutral-600 py-2 
                     hover:bg-yellow-400 transition-colors delay-100 font-semibold"
        >
          USE CAMERA
        </button>
        <button
          type="button"
          className="cursor-pointer bg-yellow-600 rounded-lg min-w-50 
                     text-xl border-1 border-neutral-600 py-2 
                     hover:bg-yellow-400 transition-colors delay-100 font-semibold"
        >
          UPLOAD PHOTOS
        </button>
      </div>
    </>
  );
};

export default Selection;
