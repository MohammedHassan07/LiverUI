import React, { useState } from "react";
import InputField from "./components/InputField";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


function App() {

  const [data, setData] = useState({})

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
    Albumin_and_Globulin_Ratio: ""
  });

  const handleChange = (label, value) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const handleDetect = async () => {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await res.json();

      setData(result)

      console.log(result);

    } catch (err) {
      console.error("Prediction request failed:", err);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-cyan-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-100">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-teal-700 uppercase mb-8">
            🧬 Liver Disease Detection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Object.keys(formData).map((key) => (
              <InputField
                key={key}
                label={key}
                value={formData[key]}
                onChange={(val) => handleChange(key, val)}
              />
            ))}
          </div>
          <button
            onClick={handleDetect}
            className="mt-8 w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-full text-lg font-semibold tracking-wide shadow-md transition duration-300 
                             hover:shadow-[0_0_15px_5px_rgba(0,204,204,0.5)] hover:scale-105"
          >
            DETECT
          </button>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-100 min-h-screen">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-blue-700 uppercase mb-6">
            🤖 LLM Response
          </h2>
          <div className="flex justify-evenly item-center border-b-2 border-from-teal-500 ">

            <h3>Prediction: {data.prediction}</h3>
            <h3>Probability: {data.probability} %</h3>
          </div>
          <div className="text-slate-700 text-lg leading-relaxed max-h-96 overflow-y-auto">


            {/* <p>{data.llmResponse}</p>
             */}
            <div className="  prose prose-lg max-w-none prose-headings:text-blue-700 prose-li:marker:text-teal-600 prose-strong:text-teal-700 prose-a:text-blue-500">
              {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {data.llmResponse}
              </ReactMarkdown> */}

              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae culpa impedit repellendus velit ipsa? Et maxime eaque ipsum iste! Eum ipsa vel repudiandae et nobis asperiores libero fuga, velit saepe quos reprehenderit sunt accusantium unde culpa maiores harum aliquam obcaecati totam non? Obcaecati, sint incidunt, fugiat aliquid eum quod iure voluptas voluptatibus quisquam nihil dolore error molestias corporis perspiciatis quidem doloremque quibusdam. Repellendus accusantium illum, porro provident adipisci nobis molestiae labore illo neque possimus corporis omnis quos vel aspernatur consequuntur explicabo. Debitis quas nesciunt at, veritatis vitae non perferendis et, numquam voluptas veniam dignissimos laboriosam consequuntur possimus molestiae fugiat aperiam, velit amet fugit repellendus quam explicabo in iste? Velit distinctio eaque quia! Minima, aut dolor. Animi, et unde. Accusantium, iusto numquam? Molestiae accusantium quibusdam voluptatum, aut, nostrum error temporibus voluptate earum quisquam voluptatibus cumque molestias. Molestias, voluptate placeat laboriosam consequuntur labore cumque saepe consequatur fugiat magnam accusamus nihil rerum eligendi. Delectus esse eaque repellendus aliquam! Quibusdam at quis impedit ipsam iste beatae, repellat, temporibus illo nobis officiis, consectetur aliquam? Soluta ea nostrum repudiandae eligendi quibusdam temporibus ipsa, deserunt voluptates expedita deleniti placeat cumque, laborum cupiditate voluptate vel? Et, porro eum fugiat eos omnis aspernatur similique repellendus! A accusamus fuga iusto!
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
