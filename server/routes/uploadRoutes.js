import express from "express";
import multer from "multer";
import { buildTree } from "../utils/buildTree.js";
import { analyzeWithGemini } from "../utils/geminiAnalyzer.js";
import AnalysisHistory from "../models/AnalysisHistory.js";

const router = express.Router();

const BINARY_EXTENSIONS = new Set([
  "sqlite", "sqlite3", "db", "png", "jpg", "jpeg", "gif", "ico",
  "svg", "pdf", "zip", "tar", "gz", "7z", "rar", "exe", "dll",
  "so", "dylib", "pyc", "o", "a", "bin", "woff", "woff2", "ttf",
  "eot", "mp3", "mp4", "wav", "avi", "mov", "psd"
]);

// Memory storage with 50MB per file limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }
}).array("files");

router.post("/upload", (req, res) => {
  upload(req, res, async (err) => {

    if (err) {
      return res.status(400).json({
        error: "File upload failed"
      });
    }

    try {
      // Get files sent by React
      const files = req.files || [];

      // Get file paths sent by React
      const paths = req.body.paths || [];

      // Make sure files were uploaded
      if (files.length === 0) {
        return res.status(400).json({
          error: "No files were uploaded"
        });
      }

      // Make sure paths are always an array
      const pathsArray = Array.isArray(paths)
        ? paths
        : [paths];


      // Store readable project files here
      const projectFiles = [];

      // Go through every uploaded file
      for (let i = 0; i < files.length; i++) {

        const file = files[i];

        // Get the file path
        const filePath = pathsArray[i] || file.originalname;

        // Get file extension
        const extension = filePath
          .split(".")
          .pop()
          .toLowerCase();

        // Ignore images, videos, databases, etc.
        if (BINARY_EXTENSIONS.has(extension)) {
          continue;
        }

        // Convert file data into readable text
        const content = file.buffer.toString("utf8");

        // Ignore files containing binary data
        if (content.includes("\0")) {
          continue;
        }



        // Save file path and code
        projectFiles.push({
          path: filePath,
          content: content
        });
      }

      // Make sure we found some readable code
      if (projectFiles.length === 0) {
        return res.status(400).json({
          error: "No readable source code files were found"
        });
      }

      // Send the files to Gemini
      const analysis = await analyzeWithGemini(projectFiles);

      // Send Gemini's result back to React
      res.json({
        message: "Analysis complete",
        analysis: analysis
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        error: "Something went wrong while analyzing the project"
      });
    }
  });
});

export default router;