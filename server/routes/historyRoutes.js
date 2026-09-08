import express from "express";
import AnalysisHistory from "../models/AnalysisHistory.js";

const router = express.Router();

// GET /history — return all saved analyses, newest first
router.get("/history", async (req, res) => {
  try {
    const history = await AnalysisHistory.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .select("-fileTree -documentation"); // exclude heavy fields from list view

    res.json({ history });
  } catch (err) {
    console.error("History fetch error:", err);
    res.status(500).json({ error: "Failed to fetch history." });
  }
});

// GET /history/:id — return a single full analysis record
router.get("/history/:id", async (req, res) => {
  try {
    const record = await AnalysisHistory.findById(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found." });
    res.json({ analysis: record });
  } catch (err) {
    console.error("History fetch by ID error:", err);
    res.status(500).json({ error: "Failed to fetch history record." });
  }
});

// DELETE /history/:id — delete a single record
router.delete("/history/:id", async (req, res) => {
  try {
    await AnalysisHistory.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted." });
  } catch (err) {
    console.error("History delete error:", err);
    res.status(500).json({ error: "Failed to delete record." });
  }
});

export default router;
