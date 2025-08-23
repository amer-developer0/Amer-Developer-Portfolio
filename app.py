# app.py
"""
Amer Developer Portfolio - Full-Stack Backend
Author: Amer
Framework: Flask
Purpose: Serve the portfolio with dynamic data from data.json
"""

import os
import json
import hashlib
from flask import Flask, render_template, request, jsonify, send_from_directory
from config import Config

app = Flask(__name__, template_folder='templates', static_folder='static')
app.config.from_object(Config)

# --- Paths ---
DATA_FILE = 'data/data.json'
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

# --- Default data if data.json doesn't exist ---
DEFAULT_DATA = {
    "skills": [
        {
            "short": "HTML",
            "full": "HyperText Markup Language",
            "desc_en": "Structure of web pages and content organization.",
            "desc_ar": "هيكل صفحات الويب وصياغة المحتوى بطريقة منظمة."
        },
        {
            "short": "CSS",
            "full": "Cascading Style Sheets",
            "desc_en": "Styling and adding aesthetic touches to design consistency.",
            "desc_ar": "تنسيق الصفحات وإضافة لمسات جمالية وتناسق في التصميم."
        },
        {
            "short": "JavaScript",
            "full": "JavaScript",
            "desc_en": "Adding interactivity and motion to make the site dynamic.",
            "desc_ar": "إضافة التفاعلية والحركة لجعل الموقع ديناميكي."
        },
        {
            "short": "Python",
            "full": "Python",
            "desc_en": "Programming applications and building smart tools and practical solutions.",
            "desc_ar": "برمجة التطبيقات وبناء أدوات ذكية وحلول عملية."
        },
        {
            "short": "Tailwind CSS",
            "full": "Tailwind CSS",
            "desc_en": "Designing professional interfaces quickly and flexibly with clean code.",
            "desc_ar": "تصميم واجهات احترافية بسرعة ومرونة باستخدام كود نظيف."
        },
        {
            "short": "AI Tools",
            "full": "Artificial Intelligence Tools",
            "desc_en": "Leveraging AI technologies to enhance performance and creativity.",
            "desc_ar": "استغلال تقنيات الذكاء الاصطناعي لتحسين الأداء والإبداع."
        }
    ],
    "tools": [
        {
            "short": "Git",
            "full": "Git",
            "desc_en": "Managing and tracking changes in programming projects.",
            "desc_ar": "إدارة وتتبع التغييرات في المشاريع البرمجية."
        },
        {
            "short": "GitHub",
            "full": "GitHub",
            "desc_en": "Saving and sharing code with easy collaboration.",
            "desc_ar": "حفظ ومشاركة الأكواد والعمل الجماعي بسهولة."
        },
        {
            "short": "VS Code",
            "full": "Visual Studio Code",
            "desc_en": "Powerful and flexible code editor supporting all technologies.",
            "desc_ar": "محرر أكواد قوي ومرن يدعم جميع التقنيات."
        },
        {
            "short": "Figma",
            "full": "Figma",
            "desc_en": "Designing user interfaces and experiences professionally.",
            "desc_ar": "تصميم واجهات وتجربة مستخدم بشكل احترافي."
        },
        {
            "short": "AI Tools",
            "full": "Artificial Intelligence Tools",
            "desc_en": "Using AI tools to improve work and save time.",
            "desc_ar": "استخدام أدوات الذكاء الاصطناعي في تحسين العمل وتوفير الوقت."
        }
    ],
    "projects": [],
    "services": [
        {
            "name": "Landing Pages",
            "desc": "Landing Pages Desc",
            "message": "أرغب في طلب خدمة تصميم صفحة هبوط.",
            "message_en": "I want to order a Landing Page service."
        },
        {
            "name": "Websites",
            "desc": "Websites Desc",
            "message": "أرغب في طلب خدمة تطوير موقع ويب.",
            "message_en": "I want to order a Website development service."
        },
        {
            "name": "Python Scripts",
            "desc": "Python Scripts Desc",
            "message": "أرغب في طلب خدمة سكربت بايثون.",
            "message_en": "I want to order a Python script service."
        },
        {
            "name": "Support & Maintenance",
            "desc": "Support & Maintenance Desc",
            "message": "أرغب في طلب خدمة الدعم والصيانة.",
            "message_en": "I want to order a Support & Maintenance service."
        }
    ]
}

# --- Admin Password (SHA-256 hash) ---
# كلمة المرور: ameramer9.1.2010
ADMIN_PASSWORD_HASH = "3a8a5a5c4c3e3d2f2e1a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2"  # سيتم حسابها ديناميكيًا أدناه


def get_password_hash():
    """تُرجع الـ SHA-256 hash لكلمة المرور المحددة"""
    pwd = "ameramer9.1.2010"
    return hashlib.sha256(pwd.encode()).hexdigest()


# تأكد أن الـ hash يتم حسابه عند التشغيل
ADMIN_PASSWORD_HASH = get_password_hash()

# --- Utilities ---

def load_data():
    """قراءة البيانات من data.json أو إنشاء ملف افتراضي"""
    if not os.path.exists(DATA_FILE):
        save_data(DEFAULT_DATA)
        return DEFAULT_DATA
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"[ERROR] Failed to load data.json: {e}")
        return DEFAULT_DATA


def save_data(data):
    """حفظ البيانات في data.json"""
    try:
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        print(f"[ERROR] Failed to save data.json: {e}")
        return False


# --- Routes ---

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/data')
def get_data():
    data = load_data()
    return jsonify(data)


@app.route('/api/data', methods=['POST'])
def update_data():
    data = request.json
    password = data.get('password')

    # التحقق من كلمة المرور
    if hashlib.sha256(password.encode()).hexdigest() != ADMIN_PASSWORD_HASH:
        return jsonify({"error": "Invalid password"}), 403

    # حفظ البيانات
    if save_data(data.get('data')):
        return jsonify({"success": True})
    else:
        return jsonify({"error": "Failed to save data"}), 500


@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    # تنظيف اسم الملف
    filename = file.filename.replace(' ', '_')
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    # حفظ الملف
    try:
        file.save(filepath)
        # إرجاع الرابط النسبي
        return jsonify({"url": f"/uploads/{filename}"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


@app.route('/sitemap')
def sitemap():
    links = [
        {"url": "/", "title": "Home"},
        {"url": "/#about", "title": "About Me"},
        {"url": "/#projects", "title": "Projects"},
        {"url": "/#contact", "title": "Contact Me"}
    ]
    return jsonify(links)


# --- Error Handlers ---
@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found"}), 404


@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    app.run(host=app.config['HOST'], port=app.config['PORT'], debug=False)
