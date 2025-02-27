import { useState } from "react";
import jsPDF from "jspdf";
import mammoth from "mammoth";
import Card from "../components/Card";
import Button from "../components/Button";

export default function DocxToPdfConverter() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;
    if (!file.name.endsWith(".docx")) {
      alert("Please upload a valid .docx file");
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const extractedText = await extractTextFromDocx(arrayBuffer);
      setText(extractedText);
    };

    reader.readAsArrayBuffer(file);
  };

  const extractTextFromDocx = async (
    arrayBuffer: ArrayBuffer
  ): Promise<string> => {
    try {
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value || "No text found in the document.";
    } catch (error) {
      console.error("Error extracting text:", error);
      return "Failed to extract text";
    }
  };

  const handleConvertToPdf = () => {
    if (!text) {
      alert("No text available to convert.");
      return;
    }

    setIsConverting(true);
    setTimeout(() => {
      const doc = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });

      const marginLeft = 10;
      const marginTop = 10;
      const maxWidth = 190;
      doc.setFont("helvetica", "normal");
      doc.text(text, marginLeft, marginTop, { maxWidth });

      doc.save(fileName.replace(".docx", ".pdf"));
      setIsConverting(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl p-6 bg-white/80 backdrop-blur-lg shadow-xl">
      <input
        type="file"
        accept=".docx"
        onChange={handleFileUpload}
        className="mb-4 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
      />

      {text && (
        <div className="border p-3 mb-4 h-40 overflow-auto rounded-lg bg-gray-100 text-gray-700">
          <p className="text-sm whitespace-pre-line">{text}</p>
        </div>
      )}

      <Button
        onClick={handleConvertToPdf}
        disabled={!text || isConverting}
        className="w-full text-lg"
      >
        {isConverting ? "Converting..." : "Convert to PDF"}
      </Button>
    </Card>
  );
}
