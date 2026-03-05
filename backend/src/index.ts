import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import vision from "@google-cloud/vision";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const client = new vision.ImageAnnotatorClient();

app.post("/api/ocr", async (req, res) => {
  try {
    const { image } = req.body; 

    if (!image) {
      return res.status(400).json({ message: "No image provided" });
    }

    const [result] = await client.textDetection({
      image: {
        content: image,
      },
    });

    const detections = result.textAnnotations;
    const text = detections?.[0]?.description || "";

    res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "OCR failed" });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});