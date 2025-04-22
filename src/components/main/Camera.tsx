import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

type TemplateType = "2x1" | "3x1" | "2x2" | "1plus2";

const Camera = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const templateType = location.state?.templateType as TemplateType;
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    if (!templateType) {
      navigate("/selection");
      return;
    }

    // Start camera
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert(
          "Could not access the camera. Please check permissions or try uploading photos instead."
        );
        navigate("/selection");
      }
    };

    startCamera();

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [templateType, navigate]);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current || photos.length >= getPhotoCount()) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data URL
    const photoDataUrl = canvas.toDataURL("image/jpeg");
    setPhotos([...photos, photoDataUrl]);

    // If we've taken all the needed photos, we could process them or navigate
    if (photos.length + 1 >= getPhotoCount()) {
      // Optional: automatically continue to next step
      // processTakenPhotos();
    }
  };

  const resetPhotos = () => {
    setPhotos([]);
  };

  const processTakenPhotos = () => {
    // Here you would save the photos or pass them to the next component
    // For now, let's just go back to the selection screen
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

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 space-y-4">
      <h2 className="text-2xl font-bold">Camera Mode</h2>
      <p>Template type: {templateType}</p>

      {renderPhotoCounter()}

      <div className="relative w-full max-w-lg h-64 bg-black rounded-lg overflow-hidden">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      </div>

      {/* Hidden canvas for capturing photos */}
      <canvas ref={canvasRef} className="hidden" />

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
          className="cursor-pointer bg-yellow-600 rounded-lg px-6
                   text-xl border border-neutral-600 py-2 
                   hover:bg-yellow-400 transition-colors delay-100 font-semibold"
          onClick={takePhoto}
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
        onClick={() => navigate("/selection")}
      >
        Back to Templates
      </button>
    </div>
  );
};

export default Camera;
