import mongoose from "mongoose";

const analysisHistorySchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    codeScore: { type: Number, default: 0 },
    scoreBreakdown: {
      readability: { type: Number, default: 0 },
      structure:   { type: Number, default: 0 },
      documentation: { type: Number, default: 0 },
      complexity:  { type: Number, default: 0 },
    },
    languages:  { type: Array, default: [] },
    summary:    { type: String, default: "" },
    howToRun:   { type: Array, default: [] },
    documentation: { type: String, default: "" },
    techStack:  { type: Array, default: [] },
    totalFiles: { type: Number, default: 0 },
    fileTree:   { type: Object, default: {} },
  },
  { timestamps: true } // adds createdAt + updatedAt automatically
);

const AnalysisHistory = mongoose.model("AnalysisHistory", analysisHistorySchema);

export default AnalysisHistory;
