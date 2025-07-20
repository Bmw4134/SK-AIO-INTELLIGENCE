// Singularity Kernel App JavaScript

// Application data
const appData = {
  "apis": [
    {
      "name": "Suno v4.5+",
      "status": "Limited",
      "access": "Unofficial API via reverse engineering",
      "pricing": "$0.02-0.04 per generation",
      "complexity": "High",
      "notes": "8-12 min longform tracks, Custom Builder support",
      "limitations": "No official API, rate limits vary"
    },
    {
      "name": "OpenAI SORA",
      "status": "Unavailable",
      "access": "No public API as of June 2025",
      "pricing": "TBD",
      "complexity": "N/A",
      "notes": "Available in ChatGPT Plus/Pro only",
      "limitations": "API not released yet"
    },
    {
      "name": "Google VEO 3",
      "status": "Limited",
      "access": "Request-based via Vertex AI",
      "pricing": "$0.75 per second",
      "complexity": "High",
      "notes": "Available through fal.ai and Pollo.ai",
      "limitations": "Request approval required"
    },
    {
      "name": "Runway Gen-3",
      "status": "Available",
      "access": "API in limited release",
      "pricing": "$0.01 per credit (5 credits per second)",
      "complexity": "Medium",
      "notes": "Build and Enterprise plans available",
      "limitations": "Requires approval for wider access"
    },
    {
      "name": "OpenAI GPT-4o",
      "status": "Available",
      "access": "Full API access",
      "pricing": "$6/M input, $18/M output tokens",
      "complexity": "Low",
      "notes": "Multimodal, 128K context window",
      "limitations": "Rate limits based on tier"
    },
    {
      "name": "Anthropic Claude 3 Opus",
      "status": "Available",
      "access": "Full API access",
      "pricing": "$15/M input, $75/M output tokens",
      "complexity": "Low",
      "notes": "200K context, high intelligence",
      "limitations": "Higher cost than alternatives"
    },
    {
      "name": "Google Gemini 1.5 Pro",
      "status": "Available",
      "access": "Public preview in 180+ countries",
      "pricing": "Free tier + pay-as-you-go",
      "complexity": "Low",
      "notes": "1M context window, multimodal",
      "limitations": "Rate limits on free tier"
    },
    {
      "name": "Mistral Agents API",
      "status": "Available",
      "access": "Full API access",
      "pricing": "Usage-based pricing",
      "complexity": "Medium",
      "notes": "Code execution, web search, MCP support",
      "limitations": "Limited to specific models"
    },
    {
      "name": "Hugging Face Inference",
      "status": "Limited",
      "access": "Some models experiencing issues",
      "pricing": "Pay-as-you-go + free tier",
      "complexity": "Medium",
      "notes": "Multi-provider routing available",
      "limitations": "Model availability varies"
    },
    {
      "name": "Blackbox AI",
      "status": "Available",
      "access": "Reverse engineered APIs",
      "pricing": "Free with limitations",
      "complexity": "High",
      "notes": "Developer co-pilot functionality",
      "limitations": "Requires token extraction"
    }
  ]
};

