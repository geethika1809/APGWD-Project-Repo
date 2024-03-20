import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import Navibar from '../components/Navibar'
import Foot from '../components/Foot';


const Report = () => {
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleDownload = () => {
    // Assuming you have data to generate the report
    const reportData = generateReport(selectedMonth);

    // Convert report data to CSV format
    const csvData = [
      ['PZ_ID', 'District Name', 'Mandal Name', 'Village Name', 'Water Levels'],
      ...reportData.map(item => [item.PZ_ID, item.districtName, item.mandalName, item.villageName, item.waterLevels])
    ].map(row => row.join(','));

    // Create a Blob with the CSV data
    const blob = new Blob([csvData.join('\n')], { type: 'text/csv;charset=utf-8' });

    // Save the Blob as a file using FileSaver.js
    saveAs(blob, `report_${selectedMonth}.csv`);
  };

  const generateReport = (month) => {
    // Here you would typically fetch data from the backend based on the selected month
    // For demonstration, I'll return some dummy data
    const dummyData = [
      { PZ_ID: 1, districtName: 'District 1', mandalName: 'Mandal 1', villageName: 'Village 1', waterLevels: 100 },
      { PZ_ID: 2, districtName: 'District 2', mandalName: 'Mandal 2', villageName: 'Village 2', waterLevels: 120 },
      // Add more dummy data as needed
    ];

    return dummyData;
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="report">
      <Navibar/>

      <div className="dashboard-container">
        <h1 className='gojo'>Welcome!</h1>
        <div className="dropdown-container">
          <label htmlFor="month-dropdown"><b className='gojo'>Select Month:</b></label>
          <select id="month-dropdown" onChange={handleMonthChange} value={selectedMonth}>
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>PZ_ID</th>
              <th>District Name</th>
              <th>Mandal Name</th>
              <th>Village Name</th>
              <th>Water Levels</th>
            </tr>
          </thead>
          <tbody>
            {generateReport(selectedMonth).map((item, index) => (
              <tr key={index}>
                <td>{item.PZ_ID}</td>
                <td>{item.districtName}</td>
                <td>{item.mandalName}</td>
                <td>{item.villageName}</td>
                <td>{item.waterLevels}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="download-container">
          <button className="download-button" onClick={handleDownload} disabled={!selectedMonth}>
            Download as Excel
          </button>
          <Foot/>

        </div>
      </div>
    </div>
    
  );
};

export default Report;
