import os
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from dotenv import load_dotenv

# --- CONFIGURATION (Safe & Deployment Ready) ---
load_dotenv()

# Pehle Environment Variables se uthayega, nahi toh fallback value use karega
MY_API_KEY = os.getenv("GOOGLE_API_KEY", "AIzaSyDbtXrhNtNWSjd8BsvO5YMFzoRpw-UogsU") 
MY_MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://nitin:o7qqp5n0D2dQuhBj@cluster0.vd3xrxz.mongodb.net/PortfolioAI?retryWrites=true&w=majority&appName=Cluster0")
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
        print("✅ DATABASE CONNECTED")
    except Exception as e:
        print(f"❌ DATABASE ERROR: {e}")

NITIN_DATA = """
1. EDUCATION: BCA from Amrapali Group of Institutes (68%), XII from SVM Ramnagar (59%), X from Ashish Modern (69%).
2. EXPERIENCE: MERN Stack Intern (built 10+ APIs), Deloitte Virtual Internship.
3. PROJECTS: Attendance Tracker (JWT & REST), E-Commerce (React & Tailwind).
4. SKILLS: JavaScript, C++, Python, React, Node, Express, MongoDB, MySQL.
5. CONTACT: Haldwani, Uttarakhand. Email: pathakn475@gmail.com.
3. CERTIFICATIONS:
   - Cyber Security Training (Honeywell ICTA Academy).
   - MERN Stack Certification (Codec Technologies).
   - Technology Job Simulation Certificate (Deloitte via Forage).
"""

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    async with httpx.AsyncClient() as client:
        try:
            list_url = f"https://generativelanguage.googleapis.com/v1beta/models?key={MY_API_KEY}"
            list_res = await client.get(list_url)
            models_data = list_res.json()
            available_models = [m['name'] for m in models_data.get('models', []) 
                               if 'generateContent' in m.get('supportedGenerationMethods', [])]
            best_model = next((m for m in available_models if "flash" in m), available_models[0])

            # --- UPDATED SMART HYBRID INSTRUCTIONS ---
            system_instruction = (
                "ROLE: You are Nitin's Official AI Digital Twin.\n"
                "STRICT BEHAVIOR RULES:\n"
                "1. INTERVIEWER LOCK: If the user is acting as an 'Interviewer' or has started asking about Nitin's background (Education, Skills, etc.), "
                "you MUST remain in Formal Professional English for the ENTIRE duration of the chat. \n"
                "2. NO CASUAL SWITCH: Do NOT use Hinglish, 'Bhai', or 'Are' even if the user asks personal questions like 'Family' or 'Hobbies'. \n"
                "3. OUT OF SCOPE: If asked about Nitin's family or private life, reply professionally: "
                "'I apologize, but I am programmed to discuss Nitin's professional portfolio, skills, and academic background only. "
                "Would you like to know more about his projects or certifications?'\n"
                "4. GREETINGS: Even for 'Hi' or 'Hey' during an interview, reply: 'Hello! How may I assist you further with Nitin's credentials?'\n\n"
                f"KNOWLEDGE BASE: {NITIN_DATA}"
            )

            chat_url = f"https://generativelanguage.googleapis.com/v1beta/{best_model}:generateContent?key={MY_API_KEY}"
            payload = {
                "contents": [{"parts": [{"text": f"{system_instruction}\n\nVisitor: {request.message}"}]}]
            }

            response = await client.post(chat_url, json=payload, timeout=30.0)
            result = response.json()

            if "candidates" in result:
                reply = result['candidates'][0]['content']['parts'][0]['text']
                
                try:
                    await db.chats.insert_one({
                        "user": request.message, 
                        "ai": reply, 
                        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    })
                except: pass 
                
                return {"reply": reply}
            
            return {"reply": "Server taking load please try again later!"}

        except Exception as e:
            print(f"🔥 ERROR: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

if __name__ == "__main__":
    import uvicorn
    import os
    # Port ko environment variable se uthana zaroori hai deployment ke liye
    port = int(os.environ.get("PORT", 8000)) 
    uvicorn.run(app, host="0.0.0.0", port=port)