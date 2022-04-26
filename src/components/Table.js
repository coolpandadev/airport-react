import React, { useState } from 'react';

import { getAirlineById, getAirportByCode } from '../data';

const Table = ({ columns, rows, format, perPage }) => {
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
      <button>Previous Page</button>
      <button onClick={() => setFirstRow(firstRow + perPage)}>
        Next Page
      </button>
    </div>
  );

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
    <TableFooter />
    </>
  );
};

export default Table;

/*
Step 5: Add Pagination to Table
Update the Table component so that only 25 rows are shown at a time
Display a message that says Showing n - n+25 routes of x total routes
Display Previous Page and Next Page buttons
Adjust the page shown when the buttons are clicked
Disable the paging controls to prevent a user from going outside valid bounds
Allow the number of rows per page to be specified as a perPage prop

we could create a data store that encapsules the current range of rows to be shown

or we could use useState to specify... in such a simple project useState is probably the way to go

useState could specify the index number of the first row to be displayed

the state need only be a concern of Table's, not App's
*/