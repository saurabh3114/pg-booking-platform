# TODO Steps to Fix Error (FastAPI JWT Issue)

- [x] Step 1: Update core/security.py with missing JWT functions (SECRET_KEY, ALGORITHM, create_access_token).
- [x] Step 2: Clear Python cache: rm backend_api_v1/app/routes/__pycache__/user.cpython-314.pyc
- [x] Step 3: Install missing deps: passlib, python-jose, email-validator in venv_pg_saurabh
- [x] Step 4: Restarted uvicorn app.main:app --reload. Server at http://127.0.0.1:8000. Test endpoints:

  - Signup: curl -X POST "http://127.0.0.1:8000/users/signup" -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","password":"password"}'

  - Login: curl -X POST "http://127.0.0.1:8000/users/login" -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password"}'

  - Profile: TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9... (from login); curl -X GET "http://127.0.0.1:8000/users/profile" -H "Authorization: Bearer $TOKEN"



