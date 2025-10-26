# Backend deploy quick guide (Render/Railway)

1. Create a new Web Service.
2. Build: `pip install -r requirements.txt`
3. Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add ENV vars as needed.
5. Use the public URL as REACT_APP_BACKEND_URL in Vercel.