// Code templates for different deployment targets
const codeTemplates = {
  docker: `version: '3.8'

services:
  singularity-frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8000
    depends_on:
      - singularity-backend
      - redis
      - mongodb

  singularity-backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=mongodb://mongodb:27017/singularity
      - REDIS_URL=redis://redis:6379
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=\${ANTHROPIC_API_KEY}
      - GOOGLE_API_KEY=\${GOOGLE_API_KEY}
      - RUNWAY_API_KEY=\${RUNWAY_API_KEY}
    depends_on:
      - redis
      - mongodb
    volumes:
      - ./backend:/app
      - /app/node_modules

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password

  gpu-worker:
    build:
      context: ./gpu-worker
      dockerfile: Dockerfile.gpu
    runtime: nvidia
    environment:
      - NVIDIA_VISIBLE_DEVICES=all
      - CUDA_VISIBLE_DEVICES=0
    depends_on:
      - redis

volumes:
  redis_data:
  mongodb_data:`,

  k8s: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: singularity-backend
  labels:
    app: singularity-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: singularity-backend
  template:
    metadata:
      labels:
        app: singularity-backend
    spec:
      containers:
      - name: backend
        image: singularity/backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: singularity-secrets
              key: database-url
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: api-keys
              key: openai-key
        - name: ANTHROPIC_API_KEY
          valueFrom:
            secretKeyRef:
              name: api-keys
              key: anthropic-key
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: singularity-backend-service
spec:
  selector:
    app: singularity-backend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8000
  type: ClusterIP
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gpu-worker
  labels:
    app: gpu-worker
spec:
  replicas: 1
  selector:
    matchLabels:
      app: gpu-worker
  template:
    metadata:
      labels:
        app: gpu-worker
    spec:
      containers:
      - name: gpu-worker
        image: singularity/gpu-worker:latest
        resources:
          limits:
            nvidia.com/gpu: 1
          requests:
            nvidia.com/gpu: 1
        env:
        - name: CUDA_VISIBLE_DEVICES
          value: "0"`,

  env: `# Singularity Kernel Environment Variables

# Database Configuration
DATABASE_URL=mongodb://localhost:27017/singularity
REDIS_URL=redis://localhost:6379

# API Keys - Music Generation
SUNO_API_KEY=your_suno_api_key_here
UDIO_API_KEY=your_udio_api_key_here

# API Keys - Video Generation  
RUNWAY_API_KEY=your_runway_api_key_here
GOOGLE_VERTEX_API_KEY=your_google_vertex_key_here
VEO_API_KEY=your_veo_api_key_here

# API Keys - Language Models
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
MISTRAL_API_KEY=your_mistral_api_key_here

# Hugging Face
HUGGINGFACE_API_KEY=your_huggingface_token_here

# Blackbox AI
BLACKBOX_API_KEY=your_blackbox_token_here

# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1

# GPU Configuration
CUDA_VISIBLE_DEVICES=0,1,2,3
NVIDIA_VISIBLE_DEVICES=all

# Application Settings
NODE_ENV=production
PORT=8000
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
JWT_SECRET=your_jwt_secret_here
ENCRYPTION_KEY=your_encryption_key_here

# Monitoring
SENTRY_DSN=your_sentry_dsn_here
LOG_LEVEL=info`,

  fastapi: `from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import asyncio
import redis
import motor.motor_asyncio
import openai
import anthropic
import google.generativeai as genai
from mistralai.client import MistralClient

app = FastAPI(title="Singularity Kernel API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connections
redis_client = redis.Redis(host='localhost', port=6379, decode_responses=True)
mongo_client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
db = mongo_client.singularity

# API clients
openai.api_key = "your_openai_key"
anthropic_client = anthropic.Anthropic(api_key="your_anthropic_key")
genai.configure(api_key="your_google_key")
mistral_client = MistralClient(api_key="your_mistral_key")

class GenerationRequest(BaseModel):
    style: str
    lyrics: str
    fx: str
    duration: str
    mood: str
    mutation_rate: Optional[float] = 0.35

class APIStatus(BaseModel):
    service: str
    status: str
    response_time: Optional[float]
    error_rate: Optional[float]

@app.get("/")
async def root():
    return {"message": "Singularity Kernel API"}

@app.get("/api/status")
async def get_api_status():
    """Get status of all integrated APIs"""
    statuses = []
    
    # Check OpenAI
    try:
        response = await openai.ChatCompletion.acreate(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": "test"}],
            max_tokens=1
        )
        statuses.append(APIStatus(service="OpenAI", status="Available", response_time=0.5))
    except Exception as e:
        statuses.append(APIStatus(service="OpenAI", status="Unavailable"))
    
    # Check Anthropic
    try:
        message = anthropic_client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=1,
            messages=[{"role": "user", "content": "test"}]
        )
        statuses.append(APIStatus(service="Anthropic", status="Available", response_time=0.7))
    except Exception as e:
        statuses.append(APIStatus(service="Anthropic", status="Unavailable"))
    
    return statuses

@app.post("/api/generate/music")
async def generate_music(request: GenerationRequest, background_tasks: BackgroundTasks):
    """Generate music using Suno API"""
    try:
        # Validate prompt structure
        if not all([request.style, request.lyrics, request.fx]):
            raise HTTPException(status_code=400, detail="Missing required fields")
        
        # Store generation request
        generation_id = str(uuid.uuid4())
        await db.generations.insert_one({
            "id": generation_id,
            "type": "music",
            "request": request.dict(),
            "status": "processing",
            "created_at": datetime.utcnow()
        })
        
        # Queue background processing
        background_tasks.add_task(process_music_generation, generation_id, request)
        
        return {"generation_id": generation_id, "status": "queued"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def process_music_generation(generation_id: str, request: GenerationRequest):
    """Background task to process music generation"""
    try:
        # Mutation engine logic
        if request.mutation_rate > 0:
            mutated_prompt = await mutate_prompt(request, request.mutation_rate)
        else:
            mutated_prompt = request
        
        # Call Suno API (placeholder)
        audio_result = await call_suno_api(mutated_prompt)
        
        # Update database
        await db.generations.update_one(
            {"id": generation_id},
            {"$set": {
                "status": "completed",
                "result": audio_result,
                "completed_at": datetime.utcnow()
            }}
        )
        
    except Exception as e:
        await db.generations.update_one(
            {"id": generation_id},
            {"$set": {
                "status": "failed",
                "error": str(e),
                "completed_at": datetime.utcnow()
            }}
        )

async def mutate_prompt(request: GenerationRequest, mutation_rate: float):
    """Recursive prompt mutation using GPT-4o"""
    try:
        response = await openai.ChatCompletion.acreate(
            model="gpt-4o",
            messages=[{
                "role": "system",
                "content": f"You are a creative AI that mutates music prompts. Mutation rate: {mutation_rate}"
            }, {
                "role": "user",
                "content": f"Mutate this music prompt:\\nStyle: {request.style}\\nLyrics: {request.lyrics}\\nFX: {request.fx}"
            }],
            max_tokens=500
        )
        
        # Parse response and update request
        # Implementation details...
        
        return request
    except Exception as e:
        print(f"Mutation failed: {e}")
        return request

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)`
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Singularity Kernel App...');
    initializeNavigation();
    populateAPITable();
    initializeInteractiveElements();
    updateSystemStats();
    startRealTimeUpdates();
    console.log('App initialized successfully');
});

// Fixed navigation functionality
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.section');
    
    console.log(`Found ${navTabs.length} nav tabs and ${sections.length} sections`);
    
    navTabs.forEach((tab, index) => {
        console.log(`Tab ${index}: ${tab.dataset.section}`);
        
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.dataset.section;
            console.log(`Switching to section: ${targetSection}`);
            
            // Update active tab
            navTabs.forEach(t => {
                t.classList.remove('active');
                console.log(`Removed active from tab: ${t.dataset.section}`);
            });
            this.classList.add('active');
            console.log(`Added active to tab: ${this.dataset.section}`);
            
            // Update active section
            sections.forEach(s => {
                s.classList.remove('active');
                console.log(`Hidden section: ${s.id}`);
            });
            
            const targetSectionElement = document.getElementById(targetSection);
            if (targetSectionElement) {
                targetSectionElement.classList.add('active');
                console.log(`Showed section: ${targetSection}`);
            } else {
                console.error(`Section not found: ${targetSection}`);
            }
        });
    });
}

// Populate API Integration Matrix table
function populateAPITable() {
    const tableBody = document.getElementById('apiTableBody');
    if (!tableBody) {
        console.error('API table body not found');
        return;
    }
    
    console.log('Populating API table...');
    tableBody.innerHTML = '';
    
    appData.apis.forEach((api, index) => {
        const row = document.createElement('tr');
        
        const statusClass = getStatusClass(api.status);
        const complexityClass = getComplexityClass(api.complexity);
        
        row.innerHTML = `
            <td>
                <strong>${api.name}</strong>
                <br><small style="color: var(--color-text-secondary);">${api.notes}</small>
            </td>
            <td>
                <span class="status-indicator ${statusClass}">${api.status}</span>
            </td>
            <td style="font-size: var(--font-size-sm);">${api.access}</td>
            <td style="font-weight: var(--font-weight-medium);">${api.pricing}</td>
            <td class="${complexityClass}">${api.complexity}</td>
            <td>
                <button class="btn btn--sm btn--outline" onclick="configureAPI('${api.name}')">
                    Configure
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
        console.log(`Added API row: ${api.name}`);
    });
    
    console.log(`API table populated with ${appData.apis.length} entries`);
}

