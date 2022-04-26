import React, { Component } from 'react';
import './App.css';

import data, { getAirlineById, getAirportByCode } from './data';

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
        const id = route.airline;
        return (
          <tr key={id}>
            <td>{getAirlineById(route.airline)}</td>
            <td>{getAirportByCode(route.src)}</td>
            <td>{getAirportByCode(route.dest)}</td>
          </tr>
        );
      })}
    </table>
  </section>
</div>
);

export default App;

/*
const routes = [
  {"airline":24,"src":"DFW","dest":"XNA"},
  {"airline":24,"src":"DFW","dest":"FWA"},
  {"airline":24,"src":"TYS","dest":"LGA"},
]

const airlines = [
  {"id":24,"name":"American Airlines"},
  {"id":130,"name":"Aeroflot Russian Airlines"},
  {"id":218,"name":"Air India Limited"},
  {"id":515,"name":"Avianca - Aerovias Nacionales de Colombia"},
  {"id":1767,"name":"China Southern Airlines"},
  {"id":2143,"name":"Egyptair"},
  {"id":3000,"name":"Jet Airways"},
  {"id":3090,"name":"KLM Royal Dutch Airlines"},
  {"id":3200,"name":"LAN Airlines"},
  {"id":3320,"name":"Lufthansa"},
  {"id":4089,"name":"Qantas"},
  {"id":4091,"name":"Qatar Airways"},
  {"id":4248,"name":"Royal Air Maroc"},
  {"id":4305,"name":"South African Airways"},
  {"id":4533,"name":"Saudi Arabian Airlines"},
  {"id":4867,"name":"TAM Brazilian Airlines"},
  {"id":4951,"name":"Turkish Airlines"},
];

const airports = [
  {"code":"YEG","name":"Edmonton International Airport","lat":53.309700012200004,"long":-113.580001831},
  {"code":"YHZ","name":"Halifax / Stanfield International Airport","lat":44.8807983398,"long":-63.5085983276},
]
*/