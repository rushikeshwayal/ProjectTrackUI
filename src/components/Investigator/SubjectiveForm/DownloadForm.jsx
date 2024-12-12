import { useState } from 'react';
import FormI from './Form/Form-I';
import FormII from './Form/Form-II';
import FormIII from './Form/Form-III';
import FormIV from './Form/Form-IV';
// Import other forms as needed

const DownloadForm = () => {
  const [selectedForm, setSelectedForm] = useState('');

  const forms = [
    { label: "FORM-I_NEW" },
    { label: "FORM-II_NEW" },
    { label: "FORM-III_NEW" },
    { label: "FORM-IV_NEW" },
    { label: "FORM-V_NEW" },
    { label: "FORM-VI_NEW" },
    { label: "FORM-VII_NEW" },
    { label: "FORM-VIII_NEW" },
    { label: "FORM-IX_NEW" },
    { label: "FORM-X_NEW" },
    { label: "FORM-XI_NEW" },
    { label: "FORM-XII_NEW" },
    { label: "FORM-XIII_NEW" },
  ];

  const renderForm = () => {
    switch (selectedForm) {
      case "FORM-I_NEW":
        return (
          <div>
            <FormI />
          </div>
        );
      case "FORM-II_NEW":
        return (
          <div>
            <FormII />
          </div>
        );
      case "FORM-III_NEW":
        return (
          <div>
            <FormIII />
          </div>
        );
      case "FORM-IV_NEW":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Form IV</h2>
            <FormIV />
            <form action="/post/form-iv" method="POST">
              <formIV/>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                Submit Form IV
              </button>
            </form>
          </div>
        );
      case "FORM-V_NEW":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Form V</h2>
            <form action="/post/form-v" method="POST">
              {/* Add Form V fields here */}
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                Submit Form V
              </button>
            </form>
          </div>
        );
      case "FORM-VI_NEW":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Form VI</h2>
            <form action="/post/form-vi" method="POST">
              {/* Add Form VI fields here */}
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                Submit Form VI
              </button>
            </form>
          </div>
        );
      case "FORM-VII_NEW":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Form VII</h2>
            <form action="/post/form-vii" method="POST">
              {/* Add Form VII fields here */}
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                Submit Form VII
              </button>
            </form>
          </div>
        );
      case "FORM-VIII_NEW":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Form VIII</h2>
            <form action="/post/form-viii" method="POST">
              {/* Add Form VIII fields here */}
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                Submit Form VIII
              </button>
            </form>
          </div>
        );
      case "FORM-IX_NEW":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Form IX</h2>
            <form action="/post/form-ix" method="POST">
              {/* Add Form IX fields here */}
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                Submit Form IX
              </button>
            </form>
          </div>
        );
      case "FORM-X_NEW":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Form X</h2>
            <form action="/post/form-x" method="POST">
              {/* Add Form X fields here */}
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                Submit Form X
              </button>
            </form>
          </div>
        );
      case "FORM-XI_NEW":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Form XI</h2>
            <form action="/post/form-xi" method="POST">
              {/* Add Form XI fields here */}
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                Submit Form XI
              </button>
            </form>
          </div>
        );
      case "FORM-XII_NEW":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Form XII</h2>
            <form action="/post/form-xii" method="POST">
              {/* Add Form XII fields here */}
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                Submit Form XII
              </button>
            </form>
          </div>
        );
      case "FORM-XIII_NEW":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Form XIII</h2>
            <form action="/post/form-xiii" method="POST">
              {/* Add Form XIII fields here */}
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                Submit Form XIII
              </button>
            </form>
          </div>
        );
      default:
        return <p className="text-gray-600">Please select a form from the dropdown menu above.</p>;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Dynamic Form Submission</h1>
      <select
        className="border border-gray-300 p-2 rounded mb-4"
        value={selectedForm}
        onChange={(e) => setSelectedForm(e.target.value)}
      >
        <option value="">Select a Form</option>
        {forms.map((form, index) => (
          <option key={index} value={form.label}>
            {form.label}
          </option>
        ))}
      </select>
      <div className="mt-4">{renderForm()}</div>
    </div>
  );
};

export default DownloadForm;
