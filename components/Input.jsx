"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function Input() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  //   const tempSumbit = async () => {
  //     if (!selectedImage) {
  //       alert("Please upload an image first!");
  //       return;
  //     }

  //     setIsSubmitting(true);

  //     try {
  //       const response = await fetch("http://52.66.234.93:8000", {
  //         method: "GET",
  //         });
  //         if (!response.ok) {
  //             console.log(response);
  //             throw new Error("Failed to upload image");
  //             }
  //             const result = await response.json();
  //             console.log(result);
  //         }
  //         catch (error) {
  //             console.log(error);
  //             alert("Error uploading image: " + error.message);
  //         } finally {
  //             setIsSubmitting(false);
  //         }
  //     };

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert("Please upload an image first!");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await fetch("https://4dxs2cfwxr.ap-south-1.awsapprunner.com/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      setResult(result.predicted_class);
    } catch (error) {
      console.log(error);
      alert("Error uploading image: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="w-[100vw] h-[80vh] flex flex-col sm:h-full items-center justify-between">
        <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-4xl w-[80vw] text-center sm:text-6xl font-bold mt-10">Guava Disease Detection</h2>
        <div
          onClick={() => document.getElementById("fileInput").click()}
          className="border border-dashed p-4 m-4 cursor-pointer"
        >
          {selectedImage
            ? "File choosed: " + selectedImage.name
            : "Click to choose file"}
        </div></div>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isSubmitting}
          style={{ display: "none" }}
        />
        <div>
          {previewImage ? (
            <div className="mt-12 relative">
              <Image
                src={previewImage}
                alt="Preview"
                height={500}
                width={500}
                className="sm:h-[350px] sm:w-[500px] h-[40vh] w-[80vw]"
              />
              {result && (
                <div
                  className={`absolute top-0 left-0 w-full h-full  ${
                    result === "healthy_guava"
                      ? "text-black bg-green-500 bg-opacity-50"
                      : "text-black bg-red-500 bg-opacity-50"
                  }`}
                >
                  {result == "healthy_guava" && (
                    <div className="flex flex-col items-center justify-center h-full">
                      <h3 className="text-4xl font-bold w-full flex justify-center mt-2">
                        HEALTHY
                      </h3>
                      <div>
                        <p className="text-xl  w-full flex justify-center mt-2">
                          No Disease Detected
                        </p>
                      </div>
                    </div>
                  )}
                  {result == "fruit_fly" && (
                    <div className="flex flex-col items-center justify-center h-full">
                      <h3 className="text-4xl font-bold w-full flex justify-center mt-2">
                        UNHEALTHY
                      </h3>
                      <div>
                        <p className="text-xl  w-full flex justify-center mt-2">
                          Fruit Fly Detected
                        </p>
                      </div>
                    </div>
                  )}
                  {result == "Anthracnose" && (
                    <div className="flex flex-col items-center justify-center h-full">
                      <h3 className="text-4xl font-bold w-full flex justify-center mt-2">
                        UNHEALTHY
                      </h3>
                      <div>
                        <p className="text-xl  w-full flex justify-center mt-2">
                          Anthracnose Detected
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-12">
              <Image
                src={"/healthy2.webp"}
                height={500}
                width={500}
                alt="Dummy Image"
                className="sm:h-[350px] sm:w-[500px] h-[40vh] w-[80vw]"
              />
            </div>
          )}

          {selectedImage && (
            <div className="flex gap-4 mt-4 justify-center">
              <Button
                onClick={() => {
                  setSelectedImage(null);
                  setPreviewImage(null);
                  setResult(null);
                }}
                disabled={isSubmitting}
                variant="secondary"
              >
                Remove
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !selectedImage}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Input;
