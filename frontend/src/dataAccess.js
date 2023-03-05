export const apiBaseUrl = "http://localhost:5000/api";

const state = {
  startStation: undefined,
  destStation: undefined,
  avoidChanges: false
};
let suggestedStations = [];

export function getStationSuggestions(datalistHTML, stationName) {
  fetch(`${apiBaseUrl}/stations?station-name=${stationName}`)
  .then(resp => resp.json())
  .then(data => {
      suggestedStations = data;
      datalistHTML.innerHTML = '';
      data.forEach(station => {
        const stationOption = document.createElement('option');
        stationOption.value = station.name;
        datalistHTML.appendChild(stationOption);
      });
    })
  .catch(err => console.error("Error fetching stations", err));
}

export function setSelectedStartStation(stationName) {
  const station = suggestedStations.find(s => s.name === stationName);
  state.startStation = station;
  console.log(state);
}

export function setSelectedDestStation(stationName) {
  const station = suggestedStations.find(s => s.name === stationName);
  state.destStation = station;
  console.log(state);
}

export function findConnections() {
  let url = `${apiBaseUrl}/connections/from/${state.startStation.id}/to/${state.destStation.id}`;
  if (state.avoidChanges) {
    url += `?avoid-changes=true`;
  }
  fetch(url)
  .then(resp => resp.json())
  .then(data => console.log('a list of possile connections'))
  .catch(err => console.error("Error while searching connections", err));
}