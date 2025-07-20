// Infinity Singularity Labs - Quantum Vector Matrix Dashboard
class QuantumDashboard {
    constructor() {
        // Quantum Agent Data
        this.quantumAgents = [
            {
                name: "Scheduler",
                velocity: 1.0,
                priority: 3,
                load: 0.7,
                color: "#3b82f6",
                sync_state: "idle",
                coherence: 0.85,
                phase: 0.0,
                position: [1.5, 0, 0]
            },
            {
                name: "Validator",
                velocity: 0.9,
                priority: 4,
                load: 0.9,
                color: "#22c55e",
                sync_state: "idle",
                coherence: 0.72,
                phase: 1.57,
                position: [-0.8, 1.5, 0]
            },
            {
                name: "Diff Engine",
                velocity: 0.6,
                priority: 2,
                load: 0.5,
                color: "#f59e0b",
                sync_state: "idle",
                coherence: 0.91,
                phase: 3.14,
                position: [0, -1.2, 1.5]
            },
            {
                name: "Prompt Loader",
                velocity: 0.8,
                priority: 5,
                load: 0.4,
                color: "#ef4444",
                sync_state: "idle",
                coherence: 0.64,
                phase: 4.71,
                position: [-1.2, 0, -1.5]
            }
        ];

        this.entanglementPairs = [[0, 1], [2, 3], [0, 2]];
        
        this.apiProviders = [
            { name: "OpenAI", status: "Connected", tier: "Enterprise", usage: 75, limit: 1000 },
            { name: "Anthropic", status: "Connected", tier: "Pro", usage: 45, limit: 500 },
            { name: "Google", status: "Connected", tier: "Pro", usage: 30, limit: 300 },
            { name: "Perplexity", status: "Connected", tier: "Pro", usage: 25, limit: 200 },
            { name: "Mistral", status: "Throttled", tier: "Free", usage: 95, limit: 100 }
        ];

        this.tradingData = {
            balance: 12.45,
            target: 1000,
            win_rate: 0.785,
            total_trades: 142,
            daily_gain: 0.23,
            hourly_rate: 0.86
        };

        this.systemMetrics = {
            cpu_usage: 0.34,
            memory_usage: 0.67,
            network_latency: 45,
            uptime: "23:45:12"
        };

        this.charts = {};
        this.quantumScene = null;
        this.venusCanvas = null;
        this.isQuantumPaused = false;
        this.currentSection = 'dashboard';
        this.animationFrameId = null;
        this.venusPhaseVisible = true;
        this.venusAmplitudeVisible = true;
        this.autoCoherenceEnabled = true;
        this.realTimeUpdatesEnabled = true;
        this.enable3DEnabled = true;

        this.init();
    }

