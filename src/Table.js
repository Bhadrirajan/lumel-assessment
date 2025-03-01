import React, { useState } from 'react';
import './style.css';

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
    console.log(input[id]);
    if (input[id] === null || '' || 'undefined') {
      return;
    }

    setValues((prevValues) => {
      const originalValue =
        dataObject.rows
          .flatMap((row) => [row, ...row.children])
          .find((item) => item.id === id)?.value || 0;
      console.log(originalValue);

      const newValue =
        originalValue + (originalValue * parseFloat(input[id])) / 100;

      const variancePercentage =
        ((newValue - originalValue) / originalValue) * 100;

      const updatedValues = { ...prevValues, [id]: newValue };
      const updatedVariance = {
        ...variance,
        [id]: variancePercentage.toFixed(2) + '%',
      };

      dataObject.rows.forEach((row) => {
        if (row.children.some((child) => child.id === id)) {
          const updatedParentValue = row.children.reduce(
            (sum, child) =>
              sum + (child.id === id ? newValue : prevValues[child.id]),
            0
          );
          updatedValues[row.id] = updatedParentValue;

          const originalParentValue = row.value;
          updatedVariance[row.id] =
            (
              ((updatedParentValue - originalParentValue) /
                originalParentValue) *
              100
            ).toFixed(2) + '%';
        }
      });

      setVariance(updatedVariance);
      setInput('');
      return updatedValues;
    });
  };

  const allocateValue = (id) => {
    if (input[id] === null || '' || 'undefined') {
      return;
    }
    setValues((prevValues) => {
      const originalValue =
        dataObject.rows
          .flatMap((row) => [row, ...row.children])
          .find((item) => item.id === id)?.value || 0;
      console.log(originalValue);
      const newValue = parseFloat(input[id]) || originalValue;

      const variancePercentage =
        ((newValue - originalValue) / originalValue) * 100;

      const updatedValues = { ...prevValues, [id]: newValue };
      const updatedVariance = {
        ...variance,
        [id]: variancePercentage.toFixed(2) + '%',
      };

      dataObject.rows.forEach((row) => {
        if (row.children.some((child) => child.id === id)) {
          const updatedParentValue = row.children.reduce(
            (sum, child) =>
              sum + (child.id === id ? newValue : prevValues[child.id]),
            0
          );
          updatedValues[row.id] = updatedParentValue;

          const originalParentValue = row.value;
          updatedVariance[row.id] =
            (
              ((updatedParentValue - originalParentValue) /
                originalParentValue) *
              100
            ).toFixed(2) + '%';
        }
      });

      setVariance(updatedVariance);
      setInput('');
      return updatedValues;
    });
  };

  return (
    <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation percentage</th>
          <th>Allocation Value</th>
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
                <button id="percent" onClick={() => allocatePercentage(row.id)}>
                  Allocation percentage for {row.label}
                </button>
              </td>
              <td>
                <button id="value" onClick={() => allocateValue(child.id)}>
                  Allocate value for {row.label}
                </button>
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
                  <button
                    id="percent"
                    onClick={() => allocatePercentage(child.id)}
                  >
                    Allocation percentage for {child.label}
                  </button>
                </td>
                <td>
                  <button id="value" onClick={() => allocateValue(child.id)}>
                    Allocate value for {child.label}
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
