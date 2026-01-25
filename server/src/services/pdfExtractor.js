import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 REQUIRED for Node.js
pdfjsLib.GlobalWorkerOptions.standardFontDataUrl =
  path.join(
    __dirname,
    "../../node_modules/pdfjs-dist/standard_fonts/"
  );

export const extractPdfText = async (buffer) => {
  try {
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(buffer),
      standardFontDataUrl:
        pdfjsLib.GlobalWorkerOptions.standardFontDataUrl,
    });

    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => item.str)
        .join(" ");

      fullText += " " + pageText;
    }

    return fullText.replace(/\s+/g, " ").trim();
  } catch (err) {
    console.error("PDF parse failed", err);
    return "";
  }
};