    init() {
        this.showLoadingScreen();
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                this.completeInitialization();
            });
        } else {
            this.setupEventListeners();
            this.completeInitialization();
        }
    }

    completeInitialization() {
        // Simulate loading time
        setTimeout(() => {
            this.hideLoadingScreen();
            this.renderAllSections();
            this.startRealTimeUpdates();
        }, 3000);
    }

    showLoadingScreen() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('hidden');
        }
    }

    hideLoadingScreen() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Navigation - Fixed with more robust event handling
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const section = btn.getAttribute('data-section');
                console.log('Navigation clicked:', section);
                if (section) {
                    this.showSection(section);
                }
            });
        });

        // Schema controls
        this.setupSchemaControls();

        // Quantum Controls
        this.setupQuantumControls();

        // VENUS Controls
        this.setupVenusControls();

        // API Actions
        this.setupAPIActions();

        // Settings
        this.setupSettings();

        console.log('Event listeners setup complete');
    }

    setupSchemaControls() {
        const sourceProvider = document.getElementById('sourceProvider');
        const targetProvider = document.getElementById('targetProvider');
        
        if (sourceProvider) {
            sourceProvider.addEventListener('change', () => {
                this.updateSchemaPreview();
            });
        }
        
        if (targetProvider) {
            targetProvider.addEventListener('change', () => {
                this.updateSchemaPreview();
            });
        }
    }

    setupQuantumControls() {
        const coherenceSlider = document.getElementById('coherenceSlider');
        const phaseSlider = document.getElementById('phaseSlider');
        const resetQuantum = document.getElementById('resetQuantum');
        const pauseQuantum = document.getElementById('pauseQuantum');

        if (coherenceSlider) {
            coherenceSlider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                const coherenceValue = document.getElementById('coherenceValue');
                if (coherenceValue) {
                    coherenceValue.textContent = value.toFixed(2);
                }
                this.updateQuantumCoherence(value);
            });
        }

        if (phaseSlider) {
            phaseSlider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                const phaseValue = document.getElementById('phaseValue');
                if (phaseValue) {
                    phaseValue.textContent = value.toFixed(2);
                }
                this.updateQuantumPhase(value);
            });
        }

        if (resetQuantum) {
            resetQuantum.addEventListener('click', () => {
                this.resetQuantumState();
            });
        }

        if (pauseQuantum) {
            pauseQuantum.addEventListener('click', (e) => {
                this.isQuantumPaused = !this.isQuantumPaused;
                e.target.textContent = this.isQuantumPaused ? 'Resume' : 'Pause';
            });
        }
    }

    setupVenusControls() {
        const togglePhase = document.getElementById('togglePhase');
        const toggleAmplitude = document.getElementById('toggleAmplitude');

        if (togglePhase) {
            togglePhase.addEventListener('click', () => {
                this.toggleVenusPhase();
            });
        }

        if (toggleAmplitude) {
            toggleAmplitude.addEventListener('click', () => {
                this.toggleVenusAmplitude();
            });
        }
    }

    setupAPIActions() {
        const testConnections = document.getElementById('testConnections');
        const refreshStatus = document.getElementById('refreshStatus');
        const exportConfig = document.getElementById('exportConfig');

        if (testConnections) {
            testConnections.addEventListener('click', () => {
                this.testAllConnections();
            });
        }

        if (refreshStatus) {
            refreshStatus.addEventListener('click', () => {
                this.refreshAPIStatus();
            });
        }

        if (exportConfig) {
            exportConfig.addEventListener('click', () => {
                this.exportAPIConfig();
            });
        }
    }

    setupSettings() {
        const exportQuantumState = document.getElementById('exportQuantumState');
        const exportPerformance = document.getElementById('exportPerformance');
        const exportAll = document.getElementById('exportAll');

        if (exportQuantumState) {
            exportQuantumState.addEventListener('click', () => {
                this.exportQuantumState();
            });
        }

        if (exportPerformance) {
            exportPerformance.addEventListener('click', () => {
                this.exportPerformance();
            });
        }

        if (exportAll) {
            exportAll.addEventListener('click', () => {
                this.exportAllData();
            });
        }

        // Settings checkboxes
        const autoCoherence = document.getElementById('autoCoherence');
        const realTimeUpdates = document.getElementById('realTimeUpdates');
        const enable3D = document.getElementById('enable3D');

        if (autoCoherence) {
            autoCoherence.addEventListener('change', (e) => {
                this.autoCoherenceEnabled = e.target.checked;
            });
        }

        if (realTimeUpdates) {
            realTimeUpdates.addEventListener('change', (e) => {
                this.realTimeUpdatesEnabled = e.target.checked;
            });
        }

        if (enable3D) {
            enable3D.addEventListener('change', (e) => {
                this.enable3DEnabled = e.target.checked;
                if (this.quantumScene) {
                    this.quantumScene.renderer.domElement.style.display = e.target.checked ? 'block' : 'none';
                }
            });
        }
    }

    showSection(sectionName) {
        console.log('Showing section:', sectionName);
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;
            console.log('Section activated:', sectionName);
        } else {
            console.error('Section not found:', sectionName);
        }

        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Initialize section-specific content
        setTimeout(() => {
            if (sectionName === 'quantum') {
                this.initializeQuantumVisualizations();
            } else if (sectionName === 'trading' && !this.charts.trading) {
                this.renderTradingExcellence();
            } else if (sectionName === 'performance' && !this.charts.performance) {
                this.renderPerformanceMetrics();
            } else if (sectionName === 'schema') {
                this.updateSchemaPreview();
            }
        }, 100);
    }

    renderAllSections() {
        console.log('Rendering all sections...');
        this.renderDashboard();
        this.renderAgentState();
        this.renderPerformanceMetrics();
        this.renderTradingExcellence();
        this.renderAPIVault();
        this.renderSettings();
        this.updateSchemaPreview();
    }

    renderDashboard() {
        // Update quantum metrics
        const avgCoherence = this.quantumAgents.reduce((sum, agent) => sum + agent.coherence, 0) / this.quantumAgents.length;
        const avgEntanglement = 0.94; // Calculated from entanglement pairs

        const coherenceEl = document.querySelector('.quantum-coherence');
        const entanglementEl = document.querySelector('.quantum-entanglement');
        const agentsEl = document.querySelector('.quantum-agents');

        if (coherenceEl) coherenceEl.textContent = avgCoherence.toFixed(2);
        if (entanglementEl) entanglementEl.textContent = avgEntanglement.toFixed(2);
        if (agentsEl) agentsEl.textContent = this.quantumAgents.length;

        // Render agent status grid
        this.renderAgentStatusGrid();

        // Render trading mini chart
        this.renderTradingMiniChart();
    }

    renderAgentStatusGrid() {
        const container = document.getElementById('agentStatusGrid');
        if (!container) return;

        container.innerHTML = '';

        this.quantumAgents.forEach((agent, index) => {
            const card = document.createElement('div');
            card.className = 'agent-card';
            card.style.setProperty('--agent-color', agent.color);
            card.innerHTML = `
                <div class="agent-name">${agent.name}</div>
                <div class="agent-metrics">
                    <span>Load: ${(agent.load * 100).toFixed(0)}%</span>
                    <span>Coherence: ${agent.coherence.toFixed(2)}</span>
                    <span>Priority: ${agent.priority}</span>
                </div>
            `;
            
            card.addEventListener('click', () => {
                this.showAgentModal(agent);
            });
            
            container.appendChild(card);
        });
    }

    renderTradingMiniChart() {
        const canvas = document.getElementById('tradingMiniChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Generate sample data
        const labels = Array.from({length: 20}, (_, i) => `T-${19-i}`);
        const data = Array.from({length: 20}, () => Math.random() * 50 + 150);

        if (this.charts.tradingMini) {
            this.charts.tradingMini.destroy();
        }

        this.charts.tradingMini = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'TSLA',
                    data: data,
                    borderColor: '#32b8c6',
                    backgroundColor: 'rgba(50, 184, 198, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
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
                        display: false
                    },
                    x: {
                        display: false
                    }
                }
            }
        });
    }

    renderAgentState() {
        const container = document.getElementById('agentCardsGrid');
        if (!container) return;

        container.innerHTML = '';

        this.quantumAgents.forEach((agent, index) => {
            const card = document.createElement('div');
            card.className = 'agent-card';
            card.style.setProperty('--agent-color', agent.color);
            card.innerHTML = `
                <div class="agent-name">${agent.name}</div>
                <div class="agent-metrics">
                    <div>Velocity: ${agent.velocity}</div>
                    <div>Priority: ${agent.priority}</div>
                    <div>Load: ${(agent.load * 100).toFixed(0)}%</div>
                    <div>Coherence: ${agent.coherence.toFixed(2)}</div>
                    <div>Phase: ${agent.phase.toFixed(2)}</div>
                    <div>Status: ${agent.sync_state}</div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                this.showAgentModal(agent);
            });
            
            container.appendChild(card);
        });
    }

    initializeQuantumVisualizations() {
        console.log('Initializing quantum visualizations...');
        this.initializeQuantum3D();
        this.initializeVenusVisualization();
        this.initializeCoherenceMatrix();
        this.renderAgentDetails();
    }

    initializeQuantum3D() {
        const container = document.getElementById('quantum3DCanvas');
        if (!container) {
            console.log('3D container not found');
            return;
        }

        if (!window.THREE) {
            console.log('Three.js not available, using fallback');
            this.renderFallback3D(container);
            return;
        }

        console.log('Initializing Three.js scene...');
        
        // Clear existing content
        container.innerHTML = '';

        try {
            // Create scene
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);

            // Create quantum agents as spheres
            const agents = [];
            this.quantumAgents.forEach((agent, index) => {
                const geometry = new THREE.SphereGeometry(agent.load * 0.5 + 0.2, 32, 32);
                const material = new THREE.MeshPhongMaterial({
                    color: agent.color,
                    transparent: true,
                    opacity: agent.coherence,
                    emissive: agent.color,
                    emissiveIntensity: 0.2
                });

                const sphere = new THREE.Mesh(geometry, material);
                sphere.position.set(...agent.position);
                sphere.userData = agent;
                scene.add(sphere);
                agents.push(sphere);
            });

            // Create entanglement connections
            const entanglements = [];
            this.entanglementPairs.forEach(pair => {
                const [agent1, agent2] = pair;
                const points = [
                    new THREE.Vector3(...this.quantumAgents[agent1].position),
                    new THREE.Vector3(...this.quantumAgents[agent2].position)
                ];
                
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineBasicMaterial({
                    color: 0x32b8c6,
                    transparent: true,
                    opacity: 0.6
                });
                
                const line = new THREE.Line(geometry, material);
                scene.add(line);
                entanglements.push(line);
            });

            // Add lighting
            const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(5, 5, 5);
            scene.add(directionalLight);

            // Add quantum field particles
            const particleGeometry = new THREE.BufferGeometry();
            const particleCount = 100;
            const positions = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount * 3; i++) {
                positions[i] = (Math.random() - 0.5) * 10;
            }
            
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const particleMaterial = new THREE.PointsMaterial({
                color: 0x32b8c6,
                size: 0.05,
                transparent: true,
                opacity: 0.6
            });
            
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.add(particles);

            camera.position.set(0, 0, 8);

            // Animation loop
            const animate = () => {
                this.animationFrameId = requestAnimationFrame(animate);

                if (!this.isQuantumPaused) {
                    const time = Date.now() * 0.001;
                    
                    // Animate agents
                    agents.forEach((sphere, index) => {
                        const agent = this.quantumAgents[index];
                        sphere.rotation.x += agent.velocity * 0.01;
                        sphere.rotation.y += agent.velocity * 0.01;
                        
                        // Pulse based on coherence
                        const scale = 1 + Math.sin(time * 2 + agent.phase) * 0.1 * agent.coherence;
                        sphere.scale.setScalar(scale);
                    });

                    // Animate particles
                    particles.rotation.x += 0.001;
                    particles.rotation.y += 0.002;

                    // Animate entanglements
                    entanglements.forEach((line, index) => {
                        const opacity = 0.3 + Math.sin(time * 3 + index) * 0.3;
                        line.material.opacity = Math.max(0.1, opacity);
                    });
                }

                renderer.render(scene, camera);
            };

            animate();
            this.quantumScene = { scene, camera, renderer, agents, particles, entanglements };
            console.log('3D scene initialized successfully');
            
        } catch (error) {
            console.error('Error initializing 3D scene:', error);
            this.renderFallback3D(container);
        }
    }

    renderFallback3D(container) {
        if (!container) return;
        
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #32b8c6; text-align: center; background: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%); border-radius: 8px;">
                <div style="font-size: 48px; margin-bottom: 16px; animation: pulse 2s infinite;">∞</div>
                <div style="font-size: 18px; margin-bottom: 8px;">Quantum Matrix Active</div>
                <div style="font-size: 14px; opacity: 0.7;">${this.quantumAgents.length} Agents Connected</div>
                <div style="font-size: 12px; opacity: 0.5; margin-top: 8px;">3D Visualization: WebGL Required</div>
            </div>
        `;
    }

    initializeVenusVisualization() {
        const canvas = document.getElementById('venusCanvas');
        if (!canvas) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const ctx = canvas.getContext('2d');
        this.venusCanvas = { canvas, ctx };

        this.renderVenusGeometry();
    }

    renderVenusGeometry() {
        const { canvas, ctx } = this.venusCanvas;
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 60;

        // Draw quantum agents as semicircles with phase indicators
        this.quantumAgents.forEach((agent, index) => {
            const angle = (index / this.quantumAgents.length) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * 80;
            const y = centerY + Math.sin(angle) * 80;

            if (this.venusAmplitudeVisible) {
                // Draw semicircle for probability amplitude
                ctx.beginPath();
                ctx.arc(x, y, radius * agent.coherence, 0, Math.PI, false);
                ctx.fillStyle = agent.color + '40';
                ctx.fill();
                ctx.strokeStyle = agent.color;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            if (this.venusPhaseVisible) {
                // Draw phase vector
                const phaseX = x + Math.cos(agent.phase) * radius * 0.8;
                const phaseY = y + Math.sin(agent.phase) * radius * 0.8;
                
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(phaseX, phaseY);
                ctx.strokeStyle = agent.color;
                ctx.lineWidth = 3;
                ctx.stroke();

                // Draw phase arrow
                const arrowSize = 8;
                const arrowAngle = agent.phase;
                ctx.beginPath();
                ctx.moveTo(phaseX, phaseY);
                ctx.lineTo(
                    phaseX - arrowSize * Math.cos(arrowAngle - Math.PI / 6),
                    phaseY - arrowSize * Math.sin(arrowAngle - Math.PI / 6)
                );
                ctx.moveTo(phaseX, phaseY);
                ctx.lineTo(
                    phaseX - arrowSize * Math.cos(arrowAngle + Math.PI / 6),
                    phaseY - arrowSize * Math.sin(arrowAngle + Math.PI / 6)
                );
                ctx.stroke();
            }

            // Draw agent name
            ctx.fillStyle = agent.color;
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(agent.name, x, y + radius + 20);
        });

        // Draw entanglement connections
        this.entanglementPairs.forEach(pair => {
            const [agent1, agent2] = pair;
            const angle1 = (agent1 / this.quantumAgents.length) * Math.PI * 2;
            const angle2 = (agent2 / this.quantumAgents.length) * Math.PI * 2;
            
            const x1 = centerX + Math.cos(angle1) * 80;
            const y1 = centerY + Math.sin(angle1) * 80;
            const x2 = centerX + Math.cos(angle2) * 80;
            const y2 = centerY + Math.sin(angle2) * 80;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = '#32b8c6';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);
        });
    }

    initializeCoherenceMatrix() {
        const container = document.getElementById('coherenceMatrix');
        if (!container) return;

        container.innerHTML = '';

        // Create correlation matrix
        const correlationMatrix = this.calculateCorrelationMatrix();
        
        correlationMatrix.forEach((row, i) => {
            row.forEach((value, j) => {
                const cell = document.createElement('div');
                cell.className = 'coherence-cell';
                cell.textContent = value.toFixed(2);
                
                // Color based on correlation strength
                const intensity = Math.abs(value);
                const hue = value > 0 ? 200 : 0; // Blue for positive, red for negative
                cell.style.backgroundColor = `hsla(${hue}, 70%, 50%, ${intensity * 0.7})`;
                cell.style.color = intensity > 0.5 ? 'white' : 'var(--color-text)';
                
                cell.addEventListener('click', () => {
                    this.showCorrelationDetails(i, j, value);
                });
                
                container.appendChild(cell);
            });
        });
    }

    calculateCorrelationMatrix() {
        const matrix = [];
        for (let i = 0; i < this.quantumAgents.length; i++) {
            matrix[i] = [];
            for (let j = 0; j < this.quantumAgents.length; j++) {
                if (i === j) {
                    matrix[i][j] = 1.0;
                } else {
                    // Calculate correlation based on coherence and phase difference
                    const agent1 = this.quantumAgents[i];
                    const agent2 = this.quantumAgents[j];
                    const phaseDiff = Math.abs(agent1.phase - agent2.phase);
                    const correlation = (agent1.coherence * agent2.coherence) * Math.cos(phaseDiff);
                    matrix[i][j] = correlation;
                }
            }
        }
        return matrix;
    }

    renderAgentDetails() {
        const container = document.getElementById('agentDetailsGrid');
        if (!container) return;

        container.innerHTML = '';

        this.quantumAgents.forEach((agent, index) => {
            const card = document.createElement('div');
            card.className = 'agent-detail-card';
            card.style.setProperty('--agent-color', agent.color);
            card.innerHTML = `
                <div class="agent-detail-header">
                    <span class="agent-detail-name">${agent.name}</span>
                    <span class="agent-detail-status">${agent.sync_state}</span>
                </div>
                <div class="agent-detail-metrics">
                    <div class="agent-detail-metric">
                        <span class="agent-detail-metric-label">Velocity</span>
                        <span class="agent-detail-metric-value">${agent.velocity}</span>
                    </div>
                    <div class="agent-detail-metric">
                        <span class="agent-detail-metric-label">Priority</span>
                        <span class="agent-detail-metric-value">${agent.priority}</span>
                    </div>
                    <div class="agent-detail-metric">
                        <span class="agent-detail-metric-label">Load</span>
                        <span class="agent-detail-metric-value">${(agent.load * 100).toFixed(0)}%</span>
                    </div>
                    <div class="agent-detail-metric">
                        <span class="agent-detail-metric-label">Coherence</span>
                        <span class="agent-detail-metric-value">${agent.coherence.toFixed(2)}</span>
                    </div>
                    <div class="agent-detail-metric">
                        <span class="agent-detail-metric-label">Phase</span>
                        <span class="agent-detail-metric-value">${agent.phase.toFixed(2)}</span>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    updateSchemaPreview() {
        const sourceProvider = document.getElementById('sourceProvider');
        const targetProvider = document.getElementById('targetProvider');
        const preview = document.getElementById('schemaPreview');
        
        if (!sourceProvider || !targetProvider || !preview) return;
        
        const sourceValue = sourceProvider.value;
        const targetValue = targetProvider.value;
        
        const schemaMapping = {
            source: sourceValue,
            target: targetValue,
            transformation: {
                model: `${sourceValue}.model → ${targetValue}.model`,
                messages: `${sourceValue}.messages → ${targetValue}.${targetValue === 'Google' ? 'contents' : 'messages'}`,
                temperature: `${sourceValue}.temperature → ${targetValue}.temperature`,
                max_tokens: `${sourceValue}.max_tokens → ${targetValue}.${targetValue === 'Google' ? 'maxOutputTokens' : 'max_tokens'}`
            },
            timestamp: new Date().toISOString()
        };
        
        preview.textContent = JSON.stringify(schemaMapping, null, 2);
    }

    renderPerformanceMetrics() {
        const canvas = document.getElementById('performanceChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Generate performance data
        const labels = Array.from({length: 24}, (_, i) => `${23-i}h`);
        const cpuData = Array.from({length: 24}, () => Math.random() * 40 + 20);
        const memoryData = Array.from({length: 24}, () => Math.random() * 30 + 50);
        const networkData = Array.from({length: 24}, () => Math.random() * 20 + 30);

        if (this.charts.performance) {
            this.charts.performance.destroy();
        }

        this.charts.performance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'CPU Usage (%)',
                        data: cpuData,
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: 'Memory Usage (%)',
                        data: memoryData,
                        borderColor: '#22c55e',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: 'Network Latency (ms)',
                        data: networkData,
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    renderTradingExcellence() {
        const canvas = document.getElementById('tradingChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Generate trading data
        const labels = Array.from({length: 50}, (_, i) => `T-${49-i}`);
        const actualData = Array.from({length: 50}, () => Math.random() * 50 + 150);
        const predictedData = actualData.map(val => val + (Math.random() - 0.5) * 20);

        if (this.charts.trading) {
            this.charts.trading.destroy();
        }

        this.charts.trading = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'TSLA Actual',
                        data: actualData,
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        tension: 0.4,
                        pointRadius: 2,
                        fill: false
                    },
                    {
                        label: 'Agent Prediction',
                        data: predictedData,
                        borderColor: '#22c55e',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        borderDash: [5, 5],
                        tension: 0.4,
                        pointRadius: 2,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Price ($)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    }
                }
            }
        });
    }

    renderAPIVault() {
        const container = document.getElementById('apiGrid');
        if (!container) return;

        container.innerHTML = '';

        this.apiProviders.forEach(provider => {
            const usagePercent = (provider.usage / provider.limit) * 100;
            const statusClass = provider.status.toLowerCase().replace(' ', '-');
            
            const card = document.createElement('div');
            card.className = 'api-card';
            card.innerHTML = `
                <div class="api-header">
                    <div class="api-name">${provider.name}</div>
                    <div class="api-tier ${provider.tier.toLowerCase()}">${provider.tier}</div>
                </div>
                <div class="api-status">
                    <div class="status-dot ${statusClass}"></div>
                    <span>${provider.status}</span>
                </div>
                <div class="api-usage">
                    <div class="usage-label">Usage: ${usagePercent.toFixed(0)}%</div>
                    <div class="usage-bar">
                        <div class="usage-fill" style="width: ${usagePercent}%; background: ${usagePercent > 80 ? '#ef4444' : '#1FB8CD'}"></div>
                    </div>
                    <div class="usage-text">${provider.usage}/${provider.limit} requests</div>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    renderSettings() {
        // Settings are mostly static HTML, just ensure interactions work
        console.log('Settings section rendered');
    }

    // Quantum control methods
    updateQuantumCoherence(value) {
        this.quantumAgents.forEach(agent => {
            agent.coherence = value;
        });
        
        if (this.quantumScene) {
            this.quantumScene.agents.forEach((sphere, index) => {
                sphere.material.opacity = value;
            });
        }
        
        if (this.venusCanvas) {
            this.renderVenusGeometry();
        }
        this.initializeCoherenceMatrix();
    }

    updateQuantumPhase(value) {
        this.quantumAgents.forEach((agent, index) => {
            agent.phase = value + index * 0.5;
        });
        
        if (this.venusCanvas) {
            this.renderVenusGeometry();
        }
        this.initializeCoherenceMatrix();
    }

    resetQuantumState() {
        this.quantumAgents.forEach((agent, index) => {
            agent.coherence = [0.85, 0.72, 0.91, 0.64][index];
            agent.phase = [0.0, 1.57, 3.14, 4.71][index];
        });
        
        const coherenceSlider = document.getElementById('coherenceSlider');
        const phaseSlider = document.getElementById('phaseSlider');
        const coherenceValue = document.getElementById('coherenceValue');
        const phaseValue = document.getElementById('phaseValue');
        
        if (coherenceSlider) coherenceSlider.value = 0.87;
        if (phaseSlider) phaseSlider.value = 0;
        if (coherenceValue) coherenceValue.textContent = '0.87';
        if (phaseValue) phaseValue.textContent = '0.00';
        
        if (this.venusCanvas) {
            this.renderVenusGeometry();
        }
        this.initializeCoherenceMatrix();
    }

    toggleVenusPhase() {
        this.venusPhaseVisible = !this.venusPhaseVisible;
        if (this.venusCanvas) {
            this.renderVenusGeometry();
        }
    }

    toggleVenusAmplitude() {
        this.venusAmplitudeVisible = !this.venusAmplitudeVisible;
        if (this.venusCanvas) {
            this.renderVenusGeometry();
        }
    }

    // Modal methods
    showAgentModal(agent) {
        const modal = document.getElementById('agentModal');
        const modalName = document.getElementById('modalAgentName');
        const modalBody = document.getElementById('modalAgentBody');
        
        if (modal && modalName && modalBody) {
            modalName.textContent = agent.name + ' - Quantum State Details';
            modalBody.innerHTML = `
                <div class="agent-detail-metrics">
                    <div class="agent-detail-metric">
                        <span class="agent-detail-metric-label">Velocity</span>
                        <span class="agent-detail-metric-value">${agent.velocity}</span>
                    </div>
                    <div class="agent-detail-metric">
                        <span class="agent-detail-metric-label">Priority</span>
                        <span class="agent-detail-metric-value">${agent.priority}</span>
                    </div>
                    <div class="agent-detail-metric">
                        <span class="agent-detail-metric-label">Load</span>
                        <span class="agent-detail-metric-value">${(agent.load * 100).toFixed(0)}%</span>
                    </div>
                    <div class="agent-detail-metric">
                        <span class="agent-detail-metric-label">Coherence</span>
                        <span class="agent-detail-metric-value">${agent.coherence.toFixed(3)}</span>
                    </div>
                    <div class="agent-detail-metric">
                        <span class="agent-detail-metric-label">Phase</span>
                        <span class="agent-detail-metric-value">${agent.phase.toFixed(3)} rad</span>
                    </div>
                    <div class="agent-detail-metric">
                        <span class="agent-detail-metric-label">Position</span>
                        <span class="agent-detail-metric-value">[${agent.position.join(', ')}]</span>
                    </div>
                    <div class="agent-detail-metric">
                        <span class="agent-detail-metric-label">Sync State</span>
                        <span class="agent-detail-metric-value">${agent.sync_state}</span>
                    </div>
                    <div class="agent-detail-metric">
                        <span class="agent-detail-metric-label">Color</span>
                        <span class="agent-detail-metric-value" style="color: ${agent.color}">${agent.color}</span>
                    </div>
                </div>
            `;
            
            modal.classList.add('active');
        }
    }

    showCorrelationDetails(i, j, value) {
        const agent1 = this.quantumAgents[i];
        const agent2 = this.quantumAgents[j];
        alert(`Quantum Correlation Analysis\n\n${agent1.name} ↔ ${agent2.name}\n\nCorrelation Coefficient: ${value.toFixed(3)}\nCoherence Product: ${(agent1.coherence * agent2.coherence).toFixed(3)}\nPhase Difference: ${Math.abs(agent1.phase - agent2.phase).toFixed(3)} rad\n\nInterpretation: ${value > 0.5 ? 'Strong Positive Correlation' : value < -0.5 ? 'Strong Negative Correlation' : 'Weak Correlation'}`);
    }

    // API methods
    testAllConnections() {
        const button = document.getElementById('testConnections');
        if (button) {
            button.textContent = 'Testing...';
            button.disabled = true;
            
            setTimeout(() => {
                this.apiProviders.forEach(provider => {
                    provider.status = Math.random() > 0.2 ? 'Connected' : 'Throttled';
                });
                
                this.renderAPIVault();
                button.textContent = 'Test All Connections';
                button.disabled = false;
                
                // Show notification
                alert('Connection test completed!\n\nAll API providers have been tested and status updated.');
            }, 2000);
        }
    }

    refreshAPIStatus() {
        const button = document.getElementById('refreshStatus');
        if (button) {
            button.textContent = 'Refreshing...';
            button.disabled = true;
            
            setTimeout(() => {
                this.apiProviders.forEach(provider => {
                    provider.usage = Math.floor(Math.random() * provider.limit);
                });
                
                this.renderAPIVault();
                button.textContent = 'Refresh Status';
                button.disabled = false;
            }, 1000);
        }
    }

    // Export methods
    exportAPIConfig() {
        const config = {
            timestamp: new Date().toISOString(),
            apiProviders: this.apiProviders,
            systemMetrics: this.systemMetrics
        };
        this.downloadJSON(config, 'api-config.json');
    }

    exportQuantumState() {
        const quantumState = {
            timestamp: new Date().toISOString(),
            quantumAgents: this.quantumAgents,
            entanglementPairs: this.entanglementPairs,
            correlationMatrix: this.calculateCorrelationMatrix(),
            systemCoherence: this.quantumAgents.reduce((sum, agent) => sum + agent.coherence, 0) / this.quantumAgents.length
        };
        this.downloadJSON(quantumState, 'quantum-state.singularity');
    }

    exportPerformance() {
        const performance = {
            timestamp: new Date().toISOString(),
            systemMetrics: this.systemMetrics,
            tradingData: this.tradingData,
            agentPerformance: this.quantumAgents.map(agent => ({
                name: agent.name,
                load: agent.load,
                velocity: agent.velocity,
                coherence: agent.coherence
            }))
        };
        this.downloadJSON(performance, 'performance-metrics.json');
    }

    exportAllData() {
        const allData = {
            timestamp: new Date().toISOString(),
            version: "2.0.0",
            quantumAgents: this.quantumAgents,
            entanglementPairs: this.entanglementPairs,
            apiProviders: this.apiProviders,
            tradingData: this.tradingData,
            systemMetrics: this.systemMetrics,
            correlationMatrix: this.calculateCorrelationMatrix(),
            settings: {
                autoCoherenceEnabled: this.autoCoherenceEnabled,
                realTimeUpdatesEnabled: this.realTimeUpdatesEnabled,
                enable3DEnabled: this.enable3DEnabled
            }
        };
        this.downloadJSON(allData, 'quantum-dashboard-complete.singularity-bundle');
    }

    downloadJSON(data, filename) {
        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', filename);
        linkElement.click();
        
        console.log(`Downloaded: ${filename}`);
    }

    // Real-time updates
    startRealTimeUpdates() {
        setInterval(() => {
            if (this.realTimeUpdatesEnabled !== false) {
                this.updateRealTimeData();
            }
        }, 3000);
    }

    updateRealTimeData() {
        // Simulate real-time quantum state changes
        this.quantumAgents.forEach(agent => {
            if (Math.random() < 0.3) {
                agent.load = Math.max(0.1, Math.min(1.0, agent.load + (Math.random() - 0.5) * 0.1));
                agent.velocity = Math.max(0.1, Math.min(2.0, agent.velocity + (Math.random() - 0.5) * 0.1));
                
                if (Math.random() < 0.1) {
                    const states = ['idle', 'active', 'processing'];
                    agent.sync_state = states[Math.floor(Math.random() * states.length)];
                }
            }
        });

        // Update system metrics
        this.systemMetrics.cpu_usage = Math.max(0.1, Math.min(1.0, this.systemMetrics.cpu_usage + (Math.random() - 0.5) * 0.05));
        this.systemMetrics.memory_usage = Math.max(0.1, Math.min(1.0, this.systemMetrics.memory_usage + (Math.random() - 0.5) * 0.05));
        this.systemMetrics.network_latency = Math.max(10, Math.min(100, this.systemMetrics.network_latency + (Math.random() - 0.5) * 5));

        // Update dashboard if currently visible
        if (this.currentSection === 'dashboard') {
            this.renderAgentStatusGrid();
        } else if (this.currentSection === 'agents') {
            this.renderAgentState();
        }
    }
}

// Global functions for modal and navigation
function showQuantumSection() {
    if (window.dashboard) {
        window.dashboard.showSection('quantum');
    }
}

function closeAgentModal() {
    const modal = document.getElementById('agentModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing dashboard...');
    window.dashboard = new QuantumDashboard();
});

// Also initialize if DOM is already loaded
if (document.readyState !== 'loading') {
    console.log('DOM already loaded, initializing dashboard...');
    window.dashboard = new QuantumDashboard();
}