import React, { useState } from 'react';

import { getAirlineById, getAirportByCode } from '../data';

const Table = ({ className, columns, rows, format, perPage }) => {
  perPage = Number(perPage);
  const [firstRow, setFirstRow] = useState(0);

  const headerRows = columns.map(column => (
    <th key={column.name}>{column.name}</th>
  ));

  const tableBodyRows = rows.slice(firstRow, firstRow + perPage)
    .map(route => {
      const id = `${route.airline}-${route.src}-${route.dest}`;

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

  const TableFooter = () => (
    <div>
      <p>Showing {firstRow + 1}-{firstRow + perPage} of {rows.length} routes.</p>
      <button
        disabled={firstRow <= 0}
        onClick={() => setFirstRow(firstRow - perPage)}>
        Previous Page
      </button>
      <button
        disabled={(firstRow + perPage) >= rows.length}
        onClick={() => setFirstRow(firstRow + perPage)}>
        Next Page
      </button>
    </div>
  );

  return (
    <>
      <table className={className}>
      <thead>
        <tr>
          {headerRows}
        </tr>
      </thead>
      <tbody>
        {tableBodyRows}
      </tbody>
    </table>
    <TableFooter />
    </>
  );
};

export default Table;
