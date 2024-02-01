# chat gpt cooked half of this, thought there is no need to waste time on smth that simple

from flask import Flask, request, send_from_directory, jsonify
from dotenv import load_dotenv
import os
import random
import string

app = Flask(__name__)

API_KEY = os.getenv("API_KEY")
ASSETS_DIR = "assets"

def generate_random_token():
    return ''.join(random.choices(string.digits, k=30))

@app.route('/add-asset', methods=['POST'])
def add_asset():
    if request.headers.get('key') != API_KEY:
        return jsonify({'error': 'Invalid API key'}), 401

    if 'file' not in request.files:
        return jsonify({'error': 'No file specified'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file specified'}), 400

    token = generate_random_token()
    file_path = os.path.join(ASSETS_DIR, token + file.filename)
    file.save(file_path)

    return jsonify({"url": f"/{token}/{file.filename}"}), 200

@app.route('/<token>/<filename>')
def get_asset(token, filename):
    return send_from_directory(ASSETS_DIR, f"{token}{filename}")

@app.route('/<token>/<filename>', methods=['DELETE'])
def delete_asset(token, filename):
    if request.headers.get('key') != API_KEY:
        return jsonify({'error': 'Invalid API key'}), 401

    file_path = os.path.join(ASSETS_DIR, token + filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return jsonify({'message': 'Asset deleted successfully'}), 200
    else:
        return jsonify({'error': 'Asset not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=3004)
