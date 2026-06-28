import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
os.makedirs(app.instance_path, exist_ok=True)
CORS(app)

postgres_password=os.environ.get('POSTGRES_PASSWORD')
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql+psycopg://postgres:{postgres_password}@db:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
