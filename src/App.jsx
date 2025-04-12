import React, { useState } from "react";
import InputField from "./components/InputField";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Typewriter } from "react-simple-typewriter";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [doneTyping, setDoneTyping] = useState(false);

  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Total_Bilirubin: "",
    Direct_Bilirubin: "",
    Alkaline_Phosphotase: "",
    Alamine_Aminotransferase: "",
    Aspartate_Aminotransferase: "",
    Total_Protiens: "",
    Albumin: "",
    Albumin_and_Globulin_Ratio: "",
  });

  const handleChange = (label, value) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const handleDetect = async () => {
    setIsLoading(true);
    setDoneTyping(false);

    const dataToSend = {
      Total_Bilirubin: formData.Total_Bilirubin,
      Direct_Bilirubin: formData.Direct_Bilirubin,
      Alkaline_Phosphotase: formData.Alkaline_Phosphotase,
      Alamine_Aminotransferase: formData.Alamine_Aminotransferase,
      Aspartate_Aminotransferase: formData.Aspartate_Aminotransferase,
      Total_Protiens: formData.Total_Protiens,
      Albumin: formData.Albumin,
      Albumin_and_Globulin_Ratio: formData.Albumin_and_Globulin_Ratio,
    };

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await res.json();
      setData(result);
      setIsLoading(false);

      console.log(result.prediction)

      const delay = (result.llmResponse?.length || 0) * 30 + 1000;
      setTimeout(() => setDoneTyping(true), delay);

    } catch (err) {
      console.error("Error fetching data:", err);
      setIsLoading(false);
    }
  };

  const renderResponseSection = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center gap-3">
          <span className="loading loading-ring loading-lg text-teal-600"></span>
          <span className="loading loading-ring loading-lg text-teal-600"></span>
          <span className="loading loading-ring loading-lg text-teal-600"></span>
        </div>
      );
    }

    if (!doneTyping && data.llmResponse) {
      return (
        <div className="text-blue-800 font-mono text-base">
          <Typewriter
            words={[data.llmResponse]}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={30}
            deleteSpeed={0}
            delaySpeed={1000}
          />
        </div>
      );
    }

    return (
      <div className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {data.llmResponse || "No explanation available."}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="h-screen bg-slate-50 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form Section */}
        <div className="bg-white p-10 rounded-3xl shadow-lg border">
          <h2 className="text-2xl font-bold text-teal-600 mb-6">🧬 Liver Disease Detection</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(formData).map((label) => (
              <InputField
                key={label}
                label={label}
                value={formData[label]}
                onChange={(val) => handleChange(label, val)}
              />
            ))}
          </div>
          <button
            onClick={handleDetect}
            className="mt-6 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded w-full"
          >
            Detect
          </button>
        </div>

        {/* Response Section */}
        <div className="bg-white p-10 rounded-3xl shadow-lg border overflow-y-auto max-h-[80vh]">
          <h2 className="text-2xl font-bold text-blue-600 mb-4"> 🤖 LLM Response</h2>

          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold text-green-700">
              Prediction: {data.prediction}
            </p>
            <p className="text-lg font-semibold text-cyan-700">
              Probability: {data.probability ? `${data.probability}%` : "—"}
            </p>
          </div>

          {renderResponseSection()}
        </div>
      </div>
    </div>
  );
}

export default App;
