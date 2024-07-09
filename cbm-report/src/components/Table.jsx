import React, { useEffect, useState } from 'react';

import './Table.css';

function Table() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(result => {
        if (result.length > 0) {
          const headerKeys = Object.keys(result[0]);
          setHeaders(headerKeys);
          setData(result);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="Table">
      <header className="table-header">
        <h1>Agent Performance & Statistics</h1>
      </header>
      <div className="filters">
        {/* Your filter components here */}
      </div>
      <div className="table-container">
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => (
                    <td key={colIndex}>{item[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}

export default Table;
