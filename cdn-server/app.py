# chat gpt cooked half of this, thought there is no need to waste time on smth that simple

from flask import Flask, request, send_from_directory, jsonify, abort
from dotenv import load_dotenv
import shutil
import os
import random
import string
import requests
from graphqlclient import GraphQLClient
from gevent.pywsgi import WSGIServer


app = Flask(__name__)

load_dotenv()

API_KEY = os.getenv("API_KEY")
MAILER_URL = os.getenv("MAILER_URL")
ASSETS_DIR = "assets"

client = GraphQLClient(os.getenv("MAILER_URL"))
client.inject_token(os.getenv('MAILER_API_KEY_FOR_EVENTS'),'x-api-key')

def generate_random_token():
    return ''.join(random.choices(string.digits, k=30))

@app.route('/add-asset', methods=['POST'])
def add_asset():
    if request.headers.get('x-api-key') != API_KEY:
        return jsonify({'error': 'Invalid API key'}), 401

    if 'file' not in request.files:
        return jsonify({'error': 'No file specified'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file specified'}), 400

    os.makedirs(ASSETS_DIR, exist_ok=True)

    token = generate_random_token()
    file_path = os.path.join(ASSETS_DIR, token + file.filename)
    file.save(file_path)

    return jsonify({"url": f"/{token}/{file.filename}"}), 200

@app.route('/<token>/<filename>')
def get_asset(token, filename):
    filepath = os.path.join(ASSETS_DIR, f"{token}{filename}")

    if os.path.exists(filepath):
        if filename == 'pixel.png':
            send_email_event_mutation(f"/{token}/{filename}", "OPENED")

        return send_from_directory(ASSETS_DIR, f"{token}{filename}")
    else:
        abort(404)

@app.route('/<token>/<filename>', methods=['DELETE'])
def delete_asset(token, filename):
    if request.headers.get('x-api-key') != API_KEY:
        return jsonify({'error': 'Invalid API key'}), 401

    file_path = os.path.join(ASSETS_DIR, token + filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({'message': 'Asset deleted successfully'}), 200
    else:
        return jsonify({'message': 'This asset does not exists!'}), 200

@app.route('/generate-email-tracking-image', methods=['POST'])
def generate_email_tracking_image():
    if request.headers.get('x-api-key') != API_KEY:
        return jsonify({'error': 'Invalid API key'}), 401

    filename = "pixel.png"
    file_path = os.path.join(ASSETS_DIR, filename)

    file_token = generate_random_token()
    new_filename = file_token + filename
    new_file_path = os.path.join(ASSETS_DIR, new_filename)

    os.makedirs(ASSETS_DIR, exist_ok=True)
    shutil.copyfile(file_path, new_file_path)

    return jsonify({"url": f"/{file_token}/{filename}"}), 200

create_email_event_mutation = """
mutation CreateEmailEvent($trackingImageUrl: String!, $type: EmailEventTypes!) {
  createEmailEvent(trackingImageUrl: $trackingImageUrl, type: $type) {
    id
    emailId 
    type
  }
}
"""

#todo secure it with some private api key or smth
def send_email_event_mutation(tracking_image_url, event_type):
    variables = {
        'trackingImageUrl': tracking_image_url,
        'type': event_type
    }
    result = client.execute(create_email_event_mutation, variables)

PRODUCTION = os.getenv("PRODUCTION", default="False")
PRODUCTION = PRODUCTION.lower() == "true"

if __name__ == '__main__':
    if PRODUCTION:
        print('[Production Mode] CDN Server running on port 3005')
        http_server = WSGIServer(('', 3005), app)
        http_server.serve_forever()
    else:
        app.run(host='0.0.0.0', port=3005, debug=True)