function getStatusClass(status) {
    switch(status.toLowerCase()) {
        case 'available': return 'status-available';
        case 'limited': return 'status-limited';
        case 'unavailable': return 'status-unavailable';
        default: return 'status-info';
    }
}

function getComplexityClass(complexity) {
    switch(complexity.toLowerCase()) {
        case 'high': return 'complexity-high';
        case 'medium': return 'complexity-medium';
        case 'low': return 'complexity-low';
        default: return '';
    }
}

// Initialize interactive elements
function initializeInteractiveElements() {
    console.log('Initializing interactive elements...');
    
    // Mutation rate slider
    const slider = document.querySelector('.slider');
    if (slider) {
        console.log('Initializing slider...');
        slider.addEventListener('input', function() {
            const value = this.value;
            this.style.background = `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${value}%, var(--color-border) ${value}%, var(--color-border) 100%)`;
        });
        
        // Initialize slider appearance
        slider.dispatchEvent(new Event('input'));
        console.log('Slider initialized');
    }
    
    // Toggle switches
    const toggles = document.querySelectorAll('.toggle-switch input');
    console.log(`Found ${toggles.length} toggle switches`);
    toggles.forEach((toggle, index) => {
        toggle.addEventListener('change', function() {
            console.log(`Toggle ${this.id} changed to:`, this.checked);
        });
    });
    
    // Load balancing controls
    initializeLoadBalancing();
    
    // Add event listeners for buttons
    addButtonEventListeners();
}

