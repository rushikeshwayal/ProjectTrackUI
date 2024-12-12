import { useState } from 'react';

const SubjectiveForm = () => {
  // Sample data for the table
  const sampleData = [
    { srNo: 1, name: 'FORM-1', formName: 'Format for Submission of basic Project Proposal', description: 'Project proposal form for science and technology grant.', link: 'https://drive.google.com/file/d/1nR2gsAUDFmyC_SAxCR0KERK45LUvMRI0/view?usp=sharing' },
    { srNo: 2, name: 'FORM-IA', formName: 'Endorsement from Head of the Institution / Organisation ', description: 'Institutional endorsement and project commitment letter.', link: 'https://drive.google.com/file/d/1sAdf_Ip7aq2llXctq2GuekhSo2lsvXEM/view?usp=sharing' },
    { srNo: 3, name: 'FORM-II', formName: 'Fund Requisition', description: 'Fund requisition form for project financial details.', link: 'https://drive.google.com/file/d/1b_a_47wEp7K0ELMj4ovYs6LbpQEoGehp/view?usp=sharing' },
    { srNo: 4, name: 'FORM-III', formName: 'Financial Expenditure Statement', description: 'Quarterly expenditure statement tracking project spending.', link: 'https://drive.google.com/file/d/1EcPYynAXVl6gon8GC06eVKxHu1SuUxz8/view?usp=sharing' },
    { srNo: 5, name: 'FORM-IV', formName: 'Expenditure statement for Equipment', description: 'Quarterly expenditure statement tracking project spending.', link: 'https://drive.google.com/file/d/1y1pbxCH_ry9YtjWDIJLFg44EOzryLoVE/view?usp=sharing' },
  ];
  

  return (
    <div className="flex min-h-screen p-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Sr. No</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Form Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">View/Download</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 text-center">{row.srNo}</td>
              <td className="border border-gray-300 px-4 py-2">{row.name}</td>
              <td className="border border-gray-300 px-4 py-2">{row.formName}</td>
              <td className="border border-gray-300 px-4 py-2">{row.description}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <a href={row.link} className="text-blue-500 underline">
                  View/Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectiveForm;
