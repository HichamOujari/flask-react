from flask import Flask,request,render_template, request, jsonify,redirect, url_for
import os

app = Flask(__name__)



@app.route('/', methods = ['GET'])
def index():
    return 'Welcome to Amazigh Detection App - Backend Side'


@app.route('/read-picture', methods = ['POST'])
def readPicture():
    data = request.files['image']
    data.save(os.path.join("uploads", data.filename))


    #path de l'image à traiter
    imagePath = "./uploads/"+data.filename
    

    #le tratement à faire
    

    #à la fin du traiter affecter le rslt a la variable rslt
    rslt = "Yach - ز"

    response = jsonify(rslt)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


app.run(host='127.0.0.1', port=3002)