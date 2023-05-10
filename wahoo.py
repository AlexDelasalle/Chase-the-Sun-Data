import requests

# Step 1: Send user to Wahoo to authorize your app
base_url = "https://api.wahoo.com"
client_id = "<your_client_id>"
redirect_uri = "<your_redirect_uri>"
scopes = "profile workout"
auth_url = f"{base_url}/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&scope={scopes}&response_type=code"
# Redirect the user to the auth URL and wait for the redirect back to your redirect URI

# Step 2: Get the authorization code from the redirect URL
redirect_url = "<url_where_user_was_redirected>"
auth_code = redirect_url.split("=")[-1]

# Step 3: Exchange the authorization code for an access token and refresh token
client_secret = "<your_client_secret>"
grant_type = "authorization_code"
token_url = f"{base_url}/oauth/token"
headers = {"Content-Type": "application/x-www-form-urlencoded"}
data = {
    "client_id": client_id,
    "client_secret": client_secret,
    "redirect_uri": redirect_uri,
    "grant_type": grant_type,
    "code": auth_code
}
response = requests.post(token_url, headers=headers, data=data)
response_json = response.json()
access_token = response_json["access_token"]
refresh_token = response_json["refresh_token"]

# Step 4: Use the access token to make API requests
api_url = f"{base_url}/api/v1/user/profile"
headers = {"Authorization": f"Bearer {access_token}"}
response = requests.get(api_url, headers=headers)
response_json = response.json()
# Process the API response as needed

# Step 5: Use the refresh token to get a new access token when the current one expires
grant_type = "refresh_token"
data = {
    "client_id": client_id,
    "client_secret": client_secret,
    "grant_type": grant_type,
    "refresh_token": refresh_token
}
response = requests.post(token_url, headers=headers, data=data)
response_json = response.json()
new_access_token = response_json["access_token"]
new_refresh_token = response_json["refresh_token"]
# Use the new access token to make subsequent API requests
