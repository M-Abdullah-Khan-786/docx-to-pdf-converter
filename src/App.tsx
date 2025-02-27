import "./App.css";
import DocxToPdfConverter from "./pages/DocxToPdfConverter";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-gray-800 w-full max-w-2xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">
          DOCX to PDF Converter
        </h1>
        <DocxToPdfConverter />
      </div>
    </div>
  );
}

export default App;
