const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();

app.use(fileUpload());
app.use(cors());

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

app.listen(5000, () => {
  console.log("Example app listening on port : " + 5000);
});
