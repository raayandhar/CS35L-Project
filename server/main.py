from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess

app = Flask(__name__)

CORS(app)

# temporary local login DB
logins = {
    "kylecj21": 'password',
    "AleHuerta" : 'IRunSlow',
    "Smallberg" : 'I<3C++'
}



@app.route('/signup', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username in logins:
        return jsonify({"message": "Username taken", "status": 401}), 401
    else:
        logins[username] = password
        return jsonify({"message": "Registration successful", "status": 200}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')   
    print(logins)
    if username not in logins:
        return jsonify({"message": "User not found", "status": 401}), 401
    elif username in logins and logins[username] == password:
        return jsonify({"message": "Login successful", "status": 200}), 200
    else:
        return jsonify({"message": "Login failed", "status": 401}), 401

@app.route('/prompt_recv', methods=['GET','POST'])
def prompt():
    prompt = request.get_json()
    prompt = prompt.get('prompt')
    print(prompt)

    subprocess.run(
    ['python3', 'fastsdcpu/src/app.py', '--prompt', prompt],
        check=True  # Optional: raises an error if the command fails
    )
    
    return jsonify({"prompt": prompt})



@app.route('/')
def home():
    return jsonify({"message": "Hello, World!"})


if __name__ == '__main__':
    app.run(debug=True)
