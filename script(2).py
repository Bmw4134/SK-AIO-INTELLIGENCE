# Create the core backend FastAPI application

# 1. Main FastAPI app with intelligent API vault
main_py = '''"""
Singularity Kernel Backend - Multi-Modal EDM Generation Platform
Features: Intelligent API Key Vault, Suno Integration, Visual Sync, Monetization
"""
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from contextlib import asynccontextmanager
import uvicorn
import os
from app.routers import music, auth, proxy
from app.services.stripe_service import StripeService
from app.models.database import engine, Base
from app.utils.encryption import APIVault

# Global API vault instance
api_vault = APIVault()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize services on startup"""
    # Create database tables
    Base.metadata.create_all(bind=engine)
    
    # Initialize API vault with auto-detection
    await api_vault.initialize()
    
    # Initialize Stripe webhook
    StripeService.setup_webhooks()
    
    print("🚀 Singularity Kernel Backend Started")
    print("⚡ API Vault initialized with smart key detection")
    print("💰 Stripe webhooks configured")
    
    yield
    
    print("🛑 Singularity Kernel Backend Shutting Down")

app = FastAPI(
    title="Singularity Kernel API",
    description="Advanced EDM Generation Platform with AI Orchestration",
    version="1.0.0",
    lifespan=lifespan
)

# Security middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=["localhost", "127.0.0.1", "*.yourdomain.com"]
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(music.router, prefix="/api/music", tags=["music generation"])  
app.include_router(proxy.router, prefix="/api/proxy", tags=["api proxy"])

@app.get("/")
async def root():
    return {
        "message": "Singularity Kernel API",
        "version": "1.0.0",
        "features": [
            "Intelligent API Key Vault",
            "Multi-Modal Music Generation",
            "Visual-Audio Synchronization", 
            "Stripe Integration",
            "DistroKid Automation"
        ]
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "vault_status": api_vault.get_status()}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
'''

