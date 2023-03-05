import { style } from './styles/main.scss';
const helpers = require('./helpers');
const dataAccess = require('./dataAccess');

const minQueryLength = 3;

const startStationInput = document.querySelector('input#start');
const startStationsDatalist = document.querySelector('datalist#start-stations');
const destStationInput = document.querySelector('input#dest');
const destStationsDatalist = document.querySelector('datalist#dest-stations');
const datetimeInput = document.querySelector('input#trip-datetime');

const processChangesForStart = helpers.debounce(() => {
  const query = startStationInput.value;
  if (query && query.length >= minQueryLength) {
    dataAccess.getStationSuggestions(startStationsDatalist, query);
  }
});
window.processChangesForStart = processChangesForStart;

const processChangesForDest = helpers.debounce(() => {
  const query = destStationInput.value;
  if (query && query.length >= minQueryLength) {
    dataAccess.getStationSuggestions(destStationsDatalist, query);
  }
});
window.processChangesForDest = processChangesForDest;

startStationInput.addEventListener('input', () => {
  const selectedStation = startStationInput.value;
  const options = startStationsDatalist.childNodes;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === selectedStation) {
      dataAccess.setSelectedStartStation(selectedStation);
      break;
    }
  }
});

destStationInput.addEventListener('input', () => {
  const selectedStation = destStationInput.value;
  const options = destStationsDatalist.childNodes;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === selectedStation) {
      dataAccess.setSelectedDestStation(selectedStation);
      break;
    }
  }
});

window.addEventListener('load', () => {
  const ts = new Date();
  const date = ts.toISOString().split('T')[0];
  datetimeInput.min = `${date}T00:00:00`;
});
