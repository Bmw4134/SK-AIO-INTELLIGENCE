# Create key configuration files first

# 1. Frontend package.json with all dependencies
package_json = {
    "name": "singularity-kernel-frontend",
    "version": "1.0.0",
    "scripts": {
        "dev": "next dev",
        "build": "next build", 
        "start": "next start",
        "type-check": "tsc --noEmit"
    },
    "dependencies": {
        "next": "^14.0.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "@clerk/nextjs": "^4.27.0",
        "@stripe/stripe-js": "^2.4.0",
        "framer-motion": "^10.16.0",
        "lucide-react": "^0.294.0",
        "crypto-js": "^4.2.0",
        "axios": "^1.6.0"
    },
    "devDependencies": {
        "typescript": "^5.0.0",
        "@types/node": "^20.0.0",
        "@types/react": "^18.2.0",
        "tailwindcss": "^3.3.0",
        "autoprefixer": "^10.4.0",
        "postcss": "^8.4.0"
    }
}

# 2. Backend requirements.txt
requirements_txt = """fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
alembic==1.13.0
psycopg2-binary==2.9.9
redis==5.0.1
pydantic==2.5.0
python-multipart==0.0.6
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
stripe==7.8.0
httpx==0.25.2
cryptography==41.0.8
python-dotenv==1.0.0
puppeteer==2.0.0
beautifulsoup4==4.12.2
librosa==0.10.1
numpy==1.24.3
transformers==4.36.0
torch==2.1.2
"""

# 3. Environment template
env_example = """# Database
DATABASE_URL=postgresql://username:password@localhost:5432/singularity_db
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-jwt-secret-here
CLERK_SECRET_KEY=your-clerk-secret-key

# API Keys (will be encrypted in vault)
OPENAI_API_KEY=your-openai-key
HUGGINGFACE_API_KEY=your-hf-key
ANTHROPIC_API_KEY=your-anthropic-key
GEMINI_API_KEY=your-gemini-key
MISTRAL_API_KEY=your-mistral-key

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# Unofficial APIs (use with caution)
SUNO_COOKIE=your-suno-cookie
BLACKBOX_API_KEY=your-blackbox-key

# Infrastructure
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1

# DistroKid (for automation)
DISTROKID_USERNAME=your-distrokid-username
DISTROKID_PASSWORD=your-distrokid-password
"""

# 4. Docker compose for local development
docker_compose = """version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: singularity
      POSTGRES_PASSWORD: password123
      POSTGRES_DB: singularity_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://singularity:password123@postgres:5432/singularity_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - ./backend:/app
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload

volumes:
  postgres_data:
"""

print("📁 CORE CONFIGURATION FILES")
print("=" * 50)
print("\n1. 📦 FRONTEND PACKAGE.JSON")
print(json.dumps(package_json, indent=2))
print("\n2. 🐍 BACKEND REQUIREMENTS.TXT")
print(requirements_txt)
print("\n3. 🔐 ENVIRONMENT VARIABLES (.env.example)")
print(env_example)
print("\n4. 🐳 DOCKER COMPOSE (Local Development)")
print(docker_compose)