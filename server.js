const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(fileUpload());
app.use(cors());

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  const file = req.files.image;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ err, success: false });
    }
    res.status(201).json({
      success: true,
      fileName: file.name,
      filePath: `/uploads/${file.name}`,
    });
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Example app listening on port : " + PORT);
});
