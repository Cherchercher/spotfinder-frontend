import json
from flask import Flask
from flask_cors import CORS
from finder import load_map, is_horizontal, find_space_for_driver, fill_lot, select_starting_point
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
    icon_size = [40, 40]
    roads = []
    for row_idx, row in enumerate(map):
        for col_idx, col in enumerate(row):
            if col == '-' or col == 's':
                roads.append({
                    'iconSize': icon_size,
                    'iconAnchor': [offset[0] + col_idx * icon_size[0],
                        offset[1] + row_idx * icon_size[1]],
                    'iconUrl': "road1",
                    'horizontal': is_horizontal([row_idx, col_idx], map)
                })
    return jsonify(roads)


@app.route('/marker/parking-spots')
def get_microlot_parking_spots():
    map = load_map("micro_lot.txt")
    size = 1.0
    offset = [0, 0]
    icon_size = [40, 40]
    roads = []
    for row_idx, row in enumerate(map):
        for col_idx, col in enumerate(row):
          if col == "#":
                roads.append({
                    'iconSize': icon_size,
                    'iconAnchor': [offset[0] + col_idx * icon_size[0],
                        offset[1] + row_idx * icon_size[1]],
                    'iconUrl': "parkingSpot1",
                })
    [row_idx, col_idx] = select_starting_point(map)
    roads.append({
        'iconSize': icon_size,
        'iconAnchor': [offset[0] + col_idx * icon_size[0],
            offset[1] + row_idx * icon_size[1]],
        'iconUrl': "car1",
        'horizontal': is_horizontal([row_idx, col_idx], map)
    })
    return jsonify(roads)


@app.route('/navigate/route')
def get_route_to_closest_parking_space():
    """Generate a route to a free parking spot
    """
    map = load_map("micro_lot.txt")
    # fill lot
    lot = fill_lot(map, 35)
    new_lot, instructions = find_space_for_driver(lot)
    return jsonify(instructions)


if __name__ == '__main__':
    app.run()
