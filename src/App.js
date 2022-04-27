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
      setAirportCode(airportCode);
    }
  }

  const handleFilterClear = (event) => {
    event.target.parentElement.reset();

    setAirlineId("all");
    setAirportCode("all");
  }

  const filterByAirline = (routes, airlineId) => {
    return airlineId === "all"
      ? routes
      : routes.filter(route => route.airline === airlineId);
  }

  const filterByAirport = (routes, airportCode) => {
    return airportCode === "all"
      ? routes
      : routes.filter(route => (
        route.src === airportCode || route.dest === airportCode
      ));
  }

  const filteredRoutes = (() => {
    const filteredByAirline = filterByAirline(DATA.routes, airlineId);
    return filterByAirport(filteredByAirline, airportCode);
  })();

  const filteredAirlines = (() => {
    const relevantAirlineIds = filteredRoutes.map(route => route.airline);

    return DATA.airlines.map(airline => {
      const disabled = !relevantAirlineIds.includes(airline.id)
        && airportCode !== "all";

      return {  ...airline, disabled };
    });
  })();

  const filteredAirports = (() => {
    const relevantAirportCodes = filteredRoutes.flatMap(route => (
      [route.src, route.dest]
    ));

    return DATA.airports.map(airport => {
      const disabled = !relevantAirportCodes.includes(airport.code)
        && airlineId !== "all";

      return { ...airport, disabled };
    })
  })();
  
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        Show routes on
        <form>
          <Select 
            options={filteredAirlines}
            valueKey="id"
            titleKey="name"
            allTitle="All Airlines"
            allValue="all"
            onSelect={handleAirlineSelection}
          />
          flying in or out of
          <Select
            options={filteredAirports}
            valueKey="code"
            titleKey="name"
            allTitle="All Airports"
            allValue="all"
            onSelect={handleAirportSelection}
          />
          <button
            type="reset"
            onClick={handleFilterClear}
            disabled={airlineId === "all" && airportCode === "all"}
          >
            Show All Routes
          </button>
        </form>
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