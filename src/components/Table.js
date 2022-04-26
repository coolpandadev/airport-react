import React from 'react';

import { getAirlineById, getAirportByCode } from '../data';

const Table = ({ columns, rows, format }) => {
  const headerRows = columns.map(column => (
    <th key={column.name}>{column.name}</th>
  ));

  const tableBodyRows = rows.map(route => {
    const id = route.airline;

    return (
      <tr key={id}>
        {columns.map(column => {
          const datum = column.property === 'airline'
          ? getAirlineById(route.airline)
          : getAirportByCode(route[column.property]);

          return <td key={column.name}>{datum}</td>
        })}
      </tr>
    );
  });

  return (
    <>
      <table>
      <thead>
        <tr>
          {headerRows}
        </tr>
      </thead>
      <tbody>
        {tableBodyRows}
      </tbody>
    </table>
    </>
  );
};

export default Table;