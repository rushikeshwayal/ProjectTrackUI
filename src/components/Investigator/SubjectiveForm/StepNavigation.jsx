import React from "react";

const StepNavigation = ({ steps, currentStep, onStepClick }) => {
  return (
    <nav className="flex justify-center items-center bg-gray-100 py-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex items-center ${
            index < steps.length - 1 ? "pr-4" : ""
          }`}
        >
          <button
            onClick={() => onStepClick(index)}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              index <= currentStep
                ? "bg-purple-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {index + 1}
          </button>
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-16 ${
                index < currentStep
                  ? "bg-purple-500"
                  : "bg-gray-300"
              }`}
            ></div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default StepNavigation;
