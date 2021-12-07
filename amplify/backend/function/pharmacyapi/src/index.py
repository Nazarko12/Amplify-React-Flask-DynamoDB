import awsgi
import json
import boto3
import os
import ast
from flask_cors import CORS
from flask import Flask, jsonify, request
from uuid import uuid4

client = boto3.client("dynamodb")
TABLE = os.environ.get("STORAGE_PHARMACYDB_NAME")
app = Flask(__name__)
CORS(app)
BASE_ROUTE = "/medicine"


@app.route(BASE_ROUTE, methods=['GET'])
def list_pharmicies():
    response = client.scan(TableName=TABLE)
    data = response['Items']
    while response.get('LastEvaluatedKey'):
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])
    return jsonify(data)


@app.route(BASE_ROUTE, methods=['POST'])
def create_pharmacy():
    request_json = request.get_json()
    client.put_item(TableName=TABLE, Item={
        'id': {'S': str(uuid4())},
        'availableMedicine': {'S': request_json.get("availableMedicine")},
        'composition': {'S': request_json.get("composition")},
        'category': {'S': request_json.get("category")},
        'maker': {'S': request_json.get("maker")},
        'price': {'N': request_json.get("price")},
        'packageType': {'S': request_json.get("packageType")},
        'usage': {'S': request_json.get("usage")},
    })
    return jsonify(message="item created")


@app.route(BASE_ROUTE + '/<medicine_id>', methods=['GET'])
def get_pharmacy(medicine_id):
    item = client.get_item(TableName=TABLE, Key={
        'id': {
            'S': medicine_id
        }
    })
    return jsonify(data=item)


@app.route(BASE_ROUTE + '/<medicine_id>', methods=['PUT'])
def update_pharmacy(medicine_id):
    client.update_item(
        TableName=TABLE,
        Key={'id': {'S': medicine_id}},
        UpdateExpression='SET #availableMedicine = :availableMedicine, #composition = :composition, #category = :category, #maker = :maker, #price = :price, #packageType = :packageType, #usage = :usage',
        ExpressionAttributeNames={
            '#availableMedicine': 'availableMedicine',
            '#composition': 'composition',
            '#category': 'category',
            '#maker': 'maker',
            '#price': 'price',
            '#packageType': 'packageType',
            '#usage': 'usage'
        },
        ExpressionAttributeValues={
            ':availableMedicine': {'S': request.json['availableMedicine']},
            ':composition': {'S': request.json['composition']},
            ':category': {'S': request.json['category']},
            ':maker': {'S': request.json['maker']},
            ':price': {'N': request.json['price']},
            ':packageType': {'S': request.json['packageType']},
            ':usage': {'S': request.json['usage']},
        }
    )
    return jsonify(message="item updated")


@app.route(BASE_ROUTE + '/<medicine_id>', methods=['DELETE'])
def delete_pharmacy(medicine_id):
    client.delete_item(
        TableName=TABLE,
        Key={'id': {'S': medicine_id}}
    )
    return jsonify(message="item deleted")


def handler(event, context):
    return awsgi.response(app, event, context)
