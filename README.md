# FluxDiffusionImageGen
Full-Stack application with python + flask + pytorch backend, react + JS frontend

# Getting Started
Currently, the project runs frontend and backend through Python, since we haven't setup react

1. If first time with project, create a python virtual environment with the command (you might need to put Python3):
``` Python -m venv venv ```
2. Activate the venv
``` source venv/bin/activate```
3. Next, install the pip dependencys with the following command:
``` pip install -r requirements.txt```
4. Next, run the main.py:
``` Python main.py```

The Project should be running in the local url http://127.0.0.1:8889. The above instructions are for Mac, but you can google
equivalent ones for Windows if needed. If you use python3, you might need to use pip3.

The current status is tentative, and will be changed to have a react frontend like the project spec indicates.

The backend image generation won't run yet, it will return an empty image, but you can confirm the project runs

# To Do:
1. Incorporate React frontend
2. Come up with frontend design
3. Setup flask endpoints for backend
4. Decide on Database option (SQLite, MongoDB, something else online)
5. Login/Logout features
6. 2 other features
7. Ale + Kyle setup Image generation pipeline through backend