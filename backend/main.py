import os
import httpx
http_client = httpx.AsyncClient(timeout=20.0)
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

MY_API_KEY = os.getenv("GOOGLE_API_KEY")
MY_MONGO_URI = os.getenv("MONGO_URI")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client_db = AsyncIOMotorClient(MY_MONGO_URI)
db = client_db.PortfolioAI

@app.on_event("startup")
async def startup_db_client():
    try:
        await client_db.admin.command('ping')
        print("DATABASE CONNECTED")
    except Exception as e:
        print(f"DATABASE ERROR: {e}")

NITIN_DATA = """
1. EDUCATION: BCA from Amrapali Group of Institutes (68%), XII from SVM Ramnagar (59%), X from Ashish Modern (69%).
2. EXPERIENCE: MERN Stack Intern (built 10+ APIs), Deloitte Virtual Internship.
3. PROJECTS: Attendance Tracker (JWT & REST), E-Commerce (React & Tailwind).
4. SKILLS: JavaScript, C++, Python, React, Node, Express, MongoDB, MySQL.
5. CONTACT: Haldwani, Uttarakhand. Email: pathakn475@gmail.com.
6. CERTIFICATIONS:
   - Cyber Security Training (Honeywell ICTA Academy).
   - MERN Stack Certification (Codec Technologies).
   - Technology Job Simulation Certificate (Deloitte via Forage).
"""

class ChatRequest(BaseModel):
    message: str

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/chat")
async def chat(request: ChatRequest):
        try:
            MODEL = "models/gemini-2.5-flash"

            chat_url = (
                f"https://generativelanguage.googleapis.com/v1beta/"
                f"{MODEL}:generateContent?key={MY_API_KEY}"
            )

            system_instruction = (
                "You are Nitin's Official AI Digital Twin.\n"
                "If the conversation is an interview, always reply in professional English.\n"
                "If asked about personal life, politely say you only discuss Nitin's professional profile.\n\n"
                f"Knowledge:\n{NITIN_DATA}"
            )

            payload = {
                "contents": [
                    {
                        "parts": [
                            {
                                "text": f"{system_instruction}\n\nVisitor: {request.message}"
                            }
                        ]
                    }
                ]
            }

            response = await http_client.post(
                chat_url,
                json=payload
            )

            result = response.json()

            if "candidates" in result:
                reply = result["candidates"][0]["content"]["parts"][0]["text"]

                try:
                    await db.chats.insert_one({
                        "user": request.message,
                        "ai": reply,
                        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    })
                except Exception:
                    pass

                return {"reply": reply}

            return {"reply": "Server taking load, please try again later!"}

        except Exception as e:
            print(f"ERROR: {e}")
            raise HTTPException(
                status_code=500,
                detail="Internal Server Error"
            )

@app.on_event("shutdown")
async def shutdown():
    await http_client.aclose()
    client_db.close()
            

if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", 8000))

    uvicorn.run(app, host="0.0.0.0", port=port)