function addButtonEventListeners() {
    // Validate Structure button
    document.addEventListener('click', function(event) {
        if (event.target.textContent.trim() === 'Validate Structure') {
            event.preventDefault();
            validatePrompt();
        } else if (event.target.textContent.trim() === 'Export with Snapshots') {
            event.preventDefault();
            exportWithSnapshots();
        }
    });
    
    console.log('Button event listeners added');
}

function initializeLoadBalancing() {
    // Simulate dynamic load distribution
    setInterval(updateLoadDistribution, 5000);
}

function updateLoadDistribution() {
    const loadBars = document.querySelectorAll('.load-bar');
    if (loadBars.length === 0) return;
    
    const models = ['GPT-4o', 'Claude', 'Gemini'];
    let total = 0;
    const loads = [];
    
    // Generate random but realistic load distribution
    models.forEach(() => {
        const load = Math.random() * 60 + 20; // 20-80%
        loads.push(load);
        total += load;
    });
    
    // Normalize to 100%
    const normalizedLoads = loads.map(load => (load / total) * 100);
    
    loadBars.forEach((bar, index) => {
        if (index < normalizedLoads.length) {
            const load = Math.round(normalizedLoads[index]);
            bar.style.width = `${load}%`;
            bar.textContent = `${models[index]} (${load}%)`;
        }
    });
}

// System stats updates
function updateSystemStats() {
    const availableApis = appData.apis.filter(api => api.status === 'Available').length;
    const limitedApis = appData.apis.filter(api => api.status === 'Limited').length;
    const totalApis = availableApis + limitedApis;
    
    const activeApisElement = document.getElementById('activeApis');
    if (activeApisElement) {
        activeApisElement.textContent = totalApis;
    }
    
    // Simulate cost calculation
    const estimatedCost = 2400 + Math.random() * 1000;
    const totalCostElement = document.getElementById('totalCost');
    if (totalCostElement) {
        totalCostElement.textContent = `$${Math.round(estimatedCost).toLocaleString()}`;
    }
    
    // Simulate uptime
    const uptime = 98.5 + Math.random() * 1.5;
    const uptimeElement = document.getElementById('uptime');
    if (uptimeElement) {
        uptimeElement.textContent = `${uptime.toFixed(1)}%`;
    }
    
    console.log('System stats updated');
}

function startRealTimeUpdates() {
    // Update stats every 30 seconds
    setInterval(updateSystemStats, 30000);
    
    // Update cost bars
    setInterval(updateCostBars, 10000);
    
    // Simulate API status changes
    setInterval(simulateStatusChanges, 60000);
}

function updateCostBars() {
    const costBars = document.querySelectorAll('.cost-bar');
    costBars.forEach((bar, index) => {
        if (!bar.classList.contains('projected')) {
            // Current month cost fluctuation
            const currentWidth = parseInt(bar.style.width) || 57;
            const newWidth = Math.max(50, Math.min(90, currentWidth + (Math.random() - 0.5) * 5));
            bar.style.width = `${newWidth}%`;
        }
    });
}

function simulateStatusChanges() {
    // Randomly update some API statuses for demo purposes
    const statusElements = document.querySelectorAll('.status-indicator');
    if (statusElements.length > 0) {
        const randomIndex = Math.floor(Math.random() * statusElements.length);
        const element = statusElements[randomIndex];
        
        // Briefly flash to show activity
        element.style.opacity = '0.5';
        setTimeout(() => {
            element.style.opacity = '1';
        }, 200);
    }
}

