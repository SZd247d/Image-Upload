import React from "react";
import { FaReact } from "react-icons/fa";
import { useState } from "react";
import axiosInstance from "./utils/axios";
import axios from "axios";

function Home() {
  const [selectedFile, setSelectedFile] = useState({});
  const [progress, setProgress] = useState(0);
  const [fileData, setFileData] = useState({});

  console.log(selectedFile);
  if (progress === 100) {
    setTimeout(() => {
      setProgress(0);
      setSelectedFile({});
    }, 5000);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      });
      // const {fileName, filePath} = res.data
      // setFileData({ fileName, filePath });
      setFileData(res.data);
      console.log(fileData);
    } catch (error) {
      console.log(error);
    }

    return (
      <div className=" bg-slate-900 min-h-screen overflow-hidden text-slate-100">
        <h1 className="flex mt-16 items-center justify-center text-3xl md:text-4xl space-x-8">
          <FaReact className="mr-2" /> React Image Upload!
        </h1>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col mt-16 justify-center items-center p-6 space-y-10">
            <label
              className="w-full mx-10 sm:w-2/3 md:w-1/2  mt-4 text-lg font-medium text-gray-300 "
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              name="image"
              className="  text-base w-full mx-10 sm:w-2/3 md:w-1/2 flex items-center justify-center   rounded-lg border border-gray-700 cursor-pointer text-gray-400 focus:outline-none bg-gray-700 "
              id="file_input"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            ></input>
            <p className="mt-1 text-sm text-gray-300 " id="file_input_help">
              SVG, PNG, JPG or GIF .
            </p>

            <div className="w-full sm:w-2/3 md:w-1/2 h-4 bg-gray-300 rounded-full">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center  h-full  leading-none  rounded-full"
                style={{ width: `${progress}%` }}
              >
                {" "}
                {progress}%
              </div>
            </div>

            <input
              type="submit"
              value="Upload Image"
              className="block  w-full sm:w-2/3 md:w-1/2 rounded-md  text-sm font-bold py-2 px-4 mx-10 md:mx-0 hover:bg-slate-600 bg-gray-800 text-gray-200  cursor-pointer"
            />
          </div>
        </form>

        {selectedFile && (
          <div onClick={showLargeImagePage} className="m-10">
            <div className="flex flex-col mx-auto  mt-16  text-base w-full  sm:w-2/3 md:w-1/2  items-center justify-center   rounded-lg border border-gray-700 cursor-pointer text-gray-400 ">
              <h1 className="mt-2">{fileData.fileName}</h1>
              <img
                className="object-fit rounded-b-lg mt-4"
                src={fileData.filePath}
                alt=""
              />
            </div>
          </div>
        )}
      </div>
    );
  };
}

export default Home;
