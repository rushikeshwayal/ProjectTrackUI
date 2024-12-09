import React from "react";

const FormDetails = ({ forms, onFormSelect }) => {
  return (
    <div className="relative inline-block text-left">
      <button className="bg-purple-500 text-white px-4 py-2 rounded-md">
        Select Form
      </button>
      <ul className="absolute mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
        {forms.map((form) => (
          <li
            key={form.id}
            className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
            onClick={() => onFormSelect(form)}
          >
            {form.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormDetails;
