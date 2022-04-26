import React, { Component } from 'react';
import './App.css';

import data from './data';

const App = () => (
  <div className="app">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <table className="routes-table">
      <thead>
        <tr>
          <th>Airline</th>
          <th>Source Airport</th>
          <th>Destination Airport</th>
        </tr>
      </thead>
      {data.routes.map(route => {
        const id = `${route.airline}-${route.src}-${route.dest}` // makeshift id
        return (
          <tr key={id}>
            <td>{route.airline}</td>
            <td>{route.src}</td>
            <td>{route.dest}</td>
          </tr>
        );
      })}
    </table>
  </section>
</div>
);

export default App;