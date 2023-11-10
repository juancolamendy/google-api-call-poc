# dependencies
import os

from dotenv import load_dotenv

from fastapi import FastAPI

# load env
load_dotenv()

# global vars
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

# init
# init web application
app = FastAPI()

@app.get("/")
def index():
    return "Hello World"

