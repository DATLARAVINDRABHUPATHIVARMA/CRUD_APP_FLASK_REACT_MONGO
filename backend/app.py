from flask import Flask,render_template,request,jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017')
db = client['flaskreactfullstack'] ##DataBase name
CORS(app) #prevents the cors error

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/users',methods=['POST','GET'])
def data():

    if request.method == 'POST':
        body = request.json
        firstName = body['firstName']
        lastName = body['lastName']
        emailId = body['emailId']
        skill = body['skill']
        position = body['position']

        db['users'].insert_one({
            'firstName':firstName,
            'lastName':lastName,
            'emailId':emailId,
            'skill':skill,
            'position':position

        })
        return jsonify({
            'status':'Data is posted to MongoDB',
            'firstName':firstName,
            'lastName':lastName,
            'emailId':emailId,
            'skill':skill,
            'position':position
        })
        
    if request.method == 'GET':
        allData = db['users'].find()
        dataJson = []
        for data in allData:
            id = data['_id']
            firstName = data['firstName']
            lastName = data['lastName']
            emailId = data['emailId']
            skill = data['skill']
            position = data['position']
            
            dataDict = {
                'id':str(id),
                'firstName':firstName,
                'lastName':lastName,
                'emailId':emailId,
                'skill':skill,
                'position':position
                }
            dataJson.append(dataDict)
        print(dataJson)
        return jsonify(dataJson)

@app.route('/users/<string:id>',methods=['GET','PUT','DELETE'])
def onedata(id):

    if request.method == "GET":
        data = db['users'].find_one({"_id":ObjectId(id)})
        id = data['_id']
        firstName = data['firstName']
        lastName = data['lastName']
        emailId = data['emailId']
        skill = data['skill']
        position = data['position']

        dataDict = {
            'id':str(id),
            'firstName':firstName,
            'lastName':lastName,
            'emailId':emailId,
            'skill':skill,
            'position':position
            }
        
        return jsonify(dataDict)

    if request.method == "DELETE":
        db['users'].delete_many({"_id":ObjectId(id)})
        return jsonify({
            'status':"Data id:"+id+'is deleted'
        })

    if request.method == "PUT":
        body = request.json
        firstName = body['firstName']
        lastName = body['lastName']
        emailId = body['emailId']
        skill = body['skill']
        position = body['position']

        db['users'].update_one(
            {'_id': ObjectId(id)},
            {
                "$set": {
                    "firstName":firstName,
                    "lastName":lastName,
                    "emailId":emailId,
                    "skill":skill,
                    "position":position
                }
            }
        )

        return jsonify({"status":"Data id:"+id+'is updated!'})


if __name__ == '__main__':
    app.debug = True
    app.run()