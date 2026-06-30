import smtplib
from email.mime.text import MIMEText
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from Backend folder
BASE_DIR = Path(__file__).resolve().parent.parent
env_file = BASE_DIR / ".env"

print("ENV FILE:", env_file)
print("EXISTS:", env_file.exists())

load_dotenv(env_file)

EMAIL = os.getenv("EMAIL_ADDRESS")
PASSWORD = os.getenv("EMAIL_PASSWORD")

print("EMAIL =", EMAIL)
print("PASSWORD =", PASSWORD)


def send_otp_email(receiver_email, otp):

    msg = MIMEText(
        f"Your OTP for password reset is: {otp}"
    )

    msg["Subject"] = "Password Reset OTP"
    msg["From"] = EMAIL
    msg["To"] = receiver_email

    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )

    server.starttls()

    server.login(
        EMAIL,
        PASSWORD
    )

    server.send_message(msg)

    server.quit()