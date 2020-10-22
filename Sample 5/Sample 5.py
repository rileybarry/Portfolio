# Start by importing the necessary module.
#
from flask import Flask
from flask_restful import Api, Resource, reqparse
# Set up the Flask-RESTful application
app = Flask(__name__)
api = Api(app)


firms = [
    {
        "name": "Apple",
        "price": 256,
        "ticker": "AAPL"
    },
    {
        "name": "Uber",
        "price": 27,
        "ticker": "UBER"
    },
    {
        "name": "SoftBank",
        "price": 19,
        "ticker": "SFTBY"
    },
    {
        "name": "Berkshire Hathaway",
        "price": 330000,
        "ticker": "BRKA"
    }
]


class Firm(Resource):
    def get(self, name):
        for firm in firms:
            if (name == firm["name"]):
                return firm, 200
        return "firm not found", 404

    def post(self, name):
        parser = reqparse.RequestParser()
        parser.add_argument("price")
        parser.add_argument("ticker")
        args = parser.parse_args()

        for firm in firms:
            if(name == firm["name"]):
                return "firm with name {} already exists".format(name), 403

        firm = {
            "name": name,
            "price": args["price"],
            "ticker": args["ticker"]
        }
        firms.append(firm)
        return firm, 200

    def put(self, name):
        parser = reqparse.RequestParser()
        parser.add_argument("price")
        parser.add_argument("ticker")
        args = parser.parse_args()

        for firm in firms:
            if(name == firm["name"]):
                firm["price"] = args["price"]
                firm["ticker"] = args["ticker"]
                return firm, 200

        firm = {
            "name": name,
            "price": args["price"],
            "ticker": arg["ticker"]
        }
        firms.append(firm)
        return firm, 200

    def delete(self, name):
        global firms
        firms = [firm for firm in firms if firm["name"] != name]
        return "{} is deleted.".format(name), 200


api.add_resource(Firm, "/firm/<string:name>")

app.run(debug=True)
