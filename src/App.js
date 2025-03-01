import React from 'react';
import './style.css';
import Table from './Table.js';

export default function App() {
  let tableData = {
    rows: [
      {
        id: 'electronics',
        label: 'Electronics',
        value: 1400, //this value needs to be calculated from the children values (800+700)
        children: [
          {
            id: 'phones',
            label: 'Phones',
            value: 800,
          },
          {
            id: 'laptops',
            label: 'Laptops',
            value: 700,
          },
        ],
      },
      {
        id: 'furniture',
        label: 'Furniture',
        value: 1000, //this need to be calculated from the children values (300+700)
        children: [
          {
            id: 'tables',
            label: 'Tables',
            value: 300,
          },
          {
            id: 'chairs',
            label: 'Chairs',
            value: 700,
          },
        ],
      },
    ],
  };
  return (
    <div>
      <Table dataObject={tableData} />
    </div>
  );
}
