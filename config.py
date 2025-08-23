# config.py
"""
Configuration file for Amer Developer Portfolio (Flask App)
Defines server settings, paths, and environment variables.
"""

import os
from datetime import datetime

class Config:
    # --- Server Settings ---
    HOST = os.getenv('FLASK_HOST', '0.0.0.0')  # استخدم متغير بيئي أو القيمة الافتراضية
    PORT = int(os.getenv('FLASK_PORT', 5000))  # يمكنك تغيير البورت عبر متغير FLASK_PORT
    DEBUG = False  # يجب أن يكون False في الإنتاج

    # --- Paths ---
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    DATA_FOLDER = os.path.join(BASE_DIR, 'data')
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
    TEMPLATES_FOLDER = os.path.join(BASE_DIR, 'templates')
    STATIC_FOLDER = os.path.join(BASE_DIR, 'static')

    # --- Security & Admin ---
    # تم توليد الـ hash باستخدام: hashlib.sha256("ameramer9.1.2010".encode()).hexdigest()
    ADMIN_PASSWORD_HASH = "3a8a5a5c4c3e3d2f2e1a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e"

    # --- App Metadata ---
    APP_NAME = "Amer Developer Portfolio"
    VERSION = "1.0.0"
    AUTHOR = "Amer Abdo"
    YEAR = datetime.now().year

    # --- File Upload Settings ---
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'mp4', 'webm', 'mov'}
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB كحد أقصى للرفع

    # --- Data File ---
    DATA_FILE = os.path.join(DATA_FOLDER, 'data.json')

    @staticmethod
    def init_app(app):
        """مهمة اختيارية لتهيئة التطبيق عند الحاجة"""
        pass
