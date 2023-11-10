# dependencies
import os

from dotenv import load_dotenv

# init
# load env
load_dotenv()

# global vars
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

print(client_id)
print(client_secret)
