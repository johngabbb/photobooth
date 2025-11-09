import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Header from "../Layout/Header";

type Props = {};

type TemplateType = "2x1" | "3x1" | "2x2" | "1plus2";

const Camera = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const templateType = location.state?.templateType as TemplateType;
  const [photos, setPhotos] = useState<string[]>([]);
  const webcamRef = useRef<Webcam>(null);

  // Number of photos needed based on template type
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

  const capturePhoto = useCallback(() => {
    if (!webcamRef.current || photos.length >= getPhotoCount()) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setPhotos([...photos, imageSrc]);
    }
  }, [photos, getPhotoCount]);

  const goBackSelection = () => {
    navigate("/selection");
  };

  useEffect(() => {
    if (!templateType) {
      navigate("/selection");
      return;
    }
  }, [templateType, navigate]);

  const resetPhotos = () => {
    setPhotos([]);
  };

  const processTakenPhotos = () => {
    // Navigate with the captured photos and template type
    navigate("/selection", { state: { photos, templateType } });
  };

  const renderPhotoCounter = () => {
    const total = getPhotoCount();
    return (
      <div className="text-lg font-medium">
        Photos: {photos.length} / {total}
      </div>
    );
  };

  // Webcam video constraints
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment", // Use back camera on mobile devices
  };

  return (
    <>
      <Header />
      <div className="h-full w-full flex flex-col items-center justify-center p-4 pt-28">
        <h2 className="text-2xl font-bold">Camera Mode</h2>
        <p>Template type: {templateType}</p>

        {renderPhotoCounter()}

        <div className="relative w-full max-w-lg h-64 bg-black rounded-lg overflow-hidden">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
        </div>

        {/* Display captured photos */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-lg">
          {photos.map((photo, index) => (
            <div key={index} className="h-20 bg-gray-200 rounded-md overflow-hidden">
              <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            className="cursor-pointer bg-[#e2aa31] rounded-lg px-6
                     text-xl border border-neutral-600 py-2
                     hover:bg-yellow-400 transition-colors delay-100 font-semibold
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={capturePhoto}
            disabled={photos.length >= getPhotoCount()}
          >
            Take Photo
          </button>

          <button
            type="button"
            className="cursor-pointer bg-red-500 rounded-lg px-6
                     text-xl border border-neutral-600 py-2
                     hover:bg-red-400 transition-colors delay-100 font-semibold"
            onClick={resetPhotos}
          >
            Reset
          </button>
        </div>

        {photos.length === getPhotoCount() && (
          <button
            type="button"
            className="cursor-pointer bg-green-600 rounded-lg px-6
                     text-xl border border-neutral-600 py-2
                     hover:bg-green-500 transition-colors delay-100 font-semibold"
            onClick={processTakenPhotos}
          >
            Continue
          </button>
        )}

        <button
          type="button"
          className="cursor-pointer bg-gray-300 rounded-lg px-6
                   text-lg border border-neutral-600 py-1
                   hover:bg-gray-200 transition-colors delay-100"
          onClick={goBackSelection}
        >
          Back to Templates
        </button>
      </div>
    </>
  );
};

export default Camera;
