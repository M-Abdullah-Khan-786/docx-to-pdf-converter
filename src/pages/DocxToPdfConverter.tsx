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
    if (file && file.name.endsWith(".docx")) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const extractedText = await extractTextFromDocx(arrayBuffer);
        setText(extractedText);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a valid .docx file");
    }
  };

  const extractTextFromDocx = async (
    arrayBuffer: ArrayBuffer
  ): Promise<string> => {
    try {
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
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
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save(fileName.replace(".docx", ".pdf"));
    setIsConverting(false);
  };

  return (
    <Card>
      <h1 className="text-xl font-bold mb-4">DOCX to PDF Converter</h1>
      <input
        type="file"
        accept=".docx"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {text && (
        <div className="border p-2 mb-4 h-40 overflow-auto">
          <p className="text-sm">{text}</p>
        </div>
      )}
      <Button onClick={handleConvertToPdf} disabled={!text || isConverting}>
        {isConverting ? "Converting..." : "Convert to PDF"}
      </Button>
    </Card>
  );
}
