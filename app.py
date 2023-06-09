from flask import Flask, render_template, request, redirect

import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/authorize', methods=['POST'])
def authorize():
    # Step 1: Redirect the user to the Wahoo authorization page
    base_url = "api.wahooligan.com"
    client_id = "xwqCWz1ZJLLQm1KUjeTUj_EXd6Kdsvhk-JlqFRq2Umo"
    redirect_uri = "https://chase-the-sun-data.herokuapp.com"
    scopes = "email workouts_read workouts_write user_read"

    authorization_url = f"https://{base_url}/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&scope={scopes}&response_type=code"

    # Redirect the user to the authorization URL
    return redirect(authorization_url)

@app.route('/callback', methods=['GET'])
def callback():
    # Step 2: Get the authorization code from the redirected URL
    authorization_code = request.args.get('code')

    # Step 3: Exchange the authorization code for an access_token and refresh_token
    base_url = "api.wahooligan.com"
    client_id = "xwqCWz1ZJLLQm1KUjeTUj_EXd6Kdsvhk-JlqFRq2Umo"
    client_secret = "haWgL6XCIHatqQITG7MfM6Yp32CPo_HkfS7mUonEzDo"
    redirect_uri = "https://chase-the-sun-data.herokuapp.com"

    token_url = f"https://{base_url}/oauth/token"
    payload = {
        "client_id": client_id,
        "client_secret": client_secret,
        "code": authorization_code,
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code"
    }

    response = requests.post(token_url, data=payload)
    token_data = response.json()

    if "access_token" in token_data:
        access_token = token_data["access_token"]
        refresh_token = token_data["refresh_token"]

        # Step 4: Refresh the access_token when it expires (after 2 hours)
        payload = {
            "client_id": client_id,
            "client_secret": client_secret,
            "grant_type": "refresh_token",
            "refresh_token": refresh_token
        }

        response = requests.post(token_url, data=payload)
        refreshed_token_data = response.json()
        access_token = refreshed_token_data["access_token"]
        refresh_token = refreshed_token_data["refresh_token"]

        # Step 5: Use the access_token to make authorized requests to the Wahoo API
        api_url = f"https://{base_url}/api/endpoint"
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }

        # Make a request to the API using the access_token
        response = requests.get(api_url, headers=headers)
        api_data = response.json()

        # Handle the API response data as needed

        return 'Authorization process completed.'
    else:
        return 'Failed to obtain access token'

if __name__ == '__main__':
    app.run(debug=True)
