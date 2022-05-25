import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ImagePage from "./components/ImagePage";

function App() {
  // axiosInstance.post("http://localhost:5000/upload", {
  //   body: formData,
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   onUploadProgress: (data) => {
  //     setProgress(Math.round((100 * data.loaded) / data.total));
  //   },
  // });

  // axiosInstance.post("/upload", {
  //   body: formData,
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   onUploadProgress: (data) => {
  //     setProgress(Math.round((100 * data.loaded) / data.total));
  //   },
  // });

  // try {
  //   const response = await axios.post(
  //     "http://localhost:5000/upload",
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );
  // } catch (error) {
  //   console.log(error);
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/large-image/:fileName" element={<ImagePage />} /> */}
        <Route path="/large-image/:fileData" element={<ImagePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

App.getInitialProps = async (ctx) => {
  return {
    data: null,
  };
};