// API configuration modal (placeholder)
function configureAPI(apiName) {
    showNotification(`Opening configuration for ${apiName}...`, 'info');
    alert(`Configuration panel for ${apiName} would include:\n\n• API key management\n• Rate limit settings\n• Endpoint configuration\n• Testing tools\n• Usage analytics`);
}

// Code generation functionality
function generateCode() {
    const deploymentTarget = document.getElementById('deploymentTarget');
    const codeTitle = document.getElementById('codeTitle');
    const generatedCode = document.getElementById('generatedCode');
    
    if (!deploymentTarget || !codeTitle || !generatedCode) {
        console.error('Code generator elements not found');
        return;
    }
    
    const targetValue = deploymentTarget.value;
    console.log(`Generating code for: ${targetValue}`);
    
    let filename = '';
    let code = '';
    
    switch(targetValue) {
        case 'docker':
            filename = 'docker-compose.yml';
            code = codeTemplates.docker;
            break;
        case 'k8s':
            filename = 'kubernetes-deployment.yaml';
            code = codeTemplates.k8s;
            break;
        case 'env':
            filename = '.env';
            code = codeTemplates.env;
            break;
        case 'fastapi':
            filename = 'main.py';
            code = codeTemplates.fastapi;
            break;
        default:
            filename = 'config.txt';
            code = '# Please select a deployment target';
    }
    
    codeTitle.textContent = filename;
    generatedCode.textContent = code;
    
    // Animate the code appearance
    generatedCode.style.opacity = '0';
    setTimeout(() => {
        generatedCode.style.opacity = '1';
        generatedCode.style.transition = 'opacity 0.3s ease-out';
    }, 100);
    
    showNotification(`Generated ${filename}`, 'success');
}

// Copy code to clipboard
async function copyCode() {
    const codeBlock = document.getElementById('generatedCode');
    if (!codeBlock) {
        console.error('Code block not found');
        return;
    }
    
    const text = codeBlock.textContent;
    
    try {
        await navigator.clipboard.writeText(text);
        
        // Show feedback
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.backgroundColor = 'var(--color-success)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
        
        showNotification('Code copied to clipboard!', 'success');
        
    } catch (err) {
        console.error('Failed to copy code:', err);
        showNotification('Failed to copy code to clipboard', 'error');
    }
}

// Prompt validation functionality
function validatePrompt() {
    const textarea = document.querySelector('.validator-demo textarea');
    if (!textarea) {
        console.error('Validator textarea not found');
        return;
    }
    
    const value = textarea.value;
    console.log('Validating prompt:', value);
    
    // Simple validation logic
    const requiredFields = ['Style:', 'Lyrics:', 'FX:', 'Duration:', 'Mood:'];
    const missingFields = requiredFields.filter(field => !value.includes(field));
    
    if (missingFields.length === 0 && value.trim().length > 0) {
        showNotification('✓ Prompt structure is valid!', 'success');
    } else if (value.trim().length === 0) {
        showNotification('Please enter a prompt to validate', 'warning');
    } else {
        showNotification(`Missing fields: ${missingFields.join(', ')}`, 'error');
    }
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `status status--${type} notification`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Export functionality
function exportWithSnapshots() {
    const mutationSlider = document.querySelector('.slider');
    const memoryLoopToggle = document.getElementById('memoryLoop');
    
    const exportData = {
        timestamp: new Date().toISOString(),
        configuration: {
            mutation_rate: mutationSlider ? mutationSlider.value : 35,
            memory_loop: memoryLoopToggle ? memoryLoopToggle.checked : true,
            sync_triggers: ['bassline_melt', 'floor_collapse', 'shimmer_bloom']
        },
        api_status: appData.apis.map(api => ({
            name: api.name,
            status: api.status,
            pricing: api.pricing
        })),
        estimated_cost: document.getElementById('totalCost')?.textContent || '$2,847'
    };
    
    // Create downloadable file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'singularity-kernel-snapshot.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('Configuration snapshot exported!', 'success');
}

// Global click handler for dynamic buttons
document.addEventListener('click', function(event) {
    const buttonText = event.target.textContent.trim();
    
    if (buttonText === 'Generate Code') {
        event.preventDefault();
        generateCode();
    } else if (buttonText === 'Copy to Clipboard') {
        event.preventDefault();
        copyCode();
    }
});

// Global error handling
window.addEventListener('error', function(event) {
    console.error('Application error:', event.error);
    showNotification('An error occurred. Check the console for details.', 'error');
});

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }
    }
}

// Call performance tracking
setTimeout(trackPerformance, 1000);