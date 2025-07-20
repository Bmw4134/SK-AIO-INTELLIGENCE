// Infinity Singularity Labs - Multi-Agent Orchestration Dashboard
class InfinitySingularityApp {
    constructor() {
        this.data = {
            "agents": [
                {
                    "id": "scheduler",
                    "name": "Scheduler Agent",
                    "velocity": 1.0,
                    "priority": 3,
                    "compute_weight": 0.7,
                    "sync_state": "active",
                    "status": "running",
                    "last_updated": "2025-07-17T19:12:00Z"
                },
                {
                    "id": "validator",
                    "name": "Validator Agent", 
                    "velocity": 0.9,
                    "priority": 4,
                    "compute_weight": 0.9,
                    "sync_state": "idle",
                    "status": "ready",
                    "last_updated": "2025-07-17T19:11:45Z"
                },
                {
                    "id": "diff-engine",
                    "name": "Diff Engine",
                    "velocity": 0.6,
                    "priority": 2,
                    "compute_weight": 0.5,
                    "sync_state": "processing",
                    "status": "active",
                    "last_updated": "2025-07-17T19:12:15Z"
                },
                {
                    "id": "prompt-loader",
                    "name": "Prompt Loader",
                    "velocity": 0.8,
                    "priority": 5,
                    "compute_weight": 0.4,
                    "sync_state": "idle",
                    "status": "ready",
                    "last_updated": "2025-07-17T19:11:30Z"
                }
            ],
            "quantum_vectors": [
                {"x": 1.2, "y": 0.8, "z": -0.4, "phase": 0.7, "amplitude": 0.9},
                {"x": -0.9, "y": 1.5, "z": 0.3, "phase": 0.3, "amplitude": 0.6},
                {"x": 0.1, "y": -1.1, "z": 1.8, "phase": 0.9, "amplitude": 0.8},
                {"x": -1.4, "y": 0.2, "z": -1.0, "phase": 0.4, "amplitude": 0.7}
            ],
            "trading_data": {
                "win_rate": 78.5,
                "total_profit": 12.45,
                "balance": 487.23,
                "target": 1000.0,
                "trades_today": 15,
                "success_count": 12,
                "market_signals": [
                    {"time": "09:30", "type": "BUY", "price": 150.25, "confidence": 0.85},
                    {"time": "10:15", "type": "SELL", "price": 152.80, "confidence": 0.92},
                    {"time": "11:00", "type": "BUY", "price": 149.75, "confidence": 0.78}
                ]
            },
            "api_providers": [
                {
                    "name": "OpenAI",
                    "status": "connected",
                    "rate_limit": "90%",
                    "last_call": "2025-07-17T19:11:55Z"
                },
                {
                    "name": "Anthropic",
                    "status": "connected", 
                    "rate_limit": "45%",
                    "last_call": "2025-07-17T19:12:10Z"
                },
                {
                    "name": "Google Gemini",
                    "status": "idle",
                    "rate_limit": "20%",
                    "last_call": "2025-07-17T19:10:30Z"
                },
                {
                    "name": "Perplexity",
                    "status": "connected",
                    "rate_limit": "65%",
                    "last_call": "2025-07-17T19:12:05Z"
                }
            ],
            "traces": [
                {
                    "id": "trace-001",
                    "timestamp": "2025-07-17T19:12:15Z",
                    "phase": "AGENT",
                    "payload": {"agent_id": "scheduler", "action": "task_dispatch", "duration": 250},
                    "status": "success"
                },
                {
                    "id": "trace-002", 
                    "timestamp": "2025-07-17T19:12:10Z",
                    "phase": "SCHEMA",
                    "payload": {"source": "openai", "target": "anthropic", "translation_time": 125},
                    "status": "success"
                },
                {
                    "id": "trace-003",
                    "timestamp": "2025-07-17T19:12:05Z",
                    "phase": "INTENT",
                    "payload": {"user_query": "analyze market trends", "processing_time": 450},
                    "status": "processing"
                }
            ],
            "system_metrics": {
                "memory_usage": 0.35,
                "cpu_usage": 0.22,
                "network_latency": 45,
                "storage_used": 0.68,
                "uptime": "2d 14h 32m"
            }
        };
        
        this.updateInterval = 1000;
        this.isAnimationPaused = false;
        this.camera = { x: 0, y: 0, z: 5, rotX: 0, rotY: 0 };
        this.mouseDown = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.tradingChart = null;
        
        this.init();
    }
    
    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.setupQuantumCanvas();
        this.setupTradingChart();
        
