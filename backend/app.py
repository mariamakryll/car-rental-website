from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Email configuration (you should set these as environment variables)
SMTP_SERVER = "smtp.gmail.com"  # or your email provider
SMTP_PORT = 587
EMAIL_ADDRESS = os.environ.get("EMAIL_ADDRESS", "sunrentalcars@yahoo.com")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD", "")  # Use app-specific password
RECIPIENT_EMAIL = "sunrentalcars@yahoo.com"

@app.route('/api/book', methods=['POST'])
def book_car():
    try:
        data = request.json
        
        # Extract booking details
        name = data.get('name', '')
        email = data.get('email', '')
        phone = data.get('phone', '')
        car_id = data.get('car_id', '')
        car_name = data.get('car_name', '')
        pickup_date = data.get('pickup_date', '')
        return_date = data.get('return_date', '')
        message = data.get('message', '')
        
        # Validate required fields
        if not all([name, email, phone, car_id, pickup_date, return_date]):
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400
        
        # Create email content
        subject = f"New Booking Request - {car_name}"
        
        email_content = f"""
New Car Rental Booking Request

Customer Details:
- Name: {name}
- Email: {email}
- Phone: {phone}

Booking Details:
- Car: {car_name} (ID: {car_id})
- Pickup Date: {pickup_date}
- Return Date: {return_date}
- Additional Message: {message if message else 'None'}

Booking received: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
        
        # Send email
        send_email(subject, email_content, email)
        
        return jsonify({
            'success': True,
            'message': 'Booking request received successfully! We will contact you shortly.'
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def send_email(subject, body, sender_email):
    """Send email using SMTP"""
    try:
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = subject
        
        msg.attach(MIMEText(body, 'plain'))
        
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        
    except Exception as e:
        print(f"Email error: {e}")
        # Don't fail the booking if email fails
        pass

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Backend is running'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
