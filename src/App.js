import React, { useState } from 'react';
import './App.css';

import DATA, { getAirlineIdByName, getAirportCodeByName } from './data';

import Table from './components/Table';
import Select from './components/Select';

const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];


const App = () => {
  const [airlineId, setAirlineId] = useState("all");
  const [airportCode, setAirportCode] = useState("all");

  function formatValue(property, value) { /* return a string */ }

  const handleAirlineSelection = (event) => {
    const airlineName = event.target.value;
    console.log(airlineName)

    if (airlineName === "all") {
      setAirlineId("all");
    } else {
      const airlineId = getAirlineIdByName(airlineName);
      setAirlineId(airlineId);
    }
  };

  const handleAirportSelection = (event) => {
    const airportName = event.target.value;

    if (airportName === "all") {
      setAirportCode("all");
    } else {
      const airportCode = getAirportCodeByName(airportName);
      console.log(airportCode);
      setAirportCode(airportCode);
    }
  }

  const airlineFilter = airlineId === "all"
    ? [...DATA.routes]
    : DATA.routes.filter(route => route.airline === airlineId);

  const filteredRoutes = airportCode === "all"
    ? airlineFilter
    : airlineFilter.filter(route => (
      route.src === airportCode || route.dest === airportCode
    ));

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        Show routes on
        <Select 
          options={DATA.airlines}
          valueKey="id"
          titleKey="name"
          allTitle="All Airlines"
          allValue="all"
          onSelect={handleAirlineSelection}
        />
        flying in or out of
        <Select
          options={DATA.airports}
          valueKey="code"
          titleKey="name"
          allTitle="All Airports"
          allValue="all"
          onSelect={handleAirportSelection}
        />
        <Table
          className="routes-table"
          columns={columns}
          rows={filteredRoutes}
          format={formatValue}
          perPage="25"
        />
      </section>
    </div>
  );
}

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