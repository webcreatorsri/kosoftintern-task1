from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import hashlib
import mysql.connector
from db_config import get_connection

app = Flask(__name__)
CORS(app)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']

    conn = get_connection()
    cursor = conn.cursor()

    # ✅ Check if email already exists
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({"message": "Email already registered. Please login or use a different email."}), 400

    # ✅ If not exists, insert new user
    cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
    conn.commit()
    conn.close()

    return jsonify({"message": "You are registered successfully."})


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    conn = get_connection()
    cursor = conn.cursor()

    # 🧠 Check if user exists
    cursor.execute("SELECT password FROM users WHERE email = %s", (email,))
    result = cursor.fetchone()
    conn.close()

    if result:
        stored_password = result[0]
        if stored_password == password:
            return jsonify({"message": "Login successful"})
        else:
            return jsonify({"message": "Invalid password"}), 401
    else:
        return jsonify({"message": "Email not registered"}), 401

if __name__ == '__main__':
    app.run(debug=True)
    
@app.route('/', methods=['GET'])
def home():
    return "Flask Backend is Running"

