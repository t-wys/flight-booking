from flask import Flask, request
from flask_cors import CORS

STATIONS = [
  {
    "id": 1,
    "name": "Wroclaw Glowny",
    "location": {
      "lat": "51.098333",
      "lon": "17.037222"
    }
  },
  {
    "id": 2,
    "name": "Poznan Glowny",
    "location": {
      "lat": "52.4027",
      "lon": "16.9124"
    }
  },
  {
    "id": 3,
    "name": "Opole Glowne",
    "location": {
      "lat": "50.6623",
      "lon": "17.9266"
    }
  },
  {
    "id": 4,
    "name": "Walbrzych Miasto",
    "location": {
      "lat": "50.7844",
      "lon": "16.2842"
    }
  }
]

CONNECTIONS = [
  {
    "id": 1,
    "idFrom": 1,
    "idTo": 2,
    "distanceKm": 145
  },
  {
    "id": 2,
    "idFrom": 1,
    "idTo": 3,
    "distanceKm": 82
  },
  {
    "id": 3,
    "idFrom": 1,
    "idTo": 4,
    "distanceKm": 71
  }
]

app = Flask(__name__)
cors = CORS(app, resouces={r"/api/*": {"origins": "http://locahost:9000"}})

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/stations")
def get_stations():
  station_query = request.args.get('station-name')
  if station_query:
    return [s for s in filter(lambda station: station_query.lower() in station["name"].lower(), STATIONS)]
  return STATIONS

@app.route("/api/connections/from/<int:from_station_id>/to/<int:to_station_id>")
def get_connection(from_station_id, to_station_id):
  avoid_changes = request.args.get('avoid-changes')
  print(from_station_id, to_station_id)

  conns = [c for c in filter(
    lambda c: (c["idFrom"] == from_station_id and c["idTo"] == to_station_id) or (c["idFrom"] == to_station_id and c["idTo"] == from_station_id),
    CONNECTIONS
  )]

  return conns
