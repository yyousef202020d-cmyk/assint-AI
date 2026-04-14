import pyautogui
import pywhatkit
import webbrowser
import os
import time
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class CommandRequest(BaseModel):
    command: str

@app.post("/execute")
async def execute_command(req: CommandRequest):
    cmd = req.command.lower()
    
    if "whatsapp" in cmd or "واتساب" in cmd:
        # Example: "ارسل رسالة واتساب الى 0123456789 مرحبا"
        # In a real app, we would parse the number and message better
        pywhatkit.sendwhatmsg_instantly("+201000000000", "رسالة تجريبية من Astra AI", wait_time=10)
        return {"status": "success", "message": "تم إرسال رسالة الواتساب"}

    if "gmail" in cmd or "ايميل" in cmd:
        webbrowser.open("https://mail.google.com")
        return {"status": "success", "message": "تم فتح بريد Gmail"}

    if "screenshot" in cmd or "لقطة شاشة" in cmd:
        screenshot = pyautogui.screenshot()
        screenshot.save("screenshot.png")
        return {"status": "success", "message": "تم أخذ لقطة الشاشة وحفظها"}

    if "close" in cmd or "اغلق" in cmd:
        pyautogui.hotkey('alt', 'f4')
        return {"status": "success", "message": "تم إغلاق النافذة الحالية"}

    return {"status": "error", "message": "عذراً، لم أفهم هذا الأمر البرمجي بعد."}

if __name__ == "__main__":
    import uvicorn
    print("Astra AI Backend is starting...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
