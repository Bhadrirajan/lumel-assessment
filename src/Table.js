import React, { useState } from 'react';

const Table = ({ dataObject }) => {
  const [input, setInput] = useState({});
  const [variance, setVariance] = useState({});
  const [values, setValues] = useState(
    dataObject.rows.reduce((acc, row) => {
      acc[row.id] = row.value;
      row.children.forEach((child) => {
        acc[child.id] = child.value;
      });
      return acc;
    }, {})
  );
  const onInputChange = (id, event) => {
    setInput((prev) => ({ ...prev, [id]: event.target.value }));
  };

  const allocatePercentage = (id) => {
    const inputValue = input[id] || 0;
    setVariance((prev) => ({ ...prev, [id]: `${inputValue}%` }));
  };

  return (
    <table border="1" style={{ borderCollapse: 'collapse', width: '80%' }}>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation %</th>
          <th>Allocation Val</th>
          <th>Variance %</th>
        </tr>
      </thead>
      <tbody>
        {dataObject.rows.map((row) => (
          <React.Fragment key={row.id}>
            <tr style={{ fontWeight: 'bold' }}>
              <td>{row.label}</td>
              <td>{values[row.id]}</td>
              <td>
                <input
                  type="number"
                  value={input[row.id] || ''}
                  onChange={(e) => onInputChange(row.id, e)}
                />
              </td>
              <td>
                <button onClick={() => allocatePercentage(row.id)}>
                  Allocation %
                </button>
              </td>
              <td>
                <button>Allocation value</button>
              </td>
              <td>{variance[row.id] || '0%'}</td>
            </tr>
            {row.children.map((child) => (
              <tr key={child.id}>
                <td style={{ paddingLeft: '20px' }}>- {child.label}</td>
                <td>{values[child.id]}</td>
                <td>
                  <input
                    type="number"
                    value={input[child.id] || ''}
                    onChange={(e) => onInputChange(child.id, e)}
                  />
                </td>
                <td>
                  <button onClick={() => allocatePercentage(child.id)}>
                    Allocation %
                  </button>
                </td>
                <td>
                  <button onClick={() => allocateValue(child.id)}>
                    Allocation value
                  </button>
                </td>
                <td>{variance[child.id] || '0%'}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
