import json
from flask import Flask
from flask_cors import CORS
from finder import load_map
from flask import jsonify


app = Flask(__name__)
CORS(app)

# TODO: eventually this would have to be stored in a proper DB
top_left = [33.8003, -117.8827]
city = "Los Angeles"
state = "CA"
country = "USA"


@app.route('/')
def hello_world():
    return 'Hello World'


# TODO: would be easier to just dump this to file
@app.route('/mock-spots')
def get_parking_spots():
    return jsonify([
        {
            'id': 1,
            'name': "1",
            'lat': 33.8003,
            'lng': -117.8827,
            'city': "Los Angeles",
            'state': "CA",
            'available': True,
        },
        {
            'id': 2,
            'name': "2",
            'lat': 33.8005,
            'lng': -117.8832,
            'city': "Los Angeles",
            'state': "CA",
            'available': True,
        },
        {
            'id': 3,
            'name': "3",
            'lat': 33.7995,
            'lng': -117.8802,
            'city': "Los Angeles",
            'state': "CA",
            'available': True,
        },
        {
            'id': 4,
            'lat': 33.7985,
            'lng': -117.8812,
            'name': "4",
            'city': "Los Angeles",
            'state': "CA",
            'available': False,
        },
        {
            'id': 5,
            'lat': 33.7997,
            'lng': -117.8852,
            'name': "5",
            'city': "Los Angeles",
            'state': "CA",
            'available': True,
        },
    ])



@app.route('/mock-micro-lot')
def get_micro_lot():
    map = load_map("micro_lot.txt")
    id = 0
    size = 1.0

    lot = []
    for row_idx, row in enumerate(map):
        for col_idx, col in enumerate(row):
            if col == '#' or col == 'c':
                lot.append({
                    'id': id,
                    'name': "{}".format(id),
                    'lat': top_left[1] + size * row_idx,
                    'lng': top_left[0] + size * col_idx,
                    'city': city,
                    'state': state,
                    'country': country,
                    'available': col == '#',
                })
                id += 1
    return jsonify(lot)

@app.route('/marker/roads')
def get_roads():
    map = load_map("micro_lot.txt")
    size = 1.0

    offset = [0, 0]

    roads = []
    for row_idx, row in enumerate(map):
        for col_idx, col in enumerate(row):
            if col == '-' or col == 's':
                roads.append({
                    'iconSize': [25, 41],
                    'iconAnchor': [offset[0] + col_idx, offset[1] + row_idx],
                    'iconUrl': "road1",
                })
    return jsonify(roads)


if __name__ == '__main__':
    app.run()