        // Simulate loading time
        setTimeout(() => {
            this.hideLoadingScreen();
            this.renderAgents();
            this.renderAPIProviders();
            this.renderTraces();
            this.startRealTimeUpdates();
        }, 3000);
    }
    
    showLoadingScreen() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.remove('hidden');
    }
    
    hideLoadingScreen() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.add('hidden');
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.showSection(section);
            });
        });
        
        // Quantum controls
        document.getElementById('resetCamera').addEventListener('click', () => {
            this.camera = { x: 0, y: 0, z: 5, rotX: 0, rotY: 0 };
        });
        
        document.getElementById('pauseAnimation').addEventListener('click', (e) => {
            this.isAnimationPaused = !this.isAnimationPaused;
            e.target.textContent = this.isAnimationPaused ? 'Resume' : 'Pause';
        });
        
        // API actions
        document.getElementById('testConnections').addEventListener('click', () => {
            this.testAPIConnections();
        });
        
        document.getElementById('refreshKeys').addEventListener('click', () => {
            this.refreshAPIKeys();
        });
        
        // Trace controls
        document.getElementById('traceFilter').addEventListener('input', (e) => {
            this.filterTraces(e.target.value);
        });
        
        document.getElementById('tracePhase').addEventListener('change', (e) => {
            this.filterTracesByPhase(e.target.value);
        });
        
        document.getElementById('exportTraces').addEventListener('click', () => {
            this.exportTraces();
        });
        
        // Settings
        document.getElementById('themeSelect').addEventListener('change', (e) => {
            this.setTheme(e.target.value);
        });
        
        document.getElementById('updateInterval').addEventListener('change', (e) => {
            this.updateInterval = parseInt(e.target.value);
        });
        
        document.getElementById('exportConfig').addEventListener('click', () => {
            this.exportConfiguration();
        });
        
        document.getElementById('importConfig').addEventListener('click', () => {
            this.importConfiguration();
        });
    }
    
    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        document.getElementById(sectionName).classList.add('active');
        
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    }
    
    renderAgents() {
        const container = document.getElementById('agentGrid');
        container.innerHTML = '';
        
        this.data.agents.forEach(agent => {
            const card = document.createElement('div');
            card.className = 'agent-card';
            card.innerHTML = `
                <div class="agent-header">
                    <span class="agent-name">${agent.name}</span>
                    <span class="agent-status ${agent.status}">${agent.status}</span>
                </div>
                <div class="agent-metrics">
                    <div class="metric">
                        <span class="metric-label">Velocity</span>
                        <span class="metric-value">${agent.velocity.toFixed(1)}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Priority</span>
                        <span class="metric-value">${agent.priority}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Weight</span>
                        <span class="metric-value">${agent.compute_weight.toFixed(1)}</span>
                    </div>
                </div>
                <div class="velocity-bar">
                    <div class="velocity-fill" style="width: ${agent.velocity * 100}%"></div>
                </div>
            `;
            container.appendChild(card);
        });
    }
    
    renderAPIProviders() {
        const container = document.getElementById('apiProviders');
        container.innerHTML = '';
        
        this.data.api_providers.forEach(provider => {
            const card = document.createElement('div');
            card.className = 'api-card';
            card.innerHTML = `
                <div class="api-status ${provider.status}"></div>
                <div class="api-info">
                    <div class="api-name">${provider.name}</div>
                    <div class="api-rate">Rate: ${provider.rate_limit}</div>
                </div>
            `;
            container.appendChild(card);
        });
    }
    
    renderTraces() {
        const container = document.getElementById('traceList');
        container.innerHTML = '';
        
        this.data.traces.forEach(trace => {
            const item = document.createElement('div');
            item.className = 'trace-item';
            item.innerHTML = `
                <div class="trace-phase ${trace.phase.toLowerCase()}">${trace.phase}</div>
                <div class="trace-content">
                    <div class="trace-timestamp">${new Date(trace.timestamp).toLocaleTimeString()}</div>
                    <div class="trace-payload">${JSON.stringify(trace.payload)}</div>
                </div>
            `;
            container.appendChild(item);
        });
    }
    
    setupQuantumCanvas() {
        const canvas = document.getElementById('quantumCanvas');
        const ctx = canvas.getContext('2d');
        
        // Mouse interactions
        canvas.addEventListener('mousedown', (e) => {
            this.mouseDown = true;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (this.mouseDown) {
                const deltaX = e.clientX - this.lastMouseX;
                const deltaY = e.clientY - this.lastMouseY;
                this.camera.rotY += deltaX * 0.01;
                this.camera.rotX += deltaY * 0.01;
                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
            }
        });
        
        canvas.addEventListener('mouseup', () => {
            this.mouseDown = false;
        });
        
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.camera.z += e.deltaY * 0.01;
            this.camera.z = Math.max(1, Math.min(10, this.camera.z));
        });
        
        // Touch interactions
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (e.touches.length === 1) {
                this.mouseDown = true;
                this.lastMouseX = e.touches[0].clientX;
                this.lastMouseY = e.touches[0].clientY;
            }
        });
        
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.mouseDown && e.touches.length === 1) {
                const deltaX = e.touches[0].clientX - this.lastMouseX;
                const deltaY = e.touches[0].clientY - this.lastMouseY;
                this.camera.rotY += deltaX * 0.01;
                this.camera.rotX += deltaY * 0.01;
                this.lastMouseX = e.touches[0].clientX;
                this.lastMouseY = e.touches[0].clientY;
            }
        });
        
        canvas.addEventListener('touchend', () => {
            this.mouseDown = false;
        });
        
        this.renderQuantumMatrix();
    }
    
    renderQuantumMatrix() {
        const canvas = document.getElementById('quantumCanvas');
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set up 3D projection
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const scale = 80;
        
        // Rotate quantum vectors if not paused
        if (!this.isAnimationPaused) {
            this.data.quantum_vectors.forEach(vector => {
                vector.phase += 0.01;
                if (vector.phase > 1) vector.phase = 0;
            });
        }
        
        // Update phase display
        document.getElementById('phaseValue').textContent = this.data.quantum_vectors[0].phase.toFixed(2);
        
        // Draw quantum vectors as spheres
        this.data.quantum_vectors.forEach((vector, index) => {
            // Apply camera rotation
            const cosX = Math.cos(this.camera.rotX);
            const sinX = Math.sin(this.camera.rotX);
            const cosY = Math.cos(this.camera.rotY);
            const sinY = Math.sin(this.camera.rotY);
            
            let x = vector.x;
            let y = vector.y;
            let z = vector.z;
            
            // Rotate around X axis
            let newY = y * cosX - z * sinX;
            let newZ = y * sinX + z * cosX;
            y = newY;
            z = newZ;
            
            // Rotate around Y axis
            let newX = x * cosY + z * sinY;
            newZ = -x * sinY + z * cosY;
            x = newX;
            z = newZ;
            
            // Project to 2D
            const perspective = this.camera.z / (this.camera.z + z);
            const projX = centerX + x * scale * perspective;
            const projY = centerY + y * scale * perspective;
            
            // Calculate color based on phase and amplitude
            const hue = (vector.phase * 360 + index * 90) % 360;
            const alpha = vector.amplitude;
            const radius = 10 + vector.amplitude * 15;
            
            // Draw sphere with glow effect
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(projX, projY, 0, projX, projY, radius);
            gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, ${alpha})`);
            gradient.addColorStop(1, `hsla(${hue}, 70%, 30%, 0)`);
            ctx.fillStyle = gradient;
            ctx.arc(projX, projY, radius, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw connections between vectors
            if (index > 0) {
                const prevVector = this.data.quantum_vectors[index - 1];
                let prevX = prevVector.x;
                let prevY = prevVector.y;
                let prevZ = prevVector.z;
                
                // Apply same rotation
                let prevNewY = prevY * cosX - prevZ * sinX;
                let prevNewZ = prevY * sinX + prevZ * cosX;
                prevY = prevNewY;
                prevZ = prevNewZ;
                
                let prevNewX = prevX * cosY + prevZ * sinY;
                prevNewZ = -prevX * sinY + prevZ * cosY;
                prevX = prevNewX;
                prevZ = prevNewZ;
                
                const prevPerspective = this.camera.z / (this.camera.z + prevZ);
                const prevProjX = centerX + prevX * scale * prevPerspective;
                const prevProjY = centerY + prevY * scale * prevPerspective;
                
                ctx.beginPath();
                ctx.moveTo(prevProjX, prevProjY);
                ctx.lineTo(projX, projY);
                ctx.strokeStyle = `hsla(${hue}, 50%, 50%, 0.3)`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });
        
        requestAnimationFrame(() => this.renderQuantumMatrix());
    }
    
    setupTradingChart() {
        const ctx = document.getElementById('tradingChart').getContext('2d');
        
        // Generate sample trading data
        const labels = [];
        const prices = [];
        const volumes = [];
        
        for (let i = 0; i < 24; i++) {
            labels.push(`${i.toString().padStart(2, '0')}:00`);
            prices.push(150 + Math.random() * 10 - 5);
            volumes.push(Math.random() * 1000 + 500);
        }
        
        this.tradingChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Price',
                    data: prices,
                    borderColor: '#00a8ff',
                    backgroundColor: 'rgba(0, 168, 255, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ffffff'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    }
    
    startRealTimeUpdates() {
        setInterval(() => {
            this.updateAgentData();
            this.updateTradingData();
            this.updateSystemMetrics();
            this.addRandomTrace();
        }, this.updateInterval);
    }
    
    updateAgentData() {
        this.data.agents.forEach(agent => {
            // Simulate velocity changes
            agent.velocity += (Math.random() - 0.5) * 0.1;
            agent.velocity = Math.max(0, Math.min(1, agent.velocity));
            
            // Randomly change sync states
            if (Math.random() < 0.1) {
                const states = ['active', 'idle', 'processing'];
                agent.sync_state = states[Math.floor(Math.random() * states.length)];
                agent.status = agent.sync_state === 'active' ? 'running' : 
                              agent.sync_state === 'processing' ? 'active' : 'ready';
            }
            
            agent.last_updated = new Date().toISOString();
        });
        
        this.renderAgents();
    }
    
    updateTradingData() {
        // Update trading metrics
        this.data.trading_data.win_rate += (Math.random() - 0.5) * 0.5;
        this.data.trading_data.win_rate = Math.max(0, Math.min(100, this.data.trading_data.win_rate));
        
        this.data.trading_data.total_profit += (Math.random() - 0.3) * 0.5;
        this.data.trading_data.balance += (Math.random() - 0.3) * 2;
        
        // Update chart data
        if (this.tradingChart) {
            const newPrice = 150 + Math.random() * 10 - 5;
            this.tradingChart.data.datasets[0].data.push(newPrice);
            this.tradingChart.data.labels.push(new Date().toLocaleTimeString());
            
            // Keep only last 24 data points
            if (this.tradingChart.data.datasets[0].data.length > 24) {
                this.tradingChart.data.datasets[0].data.shift();
                this.tradingChart.data.labels.shift();
            }
            
            this.tradingChart.update('none');
        }
        
        // Update display
        document.querySelector('.trading-metrics .metric-value').textContent = `${this.data.trading_data.win_rate.toFixed(1)}%`;
        document.querySelectorAll('.trading-metrics .metric-value')[1].textContent = `$${this.data.trading_data.total_profit.toFixed(2)}`;
        document.querySelectorAll('.trading-metrics .metric-value')[2].textContent = `$${this.data.trading_data.balance.toFixed(2)}`;
        
        // Update progress bar
        const progress = (this.data.trading_data.balance / this.data.trading_data.target) * 100;
        document.querySelector('.progress-fill').style.width = `${Math.min(100, progress)}%`;
    }
    
    updateSystemMetrics() {
        // Simulate system metrics changes
        this.data.system_metrics.memory_usage += (Math.random() - 0.5) * 0.05;
        this.data.system_metrics.memory_usage = Math.max(0, Math.min(1, this.data.system_metrics.memory_usage));
        
        this.data.system_metrics.cpu_usage += (Math.random() - 0.5) * 0.05;
        this.data.system_metrics.cpu_usage = Math.max(0, Math.min(1, this.data.system_metrics.cpu_usage));
        
        this.data.system_metrics.storage_used += (Math.random() - 0.5) * 0.01;
        this.data.system_metrics.storage_used = Math.max(0, Math.min(1, this.data.system_metrics.storage_used));
        
        // Update display
        document.querySelectorAll('.metric-fill')[0].style.width = `${this.data.system_metrics.memory_usage * 100}%`;
        document.querySelectorAll('.metric-fill')[1].style.width = `${this.data.system_metrics.cpu_usage * 100}%`;
        document.querySelectorAll('.metric-fill')[2].style.width = `${this.data.system_metrics.storage_used * 100}%`;
        
        document.querySelectorAll('.metric-percent')[0].textContent = `${Math.round(this.data.system_metrics.memory_usage * 100)}%`;
        document.querySelectorAll('.metric-percent')[1].textContent = `${Math.round(this.data.system_metrics.cpu_usage * 100)}%`;
        document.querySelectorAll('.metric-percent')[2].textContent = `${Math.round(this.data.system_metrics.storage_used * 100)}%`;
    }
    
    addRandomTrace() {
        if (Math.random() < 0.3) {
            const phases = ['AGENT', 'SCHEMA', 'INTENT'];
            const phase = phases[Math.floor(Math.random() * phases.length)];
            const agentIds = ['scheduler', 'validator', 'diff-engine', 'prompt-loader'];
            
            const trace = {
                id: `trace-${Date.now()}`,
                timestamp: new Date().toISOString(),
                phase: phase,
                payload: {
                    agent_id: agentIds[Math.floor(Math.random() * agentIds.length)],
                    action: 'random_action',
                    duration: Math.floor(Math.random() * 500) + 100
                },
                status: Math.random() < 0.8 ? 'success' : 'processing'
            };
            
            this.data.traces.unshift(trace);
            
            // Keep only last 50 traces
            if (this.data.traces.length > 50) {
                this.data.traces.pop();
            }
            
            this.renderTraces();
        }
    }
    
    filterTraces(query) {
        const traces = document.querySelectorAll('.trace-item');
        traces.forEach(trace => {
            const content = trace.textContent.toLowerCase();
            if (content.includes(query.toLowerCase())) {
                trace.style.display = 'flex';
            } else {
                trace.style.display = 'none';
            }
        });
    }
    
    filterTracesByPhase(phase) {
        const traces = document.querySelectorAll('.trace-item');
        traces.forEach(trace => {
            const phaseElement = trace.querySelector('.trace-phase');
            if (!phase || phaseElement.textContent === phase) {
                trace.style.display = 'flex';
            } else {
                trace.style.display = 'none';
            }
        });
    }
    
    testAPIConnections() {
        document.getElementById('testConnections').textContent = 'Testing...';
        
        setTimeout(() => {
            this.data.api_providers.forEach(provider => {
                provider.status = Math.random() < 0.8 ? 'connected' : 'idle';
                provider.last_call = new Date().toISOString();
            });
            
            this.renderAPIProviders();
            document.getElementById('testConnections').textContent = 'Test All';
        }, 2000);
    }
    
    refreshAPIKeys() {
        document.getElementById('refreshKeys').textContent = 'Refreshing...';
        
        setTimeout(() => {
            this.data.api_providers.forEach(provider => {
                provider.rate_limit = `${Math.floor(Math.random() * 100)}%`;
            });
            
            this.renderAPIProviders();
            document.getElementById('refreshKeys').textContent = 'Refresh Keys';
        }, 1500);
    }
    
    exportTraces() {
        const dataStr = JSON.stringify(this.data.traces, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'traces-export.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
    
    setTheme(theme) {
        if (theme === 'system') {
            document.documentElement.removeAttribute('data-color-scheme');
        } else {
            document.documentElement.setAttribute('data-color-scheme', theme);
        }
    }
    
    exportConfiguration() {
        const config = {
            version: '2.1.0',
            timestamp: new Date().toISOString(),
            agents: this.data.agents,
            settings: {
                theme: document.getElementById('themeSelect').value,
                updateInterval: this.updateInterval,
                enable3D: document.getElementById('enable3D').checked
            },
            quantum_vectors: this.data.quantum_vectors,
            system_metrics: this.data.system_metrics
        };
        
        const dataStr = JSON.stringify(config, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = '.singularity-bundle.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
    
    importConfiguration() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const config = JSON.parse(e.target.result);
                        if (config.agents) {
                            this.data.agents = config.agents;
                            this.renderAgents();
                        }
                        if (config.settings) {
                            document.getElementById('themeSelect').value = config.settings.theme || 'system';
                            this.updateInterval = config.settings.updateInterval || 1000;
                            document.getElementById('updateInterval').value = this.updateInterval;
                            document.getElementById('enable3D').checked = config.settings.enable3D !== false;
                        }
                        alert('Configuration imported successfully!');
                    } catch (error) {
                        alert('Error importing configuration: ' + error.message);
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new InfinitySingularityApp();
});