# 2. Intelligent API Vault for multi-provider key management
encryption_py = '''"""
Intelligent API Vault - Automatically detects and manages API keys
Supports: OpenAI, Hugging Face, Anthropic, Gemini, Mistral, Suno, Stripe
"""
from cryptography.fernet import Fernet
from typing import Dict, Optional, List, Tuple
import re
import os
import json
import asyncio
import httpx
from enum import Enum

class APIProvider(Enum):
    OPENAI = "openai"
    HUGGINGFACE = "huggingface" 
    ANTHROPIC = "anthropic"
    GEMINI = "gemini"
    MISTRAL = "mistral"
    STRIPE = "stripe"
    SUNO = "suno"
    BLACKBOX = "blackbox"
    UNKNOWN = "unknown"

class APIVault:
    """Intelligent API key management with automatic provider detection"""
    
    def __init__(self):
        self.encryption_key = self._get_or_create_key()
        self.cipher_suite = Fernet(self.encryption_key)
        self.keys: Dict[APIProvider, str] = {}
        self.key_patterns = {
            APIProvider.OPENAI: r"sk-[A-Za-z0-9]{48,}",
            APIProvider.HUGGINGFACE: r"hf_[A-Za-z0-9]{37,}",
            APIProvider.ANTHROPIC: r"sk-ant-[A-Za-z0-9\-]{95,}",
            APIProvider.GEMINI: r"AIza[A-Za-z0-9\-]{35,}",
            APIProvider.MISTRAL: r"[A-Za-z0-9]{32}",
            APIProvider.STRIPE: r"sk_(test_|live_)[A-Za-z0-9]{99,}",
            APIProvider.BLACKBOX: r"[A-Za-z0-9\-]{36,}"
        }
    
    def _get_or_create_key(self) -> bytes:
        """Get existing encryption key or create new one"""
        key_file = ".vault_key"
        if os.path.exists(key_file):
            with open(key_file, "rb") as f:
                return f.read()
        else:
            key = Fernet.generate_key()
            with open(key_file, "wb") as f:
                f.write(key)
            return key
    
    def detect_provider(self, api_key: str) -> APIProvider:
        """Automatically detect API provider from key format"""
        for provider, pattern in self.key_patterns.items():
            if re.match(pattern, api_key):
                return provider
        
        # Special case for Suno (cookie format)
        if "suno" in api_key.lower() or len(api_key) > 200:
            return APIProvider.SUNO
            
        return APIProvider.UNKNOWN
    
    def encrypt_key(self, api_key: str) -> str:
        """Encrypt API key for secure storage"""
        return self.cipher_suite.encrypt(api_key.encode()).decode()
    
    def decrypt_key(self, encrypted_key: str) -> str:
        """Decrypt API key for use"""
        return self.cipher_suite.decrypt(encrypted_key.encode()).decode()
    
    async def add_key(self, api_key: str, provider: Optional[APIProvider] = None) -> Tuple[APIProvider, bool]:
        """Add API key with automatic provider detection and validation"""
        if not provider:
            provider = self.detect_provider(api_key)
        
        # Validate key with test API call
        is_valid = await self._validate_key(api_key, provider)
        
        if is_valid:
            encrypted_key = self.encrypt_key(api_key)
            self.keys[provider] = encrypted_key
            self._save_keys()
            return provider, True
        
        return provider, False
    
    async def _validate_key(self, api_key: str, provider: APIProvider) -> bool:
        """Validate API key with test request"""
        try:
            async with httpx.AsyncClient() as client:
                if provider == APIProvider.OPENAI:
                    response = await client.get(
                        "https://api.openai.com/v1/models",
                        headers={"Authorization": f"Bearer {api_key}"}
                    )
                    return response.status_code == 200
                    
                elif provider == APIProvider.HUGGINGFACE:
                    response = await client.get(
                        "https://huggingface.co/api/whoami-v2",
                        headers={"Authorization": f"Bearer {api_key}"}
                    )
                    return response.status_code == 200
                    
                elif provider == APIProvider.ANTHROPIC:
                    # Anthropic doesn't have a simple validation endpoint
                    return len(api_key) > 95 and api_key.startswith("sk-ant-")
                    
                elif provider == APIProvider.STRIPE:
                    response = await client.get(
                        "https://api.stripe.com/v1/account",
                        headers={"Authorization": f"Bearer {api_key}"}
                    )
                    return response.status_code == 200
                
                # Add more provider validations as needed
                return True
                
        except Exception as e:
            print(f"Key validation error for {provider}: {e}")
            return False
    
    def get_key(self, provider: APIProvider) -> Optional[str]:
        """Get decrypted API key for provider"""
        encrypted_key = self.keys.get(provider)
        if encrypted_key:
            return self.decrypt_key(encrypted_key)
        return None
    
    def _save_keys(self):
        """Save encrypted keys to disk"""
        keys_data = {provider.value: encrypted_key for provider, encrypted_key in self.keys.items()}
        with open(".vault_keys.json", "w") as f:
            json.dump(keys_data, f)
    
    def _load_keys(self):
        """Load encrypted keys from disk"""
        if os.path.exists(".vault_keys.json"):
            with open(".vault_keys.json", "r") as f:
                keys_data = json.load(f)
                self.keys = {APIProvider(k): v for k, v in keys_data.items()}
    
    async def initialize(self):
        """Initialize vault with environment variables and saved keys"""
        self._load_keys()
        
        # Auto-detect keys from environment
        env_mappings = {
            "OPENAI_API_KEY": APIProvider.OPENAI,
            "HUGGINGFACE_API_KEY": APIProvider.HUGGINGFACE,
            "ANTHROPIC_API_KEY": APIProvider.ANTHROPIC,
            "GEMINI_API_KEY": APIProvider.GEMINI,
            "MISTRAL_API_KEY": APIProvider.MISTRAL,
            "STRIPE_SECRET_KEY": APIProvider.STRIPE,
            "SUNO_COOKIE": APIProvider.SUNO,
            "BLACKBOX_API_KEY": APIProvider.BLACKBOX
        }
        
        for env_var, provider in env_mappings.items():
            key = os.getenv(env_var)
            if key and provider not in self.keys:
                await self.add_key(key, provider)
        
        print(f"✅ API Vault initialized with {len(self.keys)} providers")
    
    def get_status(self) -> Dict:
        """Get vault status for monitoring"""
        return {
            "total_providers": len(self.keys),
            "active_providers": [provider.value for provider in self.keys.keys()],
            "vault_healthy": len(self.keys) > 0
        }
    
    def get_best_provider(self, task: str) -> Optional[APIProvider]:
        """Intelligently select best provider for task"""
        task_lower = task.lower()
        
        # Task-based provider selection
        if "music" in task_lower or "audio" in task_lower:
            if APIProvider.SUNO in self.keys:
                return APIProvider.SUNO
            elif APIProvider.HUGGINGFACE in self.keys:
                return APIProvider.HUGGINGFACE
        
        elif "text" in task_lower or "chat" in task_lower:
            if APIProvider.OPENAI in self.keys:
                return APIProvider.OPENAI
            elif APIProvider.ANTHROPIC in self.keys:
                return APIProvider.ANTHROPIC
            elif APIProvider.GEMINI in self.keys:
                return APIProvider.GEMINI
        
        elif "payment" in task_lower:
            if APIProvider.STRIPE in self.keys:
                return APIProvider.STRIPE
        
        # Default to first available
        return next(iter(self.keys.keys()), None)
'''

print("🔧 BACKEND CORE FILES")
print("=" * 50)
print("\n1. 🚀 MAIN FASTAPI APPLICATION")
print("File: backend/main.py")
print("-" * 30)
print(main_py[:500] + "..." if len(main_py) > 500 else main_py)

print("\n2. 🔐 INTELLIGENT API VAULT")
print("File: backend/app/utils/encryption.py") 
print("-" * 30)
print(encryption_py[:800] + "..." if len(encryption_py) > 800 else encryption_py)