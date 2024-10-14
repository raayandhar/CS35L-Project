import sys
import os
import joblib
import paramiko
from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import app
import logger
import requests
import base64
from io import BytesIO
from PIL import Image
import base64
import numpy as np
from waitress import serve
import atexit
from dotenv import load_dotenv

#sshpassword = os.environ.get("FLASK_APP_PASSWORD")

#print(os.environ)

"""
def load_model():

   ale_35l_updated.load_checkpoint()

def run_inference(input):
    
    print("running inference")
    results = ale_35l_updated.main(input, queue_size=1)

    return results

"""
load_dotenv()

app = Flask(__name__)

ssh_client = paramiko.SSHClient()

def connect_to_server():
    key = os.environ.get("LINUX_PASSWORD")
    try:
        print("Connecting to server...")
        ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        hostname = '128.97.181.141'
        username = 'Administrator'

        ssh_client.connect(hostname=hostname, username=username, password=key)
        return True
    except Exception as e:
        print("error", e)
        return False
    
def disconnect_from_server():
    
    print("Disconnecting from server...")
    ssh_client.close()

@app.route('/', methods=["GET", "POST"])
def index():
    if request.method == "POST":

        print("made it HRERE")

        prompt = request.form['image']

        script_path = r"D:\downloads\ComfyUI_windows_portable_nvidia\ComfyUI_windows_portable\ComfyUI\custom_nodes\ComfyUI-SaveAsScript\ale_model_script.py"
        
        command = f'python "{script_path}" "{prompt}"'

        try:
            stdin, stdout, stderr = ssh_client.exec_command(command)

            
            for line in stdout:
                print ("out: ",line)

            for line in stderr:
                print ("err: ",line)

        except Exception as e:
            print("error", e)

            #image = run_inference(prompt)

            #img_byte_arr = BytesIO()

            #image.save(img_byte_arr, format='PNG')

            #byte_data = img_byte_arr.getvalue()

            #encoded_image = base64.b64encode(byte_data).decode('utf-8')

            #return render_template('result.html', prompt=prompt, image=encoded_image)

            print("done")

            disconnect_from_server()

        return render_template('result.html', prompt=prompt)
    
    else:

        return render_template('index.html')


mode = 'dev'
#mode = 'production'

if __name__ == "__main__": 
    if mode == 'dev':
        """
        connect_to_server()

        script_path = r"D:\downloads\ComfyUI_windows_portable_nvidia\ComfyUI_windows_portable\ComfyUI\custom_nodes\ComfyUI-SaveAsScript\ale_model_script.py"
        
        command = f'python "{script_path}" "--load-model"'

        stdin, stdout, stderr = ssh_client.exec_command(command)

        try:
            stdin, stdout, stderr = ssh_client.exec_command(command)
            
            for line in stdout:
                print ("out: ",line)

            for line in stderr:
                print ("err: ",line)

        except Exception as e:
            print("error", e)
        """
        app.run(debug=True, use_reloader=False, port=8889)
    
    else:
        serve(app, use_reloader = False, host='0.0.0.0', port=5000, threads = 1)