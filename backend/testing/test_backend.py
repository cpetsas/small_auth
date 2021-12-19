import requests
import pytest
import json

class TestAPI:

    def test_signup_wrong_name(self):
        body = {'email': 'hello@gmail.com',
                'password': 'eightcharacters1',
                'name': 'hi'}
        response = requests.post('http://localhost:5050/users/signup',
                                headers= {'Content-Type': 'application/json'},
                                data = json.dumps(body))
        assert (response.status_code, response.json()) == (400, 'Name should be at least 5 characters long') 

    def test_signup_short_pass(self):
        body = {'email': 'hello@gmail.com',
                'password': 'eight',
                'name': 'fivechars'}
        response = requests.post('http://localhost:5050/users/signup',
                                headers= {'Content-Type': 'application/json'},
                                data = json.dumps(body))
        assert (response.status_code, response.json()) == (400, 'Password should be at least 8 characters long') 

    def test_signup_wrong_pass(self):
        body = {'email': 'hello@gmail.com',
                'password': 'eightchars',
                'name': 'fivechars'}
        response = requests.post('http://localhost:5050/users/signup',
                                headers= {'Content-Type': 'application/json'},
                                data = json.dumps(body))
        assert (response.status_code, response.json()) == (400, 'Password should contain at least 1 number') 
    
    def test_signup_correct(self):
        body = {'email': 'hello@gmail.com',
                'password': 'eightchar1s',
                'name': 'fivechars'}
        response = requests.post('http://localhost:5050/users/signup',
                                headers= {'Content-Type': 'application/json'},
                                data = json.dumps(body))
        assert (response.status_code, response.json()) == (200, 'User created') 

    def test_signup_existing_user(self):
        body = {'email': 'hello@gmail.com',
                'password': 'eightchar1s',
                'name': 'fivechars'}
        response = requests.post('http://localhost:5050/users/signup',
                                headers= {'Content-Type': 'application/json'},
                                data = json.dumps(body))
        assert (response.status_code, response.json()) == (500, 'User already exists')
    
    def test_wrong_login(self):
        body = {'email': 'hello@gmail.com',
                'password': 'eightchars',
                'name': 'fivechars'}
        response = requests.post('http://localhost:5050/users/login',
                                headers= {'Content-Type': 'application/json'},
                                data = json.dumps(body))
        assert (response.status_code, response.json()) == (400, 'Invalid email and pass combo')

    def test_correct_login(self):
        body = {'email': 'hello@gmail.com',
                'password': 'eightchar1s',
                'name': 'fivechars'}
        response = requests.post('http://localhost:5050/users/login',
                                headers= {'Content-Type': 'application/json'},
                                data = json.dumps(body))
        assert response.status_code == 200