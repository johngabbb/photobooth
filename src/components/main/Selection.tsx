import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

// Define the template types and their layouts
type TemplateType = "2x1" | "3x1" | "2x2" | "1plus2";

const Selection = (props: Props) => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);

  const handleCamera = () => {
    if (selectedTemplate) {
      // Pass the selected template as state when navigating
      navigate("/camera", { state: { templateType: selectedTemplate } });
    } else {
      alert("Please select a template first");
    }
  };

  const handleUpload = () => {
    if (selectedTemplate) {
      // Pass the selected template as state when navigating
      navigate("/upload", { state: { templateType: selectedTemplate } });
    } else {
      alert("Please select a template first");
    }
  };

  const handleTemplateSelect = (template: TemplateType) => {
    setSelectedTemplate(template);
  };

  // Template components
  const TwoByOneTemplate = () => (
    <div className="grid grid-rows-2 gap-1 h-full w-full">
      <div className="bg-gray-200 h-full"></div>
      <div className="bg-gray-200 h-full"></div>
    </div>
  );

  const ThreeByOneTemplate = () => (
    <div className="grid grid-rows-3 gap-1 h-full w-full">
      <div className="bg-gray-200 h-full"></div>
      <div className="bg-gray-200 h-full"></div>
      <div className="bg-gray-200 h-full"></div>
    </div>
  );

  const TwoByTwoTemplate = () => (
    <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full w-full">
      <div className="bg-gray-200"></div>
      <div className="bg-gray-200"></div>
      <div className="bg-gray-200"></div>
      <div className="bg-gray-200"></div>
    </div>
  );

  const OnePlusTwoTemplate = () => (
    <div className="grid grid-rows-2 gap-1 h-full w-full">
      <div className="bg-gray-200 h-full"></div>
      <div className="grid grid-cols-2 gap-1 h-full">
        <div className="bg-gray-200 h-full"></div>
        <div className="bg-gray-200 h-full"></div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full w-full space-y-8">
        <h2 className="text-2xl font-bold">Select a template</h2>

        <div className="grid grid-cols-2 grid-rows-2 gap-5 max-w-2xl">
          <div>
            <div
              className={`h-50 w-35 border-2 rounded-lg overflow-hidden cursor-pointer 
                      ${
                        selectedTemplate === "2x1"
                          ? "border-yellow-500 shadow-lg"
                          : "border-gray-300"
                      }`}
              onClick={() => handleTemplateSelect("2x1")}
            >
              <div className="h-40 p-2">
                <TwoByOneTemplate />
              </div>
            </div>
            <div className="pt-2 text-center text-sm font-medium">2x1 Layout</div>
          </div>

          <div>
            <div
              className={`h-50 w-35 border-2 rounded-lg overflow-hidden cursor-pointer 
                      ${
                        selectedTemplate === "3x1"
                          ? "border-yellow-500 shadow-lg"
                          : "border-gray-300"
                      }`}
              onClick={() => handleTemplateSelect("3x1")}
            >
              <div className="h-40 p-2">
                <ThreeByOneTemplate />
              </div>
            </div>
            <div className="pt-2 text-center text-sm font-medium">3x1 Layout</div>
          </div>

          <div
            className={`h-50 w-35 border-2 rounded-lg overflow-hidden cursor-pointer 
                      ${
                        selectedTemplate === "2x2"
                          ? "border-yellow-500 shadow-lg"
                          : "border-gray-300"
                      }`}
            onClick={() => handleTemplateSelect("2x2")}
          >
            <div className="p-2 bg-gray-100 text-center text-sm font-medium">2x2 Layout</div>
            <div className="h-40 p-2">
              <TwoByTwoTemplate />
            </div>
          </div>

          <div
            className={`h-50 w-35 border-2 rounded-lg overflow-hidden cursor-pointer 
                      ${
                        selectedTemplate === "1plus2"
                          ? "border-yellow-500 shadow-lg"
                          : "border-gray-300"
                      }`}
            onClick={() => handleTemplateSelect("1plus2")}
          >
            <div className="p-2 bg-gray-100 text-center text-sm font-medium">1+2 Layout</div>
            <div className="h-40 p-2">
              <OnePlusTwoTemplate />
            </div>
          </div>
        </div>

        <div className="flex flex-row space-x-6 mt-8">
          <button
            type="button"
            className="cursor-pointer bg-yellow-600 rounded-lg px-6
                     text-xl border border-neutral-600 py-2 
                     hover:bg-yellow-400 transition-colors delay-100 font-semibold"
            onClick={() => handleCamera()}
          >
            USE CAMERA
          </button>
          <button
            type="button"
            className="cursor-pointer bg-yellow-600 rounded-lg px-6
                     text-xl border border-neutral-600 py-2 
                     hover:bg-yellow-400 transition-colors delay-100 font-semibold"
            onClick={() => handleUpload()}
          >
            UPLOAD PHOTOS
          </button>
        </div>
      </div>
    </>
  );
};

export default Selection;
