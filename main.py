# dependencies
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import RedirectResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from google_auth_oauthlib.flow import Flow
from starlette.middleware.sessions import SessionMiddleware

# load env
load_dotenv()

# global vars
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")
secret = os.getenv("SECRET")
redirect_uri = 'http://localhost:8000/callback'
scopes = ['https://www.googleapis.com/auth/business.manage']

# OAuth Flow Configuration
client_config = {
    "web": {
        "client_id": client_id,
        "client_secret": client_secret,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "redirect_uris": [redirect_uri],
        "scopes": scopes
    }
}

# init
# init web application
app = FastAPI()

# add session middleware to store information between requests
app.add_middleware(SessionMiddleware, secret_key=secret)

# Mount the static directory
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def index():
    return FileResponse('static/index.html')

@app.get("/login")
async def login(request: Request):
    # Create OAuth flow instance using the client config
    flow = Flow.from_client_config(
        client_config=client_config,
        scopes=scopes,
        redirect_uri=redirect_uri
    )

    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true'
    )

    request.session['state'] = state
    return RedirectResponse(authorization_url)

@app.get("/callback")
async def callback(request: Request, state: str, code: str = None):
    if not code or state != request.session.get("state"):
        raise HTTPException(status_code=400, detail="Invalid request or state mismatch")

    # Create OAuth flow instance using the client config
    flow = Flow.from_client_config(
        client_config=client_config,
        scopes=scopes,
        state=state,
        redirect_uri=redirect_uri
    )

    # Exchange the authorization code for a token
    flow.fetch_token(code=code)

    # Extract credentials
    credentials = flow.credentials
    credentials_dict = credentials_to_dict(credentials)
    print(credentials_dict)

    # Convert credentials to a dictionary and store in session
    request.session['credentials'] = credentials_dict

    # Redirect to another endpoint or return a response
    return RedirectResponse(url='/')

def credentials_to_dict(credentials):
    return {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes
    }

