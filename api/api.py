import json
from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'Hello World'


# TODO: would be easier to just dump this to file
@app.route('/mock-spots')
def get_parking_spots():
    return json.dumps([
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




if __name__ == '__main__':
    app.run()
