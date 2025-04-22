import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

type TemplateType = "2x1" | "3x1" | "2x2" | "1plus2";

const Upload = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const templateType = location.state?.templateType as TemplateType;

  // Get the number of photos needed based on template
  const getPhotoCount = (): number => {
    switch (templateType) {
      case "2x1":
        return 2;
      case "3x1":
        return 3;
      case "2x2":
        return 4;
      case "1plus2":
        return 3;
      default:
        return 0;
    }
  };

  useEffect(() => {
    // If no template was selected, redirect back to selection
    if (!templateType) {
      navigate("/selection");
    }
  }, [templateType, navigate]);

  const [photos, setPhotos] = useState<(string | null)[]>(Array(getPhotoCount()).fill(null));

  // Create refs based on the number of photos needed
  const fileInputRefs = Array(getPhotoCount())
    .fill(0)
    .map(() => useRef<HTMLInputElement>(null));

  const handleImageClick = (index: number) => {
    fileInputRefs[index].current?.click();
  };

  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newPhotos = [...photos];
      newPhotos[index] = e.target?.result as string;
      setPhotos(newPhotos);
    };

    reader.readAsDataURL(file);
  };

  const allPhotosSelected = (): boolean => {
    return photos.every((photo) => photo !== null);
  };

  const handleContinue = () => {
    // Here you would process the photos or navigate to the next step
    console.log("Photos for template:", templateType, photos);
    // For now, just go back to selection
    navigate("/selection", { state: { photos, templateType } });
  };

  // Render the photos upload section based on template type
  const renderPhotoGrid = () => {
    const photoCount = getPhotoCount();

    switch (templateType) {
      case "2x1":
        return (
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
            {photos.map((photo, index) => renderPhotoUploader(photo, index))}
          </div>
        );
      case "3x1":
        return (
          <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
            {photos.map((photo, index) => renderPhotoUploader(photo, index))}
          </div>
        );
      case "2x2":
        return (
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full max-w-lg">
            {photos.map((photo, index) => renderPhotoUploader(photo, index))}
          </div>
        );
      case "1plus2":
        return (
          <div className="grid grid-rows-2 gap-4 w-full max-w-lg">
            <div className="w-full">{renderPhotoUploader(photos[0], 0)}</div>
            <div className="grid grid-cols-2 gap-4">
              {renderPhotoUploader(photos[1], 1)}
              {renderPhotoUploader(photos[2], 2)}
            </div>
          </div>
        );
      default:
        return <div className="text-red-500">Please select a template first</div>;
    }
  };

  // Render individual photo upload slot
  const renderPhotoUploader = (photo: string | null, index: number) => {
    return (
      <div
        key={index}
        onClick={() => handleImageClick(index)}
        className="h-40 border-2 border-dashed border-gray-400 rounded-md 
                  flex items-center justify-center cursor-pointer 
                  overflow-hidden hover:border-yellow-500 
                  transition-all duration-200"
      >
        {photo ? (
          <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center p-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">Click to add photo</p>
            <p className="text-xs text-gray-500">
              {index + 1}/{getPhotoCount()}
            </p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRefs[index]}
          onChange={(e) => handleFileChange(index, e)}
          accept="image/*"
          className="hidden"
        />
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 space-y-6">
      <h2 className="text-2xl font-bold">Upload Photos</h2>
      <p className="text-gray-600">Template: {templateType}</p>

      {renderPhotoGrid()}

      <div className="flex space-x-4 mt-6">
        <button
          type="button"
          className="cursor-pointer bg-gray-300 rounded-lg px-6
                   text-lg border border-neutral-600 py-2 
                   hover:bg-gray-200 transition-colors delay-100"
          onClick={() => navigate("/selection")}
        >
          Back
        </button>

        <button
          type="button"
          disabled={!allPhotosSelected()}
          className={`cursor-pointer rounded-lg px-6
                     text-xl border border-neutral-600 py-2 
                     transition-colors delay-100 font-semibold
                     ${
                       allPhotosSelected()
                         ? "bg-yellow-600 hover:bg-yellow-400"
                         : "bg-gray-400 cursor-not-allowed"
                     }`}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Upload;
