import fcntl
import os
from flask import jsonify, request
from config import app, db
from models import Contact


def init_db():
    lock_path = os.path.join(app.instance_path, "db-init.lock")

    with open(lock_path, "w") as lock_file:
        fcntl.flock(lock_file, fcntl.LOCK_EX)
        try:
            with app.app_context():
                db.create_all()
        finally:
            fcntl.flock(lock_file, fcntl.LOCK_UN)


init_db()


@app.get('/contacts')
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = [c.to_json() for c in contacts]
    return jsonify({'contacts': json_contacts})


@app.post('/contacts')
def create_contact():
    first_name = request.json.get('firstName')
    last_name = request.json.get('lastName')
    email = request.json.get('email')
    if not first_name or not last_name or not email:
        return jsonify({'message': 'Please fill all required fields.'}), 400
    contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(contact)
        db.session.commit()
    except Exception as e:
        return jsonify({'message': str(e)}), 400
    return jsonify({'message': 'Contact created successfully.'}), 201
