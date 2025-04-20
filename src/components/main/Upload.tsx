import React, { useRef, useState } from "react";

type Props = {};

const Upload = (props: Props) => {
  const [photoOrientation, setPhotoOrientation] = useState<"landscape" | "portrait">("portrait");
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null]);

  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleImageClick = (index: number) => {
    fileInputRefs[index].current?.click();
  };

  const onImagesChange = (images: (string | null)[]) => {
    console.log("Images updated:", images);
  };

  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newImages = [...photos];
      newImages[index] = e.target?.result as string;
      setPhotos(newImages);

      if (onImagesChange) {
        onImagesChange(newImages);
      }
    };

    reader.readAsDataURL(file);
  };

  const handlePortrait = () => {
    setPhotoOrientation("portrait");
  };

  const handleLandscape = () => {
    setPhotoOrientation("landscape");
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div
        className={`${
          photoOrientation === "landscape" ? "grid grid-rows-3" : "grid grid-cols-3"
        } border-1 border-neutral-900`}
      >
        {photos.map((image, index) => (
          <div key={index} className="relative">
            <div
              onClick={() => handleImageClick(index)}
              className={`h-60 border-2 ${image ? "border-gray-400" : "border-gray-500"} 
              rounded-md flex items-center justify-center cursor-pointer 
              transition-all hover:border-blue-500 hover:bg-gray-200`}
            >
              {image ? (
                <img
                  src={image}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="text-center p-4">
                  <p className="mt-2 text-sm">Click to add photo</p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRefs[index]}
              onChange={(e) => handleFileChange(index, e)}
              accept="image/*"
              className="hidden"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-5">
        <button
          type="button"
          className={`cursor-pointer rounded-lg min-w-40 
                     text-xl border-1 border-neutral-600 py-2 
                     hover:bg-yellow-400 transition-colors delay-100 font-semibold
                     ${photoOrientation === "landscape" ? "bg-yellow-400" : "bg-yellow-600"}`}
          onClick={() => handleLandscape()}
        >
          Landscape
        </button>

        <button
          type="button"
          className={`cursor-pointer rounded-lg min-w-40 
            text-xl border-1 border-neutral-600 py-2 
            hover:bg-yellow-400 transition-colors delay-100 font-semibold
            ${photoOrientation === "portrait" ? "bg-yellow-400" : "bg-yellow-600"}`}
          onClick={() => handlePortrait()}
        >
          Portrait
        </button>
      </div>
    </div>
  );
};

export default Upload;
