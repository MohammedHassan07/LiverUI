function InputField({ label, value, onChange }) {
    return (
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-600">
          {label}
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
        />
      </div>
    );
  }
  
  export default InputField;
  