// Singularity Kernel EDM Platform JavaScript - Fixed Version

// Application Data from JSON
const appData = {
  "sunoPromptTemplate": {
    "style": "Maximal entropy bounce-grime-UKG emotional garage fusion with Ross-from-Friends analog tape warmth. Field-recorded rainfall textures as polyrhythmic foundation. Glitch-break bridges with intentional digital artifacts. Bar-0 drops with immediate emotional impact. Sub-bass mono-locked at 78Hz. Tube saturation on all harmonic elements. Stereo shimmer bloom at 9kHz.",
    "lyrics": "[Intro][Field Recording][Rainfall Texture]\n[Phase 1: Emergence][Bounce-Grime Foundation]\nRain drops like memories falling\nDigital static through the calling\n[Pre-Zoom][Building Tension]\nFeel the grid starting to bend\n[Zoom In Phase][Tempo Acceleration]\nZoom in, zoom in, feel the rush\nBass hits harder than the crush\n[Glitch-Break Bridge][Floor Collapse Trigger]\nReality fragments, sound bends\n[Phase 2: Transformation][Reload Sequence]\nReload reload, system reset\n[Phase 3: Resolution][Say Less Command]\nSay less, say less, let the music speak",
    "fx": "[Sub Mono Lock: 78Hz]\n[Bass Tube Saturation: Warm Drive]\n[Ross-from-Friends Analog Emulation: Tape Warmth]\n[Stereo Shimmer: 9kHz Bloom Enhancement]\n[Floor Collapse: Sub-Bass Impact Points]\n[Bassline Melt: Frequency Transformation Cues]"
  },
  "genreTemplates": [
    {
      "name": "Bounce-Grime Fusion",
      "style": "UK grime percussion with bounce music syncopation, analog warmth, sub-bass mono-lock @ 78Hz",
      "visualPalette": "Electric blue to deep purple gradients",
      "emotionalArc": "Aggressive build → Euphoric release → Contemplative breakdown"
    },
    {
      "name": "Emotional Garage",
      "style": "UKG rhythms with melancholic melodies, field recordings, ambient textures",
      "visualPalette": "Soft amber to midnight blue transitions",
      "emotionalArc": "Nostalgic intro → Driving progression → Cathartic resolution"
    },
    {
      "name": "Ross-from-Friends Deep",
      "style": "Analog tape saturation, lo-fi textures, warm compression, vintage synthesis",
      "visualPalette": "Warm sepia to rich burgundy",
      "emotionalArc": "Dreamy emergence → Textured journey → Peaceful fade"
    }
  ],
  "recursiveMutations": [
    "Apply quantum field recording fusion—layer cosmic background radiation as polyrhythmic foundation",
    "Implement vocal formant filtering through liquid nitrogen resonance chambers",
    "Add gravitational wave distortion to create temporal bass displacement",
    "Synchronize with aurora borealis color-frequency mapping for 12-minute interstellar narrative",
    "Integrate binaural beat frequencies aligned with gamma wave brain entrainment",
    "Layer tectonic plate movement recordings as ultra-low frequency harmonic foundation"
  ],
  "visualSyncTriggers": [
    {
      "name": "Floor Collapse",
      "frequency": "78Hz sub-bass hits",
      "effect": "Particle dissolution and gravity simulation",
      "color": "Electric blue flash to deep purple void"
    },
    {
      "name": "Bassline Melt",
      "frequency": "Mid-bass transformation 80-200Hz",
      "effect": "Fluid morphing of geometric structures",
      "color": "Gradient flow from cyan to magenta"
    },
    {
      "name": "Shimmer Bloom",
      "frequency": "9kHz+ high-frequency content",
      "effect": "Sparkle particle generation and light diffusion",
      "color": "Bright white to prismatic rainbow"
    }
  ],
  "emotionalMetrics": [
    {
      "phase": "Build-up",
      "valence": "0.3 to 0.8",
      "arousal": "0.4 to 0.9",
      "duration": "30-60 seconds"
    },
    {
      "phase": "Drop",
      "valence": "0.9",
      "arousal": "1.0",
      "duration": "15-30 seconds"
    },
    {
      "phase": "Breakdown",
      "valence": "0.6 to 0.4",
      "arousal": "0.8 to 0.3",
      "duration": "45-90 seconds"
    }
  ],
  "creditSystem": [
    {
      "action": "Basic Music Generation (2-3 min)",
      "credits": 10,
      "apiCost": "$0.03",
      "margin": "91%"
    },
    {
      "action": "Extended Music (8 min)",
      "credits": 25,
      "apiCost": "$0.08", 
      "margin": "91%"
    },
    {
      "action": "Video Sync (10 sec)",
      "credits": 20,
      "apiCost": "$0.40",
      "margin": "43%"
    },
    {
      "action": "Prompt Mutation",
      "credits": 2,
      "apiCost": "$0.01",
      "margin": "86%"
    }
  ],
  "subscriptionTiers": [
    {
      "name": "Free",
      "price": "$0",
      "credits": 50,
      "features": ["Basic prompt lab", "3 saves", "Community support"]
    },
    {
      "name": "Creator",
      "price": "$9",
      "credits": 300,
      "features": ["Visual sync", "Audio vault", "100 saves", "Priority generation"]
    },
    {
      "name": "Pro", 
      "price": "$29",
      "credits": 1000,
      "features": ["DistroKid integration", "Advanced prompts", "Unlimited saves", "API access"]
    }
  ]
};

// Global state
let currentCredits = 347;
let currentPrompt = {
  style: "",
  lyrics: "",
  fx: ""
};
let mutationHistory = [];
let syncPreviewActive = false;
let syncCanvas, syncCtx;
let emotionalChart;
let animationId;
let isInitialized = false;

// Initialize application with proper error handling
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎵 Starting Singularity Kernel EDM Platform initialization...');
  
  try {
    initializeNavigation();
    initializePromptBuilder();
    initializeMutationEngine();
    initializeVisualSync();
    initializeAnalytics();
    initializeExport();
    loadDefaultPrompt();
    exposeGlobalFunctions();
    isInitialized = true;
    console.log('✅ Platform initialized successfully');
    showNotification('🎵 Singularity Kernel ready!', 'success');
  } catch (error) {
    console.error('❌ Initialization error:', error);
    showNotification('Initialization error. Check console.', 'error');
  }
});

// Enhanced Navigation System with Better Error Handling
function initializeNavigation() {
  console.log('🧭 Initializing navigation system...');
  
  const navTabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('.section');
  
  console.log(`Found ${navTabs.length} nav tabs and ${sections.length} sections`);
  
  if (navTabs.length === 0) {
    console.error('❌ No navigation tabs found!');
    return;
  }
  
  if (sections.length === 0) {
    console.error('❌ No sections found!');
    return;
  }
  
  navTabs.forEach((tab, index) => {
    if (!tab.dataset.section) {
      console.error(`❌ Tab ${index} missing data-section attribute`);
      return;
    }
    
    console.log(`📝 Setting up tab ${index}: ${tab.dataset.section}`);
    
    // Remove any existing listeners
    tab.removeEventListener('click', handleNavClick);
    
    // Add fresh event listener
    tab.addEventListener('click', handleNavClick);
    
    console.log(`✅ Tab ${index} (${tab.dataset.section}) event listener added`);
  });
  
  console.log('✅ Navigation system initialized');
}

function handleNavClick(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const clickedTab = e.currentTarget;
  const targetSection = clickedTab.dataset.section;
  
  console.log(`🔄 Navigation clicked: ${targetSection}`);
  
  try {
    // Get all tabs and sections fresh
    const allTabs = document.querySelectorAll('.nav-tab');
    const allSections = document.querySelectorAll('.section');
    
    // Remove active from all tabs
    allTabs.forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Remove active from all sections  
    allSections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Add active to clicked tab
    clickedTab.classList.add('active');
    
    // Show target section
    const targetElement = document.getElementById(targetSection);
    if (targetElement) {
      targetElement.classList.add('active');
      console.log(`✅ Switched to section: ${targetSection}`);
      
      // Special initialization for sections that need it
      setTimeout(() => {
        if (targetSection === 'visual-sync') {
          setupCanvas();
        } else if (targetSection === 'analytics') {
          renderEmotionalChart();
        }
      }, 100);
      
      showNotification(`Switched to ${targetSection.replace('-', ' ')}`, 'info');
    } else {
      console.error(`❌ Section element not found: ${targetSection}`);
      showNotification('Section not found', 'error');
    }
  } catch (error) {
    console.error('❌ Navigation error:', error);
    showNotification('Navigation error occurred', 'error');
  }
}

// Prompt Builder Functionality
function initializePromptBuilder() {
  console.log('📝 Initializing Prompt Builder...');
  
  const styleInput = document.getElementById('styleInput');
  const lyricsInput = document.getElementById('lyricsInput');
  const fxInput = document.getElementById('fxInput');
  
  if (styleInput) {
    styleInput.addEventListener('input', function() {
      currentPrompt.style = this.value;
      updateMutationDisplay();
    });
    console.log('✅ Style input listener added');
  }
  
  if (lyricsInput) {
    lyricsInput.addEventListener('input', function() {
      currentPrompt.lyrics = this.value;
      updateMutationDisplay();
    });
    console.log('✅ Lyrics input listener added');
  }
  
  if (fxInput) {
    fxInput.addEventListener('input', function() {
      currentPrompt.fx = this.value;
      updateMutationDisplay();
    });
    console.log('✅ FX input listener added');
  }
  
  console.log('✅ Prompt Builder initialized');
}

function loadDefaultPrompt() {
  console.log('📄 Loading default prompt...');
  
  const template = appData.sunoPromptTemplate;
  
  const styleInput = document.getElementById('styleInput');
  const lyricsInput = document.getElementById('lyricsInput');
  const fxInput = document.getElementById('fxInput');
  
  if (styleInput) {
    styleInput.value = template.style;
    currentPrompt.style = template.style;
  }
  
  if (lyricsInput) {
    lyricsInput.value = template.lyrics;
    currentPrompt.lyrics = template.lyrics;
  }
  
  if (fxInput) {
    fxInput.value = template.fx;
    currentPrompt.fx = template.fx;
  }
  
  updateMutationDisplay();
  console.log('✅ Default prompt loaded');
}

// Global Functions that need to be accessible from HTML onclick
function loadTemplate(templateName) {
  console.log(`📋 Loading template: ${templateName}`);
  
  const template = appData.genreTemplates.find(t => 
    t.name.toLowerCase().replace(/[-\s]/g, '').includes(templateName.replace(/[-\s]/g, ''))
  );
  
  if (!template) {
    showNotification('Template not found', 'error');
    return;
  }
  
  const styleInput = document.getElementById('styleInput');
  if (styleInput) {
    styleInput.value = template.style;
    currentPrompt.style = template.style;
    updateMutationDisplay();
    showNotification(`Loaded ${template.name} template`, 'success');
  } else {
    showNotification('Style input not found', 'error');
  }
}

function applyGenreTemplate() {
  const select = document.getElementById('genreTemplate');
  if (!select || !select.value) {
    showNotification('Please select a template', 'warning');
    return;
  }
  
  loadTemplate(select.value);
}

function insertLyricsStructure(structureType) {
  const lyricsInput = document.getElementById('lyricsInput');
  if (!lyricsInput || !structureType) return;
  
  const structures = {
    intro: '[Intro][Field Recording]',
    build: '[Phase 1: Emergence][Building Tension]',
    drop: '[Zoom In Phase][Tempo Acceleration]',
    breakdown: '[Glitch-Break Bridge][Floor Collapse Trigger]'
  };
  
  const structure = structures[structureType];
  if (structure) {
    const cursorPos = lyricsInput.selectionStart;
    const textBefore = lyricsInput.value.substring(0, cursorPos);
    const textAfter = lyricsInput.value.substring(cursorPos);
    
    lyricsInput.value = textBefore + structure + '\n' + textAfter;
    lyricsInput.focus();
    lyricsInput.setSelectionRange(cursorPos + structure.length + 1, cursorPos + structure.length + 1);
    
    currentPrompt.lyrics = lyricsInput.value;
    updateMutationDisplay();
    showNotification('Structure added', 'success');
  }
}

function addFxBlock() {
  const fxInput = document.getElementById('fxInput');
  if (!fxInput) {
    showNotification('FX input not found', 'error');
    return;
  }
  
  const fxBlocks = [
    '[Reverb Cascade: Cathedral Space]',
    '[Delay Feedback: 1/8 Triplet]',
    '[Filter Sweep: 200Hz-8kHz]',
    '[Distortion Drive: Tube Warmth]',
    '[Chorus Depth: Wide Stereo]'
  ];
  
  const randomBlock = fxBlocks[Math.floor(Math.random() * fxBlocks.length)];
  
  if (fxInput.value) {
    fxInput.value += '\n' + randomBlock;
  } else {
    fxInput.value = randomBlock;
  }
  
  currentPrompt.fx = fxInput.value;
  updateMutationDisplay();
  showNotification('FX block added', 'success');
}

function generateMusic() {
  console.log('🎵 Generating music...');
  
  if (!currentPrompt.style && !currentPrompt.lyrics && !currentPrompt.fx) {
    showNotification('Please create a prompt first', 'warning');
    return;
  }
  
  const durationSelect = document.getElementById('durationSelect');
  const duration = durationSelect ? durationSelect.value : '8min';
  const credits = duration === '2-3min' ? 10 : duration === '12min' ? 40 : 25;
  
  if (currentCredits < credits) {
    showNotification('Insufficient credits. Please upgrade.', 'error');
    showUpgradeModal();
    return;
  }
  
  // Simulate generation process
  showNotification('Starting music generation...', 'info');
  deductCredits(credits);
  
  setTimeout(() => {
    showNotification('🎵 Music generation complete! Check your audio vault.', 'success');
    updateExportMetadata();
  }, 3000);
}

// Mutation Engine
function initializeMutationEngine() {
  console.log('🧬 Initializing Mutation Engine...');
  updateMutationDisplay();
  initializeMutationHistory();
  console.log('✅ Mutation Engine initialized');
}

function updateMutationDisplay() {
  const currentStyle = document.getElementById('currentStyle');
  const currentLyrics = document.getElementById('currentLyrics');
  const currentFx = document.getElementById('currentFx');
  
  if (currentStyle) {
    currentStyle.textContent = currentPrompt.style || 'No style defined';
  }
  if (currentLyrics) {
    currentLyrics.textContent = currentPrompt.lyrics || 'No lyrics defined';
  }
  if (currentFx) {
    currentFx.textContent = currentPrompt.fx || 'No FX defined';
  }
}

function generateMutation() {
  console.log('🧬 Generating mutations...');
  
  if (!currentPrompt.style && !currentPrompt.lyrics && !currentPrompt.fx) {
    showNotification('Load a prompt first to generate mutations', 'warning');
    return;
  }
  
  if (currentCredits < 2) {
    showNotification('Insufficient credits for mutation', 'error');
    showUpgradeModal();
    return;
  }
  
  deductCredits(2);
  showNotification('Generating DNA mutations...', 'info');
  
  // Add loading state
  const suggestionsContainer = document.querySelector('.suggestions-container');
  if (suggestionsContainer) {
    suggestionsContainer.innerHTML = '<div class="suggestion-card loading"><div class="suggestion-content">Generating creative mutations...</div></div>';
  }
  
  setTimeout(() => {
    const mutations = generateMutationSuggestions();
    displayMutations(mutations);
    addToMutationHistory();
    showNotification('🧬 New mutations generated!', 'success');
  }, 2000);
}

function generateMutationSuggestions() {
  const mutations = [];
  const mutationPool = appData.recursiveMutations;
  
  // Generate 3-4 random mutations
  const numMutations = Math.floor(Math.random() * 2) + 3;
  for (let i = 0; i < numMutations; i++) {
    const randomMutation = mutationPool[Math.floor(Math.random() * mutationPool.length)];
    if (!mutations.includes(randomMutation)) {
      mutations.push(randomMutation);
    }
  }
  
  return mutations;
}

function displayMutations(mutations) {
  const suggestionsContainer = document.querySelector('.suggestions-container');
  if (!suggestionsContainer) return;
  
  suggestionsContainer.innerHTML = '';
  
  mutations.forEach((mutation, index) => {
    const card = document.createElement('div');
    card.className = 'suggestion-card';
    card.innerHTML = `
      <div class="suggestion-content">${mutation}</div>
      <button class="btn btn--sm btn--outline" onclick="applyMutation(${index}, '${mutation.replace(/'/g, "\\'")}')">Apply Mutation</button>
    `;
    suggestionsContainer.appendChild(card);
  });
}

function applyMutation(index, mutation) {
  console.log(`🧬 Applying mutation ${index}: ${mutation.substring(0, 50)}...`);
  
  const mutationSlider = document.getElementById('mutationSlider');
  const mutationIntensity = mutationSlider ? mutationSlider.value : 35;
  const intensity = mutationIntensity / 100;
  
  // Apply mutation based on intensity
  if (intensity > 0.7) {
    // High intensity - major changes
    currentPrompt.style = mutation + " integrated with " + (currentPrompt.style || "");
  } else if (intensity > 0.3) {
    // Medium intensity - moderate changes  
    currentPrompt.fx += `\n[${mutation.substring(0, 50)}...]`;
  } else {
    // Low intensity - subtle changes
    currentPrompt.lyrics += `\n# Influenced by: ${mutation.substring(0, 30)}...`;
  }
  
  // Update inputs
  updatePromptInputs();
  updateMutationDisplay();
  addToMutationHistory();
  showNotification('Mutation applied successfully!', 'success');
}

function updatePromptInputs() {
  const styleInput = document.getElementById('styleInput');
  const lyricsInput = document.getElementById('lyricsInput');
  const fxInput = document.getElementById('fxInput');
  
  if (styleInput) styleInput.value = currentPrompt.style;
  if (lyricsInput) lyricsInput.value = currentPrompt.lyrics;
  if (fxInput) fxInput.value = currentPrompt.fx;
}

function initializeMutationHistory() {
  mutationHistory = [{
    generation: 0,
    prompt: { ...currentPrompt },
    timestamp: new Date()
  }];
  updateGenealogyTree();
}

function addToMutationHistory() {
  mutationHistory.push({
    generation: mutationHistory.length,
    prompt: { ...currentPrompt },
    timestamp: new Date()
  });
  updateGenealogyTree();
}

function updateGenealogyTree() {
  const genealogyTree = document.getElementById('genealogyTree');
  if (!genealogyTree) return;
  
  genealogyTree.innerHTML = '';
  
  mutationHistory.forEach((entry, index) => {
    const node = document.createElement('div');
    node.className = `gen-node ${index === 0 ? 'gen-node--root' : ''}`;
    node.textContent = index === 0 ? 'Original' : `Gen ${index}`;
    node.onclick = () => revertToGeneration(index);
    genealogyTree.appendChild(node);
  });
}

function revertToGeneration(generation) {
  if (generation >= 0 && generation < mutationHistory.length) {
    currentPrompt = { ...mutationHistory[generation].prompt };
    updatePromptInputs();
    updateMutationDisplay();
    showNotification(`Reverted to generation ${generation}`, 'info');
  }
}

// Visual Sync Preview
function initializeVisualSync() {
  console.log('👁️ Initializing Visual Sync...');
  console.log('✅ Visual Sync initialized');
}

function setupCanvas() {
  console.log('🖼️ Setting up canvas...');
  
  syncCanvas = document.getElementById('syncCanvas');
  if (!syncCanvas) {
    console.log('❌ Canvas not found');
    return;
  }
  
  syncCtx = syncCanvas.getContext('2d');
  
  // Set canvas size
  const rect = syncCanvas.getBoundingClientRect();
  syncCanvas.width = rect.width * window.devicePixelRatio;
  syncCanvas.height = rect.height * window.devicePixelRatio;
  syncCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
  syncCanvas.style.width = rect.width + 'px';
  syncCanvas.style.height = rect.height + 'px';
  
  drawStaticVisualization();
  console.log('✅ Canvas setup complete');
}

function drawStaticVisualization() {
  if (!syncCtx) return;
  
  const width = syncCanvas.width / window.devicePixelRatio;
  const height = syncCanvas.height / window.devicePixelRatio;
  
  // Clear canvas
  syncCtx.fillStyle = 'rgba(0, 0, 0, 0.9)';
  syncCtx.fillRect(0, 0, width, height);
  
  // Draw frequency spectrum placeholder
  const bars = 64;
  const barWidth = width / bars;
  
  for (let i = 0; i < bars; i++) {
    const barHeight = Math.random() * height * 0.5 + height * 0.1;
    const x = i * barWidth;
    const y = height - barHeight;
    
    // Create gradient
    const gradient = syncCtx.createLinearGradient(0, y, 0, height);
    gradient.addColorStop(0, '#1FB8CD');
    gradient.addColorStop(1, '#8A2BE2');
    
    syncCtx.fillStyle = gradient;
    syncCtx.fillRect(x, y, barWidth - 1, barHeight);
  }
  
  // Add central visualization
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 50;
  
  // Pulsing circle
  const gradient = syncCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
  gradient.addColorStop(0, 'rgba(31, 184, 205, 0.8)');
  gradient.addColorStop(1, 'rgba(31, 184, 205, 0.1)');
  
  syncCtx.fillStyle = gradient;
  syncCtx.beginPath();
  syncCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  syncCtx.fill();
}

function startSyncPreview() {
  console.log('▶️ Starting sync preview...');
  
  if (syncPreviewActive) return;
  
  syncPreviewActive = true;
  showNotification('Visual sync preview started', 'info');
  animateVisualization();
  
  // Auto-stop after 10 seconds
  setTimeout(stopSyncPreview, 10000);
}

function stopSyncPreview() {
  console.log('⏹️ Stopping sync preview...');
  
  syncPreviewActive = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (syncCtx) {
    drawStaticVisualization();
  }
  showNotification('Visual sync preview stopped', 'info');
}

function animateVisualization() {
  if (!syncPreviewActive || !syncCtx) return;
  
  const width = syncCanvas.width / window.devicePixelRatio;
  const height = syncCanvas.height / window.devicePixelRatio;
  
  // Clear with fade effect
  syncCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  syncCtx.fillRect(0, 0, width, height);
  
  // Animated frequency bars
  const bars = 64;
  const barWidth = width / bars;
  const time = Date.now() * 0.01;
  
  for (let i = 0; i < bars; i++) {
    const frequency = i / bars * Math.PI * 4;
    const barHeight = (Math.sin(time + frequency) * 0.5 + 0.5) * height * 0.6 + height * 0.1;
    const x = i * barWidth;
    const y = height - barHeight;
    
    const hue = (i / bars * 360 + time * 50) % 360;
    syncCtx.fillStyle = `hsl(${hue}, 70%, 60%)`;
    syncCtx.fillRect(x, y, barWidth - 1, barHeight);
  }
  
  // Animated particles
  for (let i = 0; i < 20; i++) {
    const x = (Math.sin(time * 0.5 + i) * 0.5 + 0.5) * width;
    const y = (Math.cos(time * 0.3 + i * 0.5) * 0.5 + 0.5) * height;
    const size = Math.sin(time + i) * 3 + 5;
    
    const gradient = syncCtx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    syncCtx.fillStyle = gradient;
    syncCtx.beginPath();
    syncCtx.arc(x, y, size, 0, Math.PI * 2);
    syncCtx.fill();
  }
  
  animationId = requestAnimationFrame(animateVisualization);
}

function triggerFloorCollapse() {
  console.log('💥 Triggering Floor Collapse...');
  
  if (!syncCtx) {
    setupCanvas();
    if (!syncCtx) return;
  }
  
  const width = syncCanvas.width / window.devicePixelRatio;
  const height = syncCanvas.height / window.devicePixelRatio;
  
  // Flash effect
  syncCtx.fillStyle = 'rgba(31, 184, 205, 0.8)';
  syncCtx.fillRect(0, 0, width, height);
  
  setTimeout(() => {
    syncCtx.fillStyle = 'rgba(93, 26, 139, 0.6)';
    syncCtx.fillRect(0, 0, width, height);
  }, 100);
  
  setTimeout(drawStaticVisualization, 500);
  showNotification('🔥 Floor Collapse triggered at 78Hz', 'success');
}

function triggerBasslineMelt() {
  console.log('🌊 Triggering Bassline Melt...');
  
  if (!syncCtx) {
    setupCanvas();
    if (!syncCtx) return;
  }
  
  const width = syncCanvas.width / window.devicePixelRatio;
  const height = syncCanvas.height / window.devicePixelRatio;
  
  const gradient = syncCtx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, 'rgba(0, 255, 255, 0.6)');
  gradient.addColorStop(1, 'rgba(255, 0, 255, 0.6)');
  
  syncCtx.fillStyle = gradient;
  syncCtx.fillRect(0, 0, width, height);
  
  setTimeout(drawStaticVisualization, 800);
  showNotification('🌊 Bassline Melt activated (80-200Hz)', 'success');
}

function triggerShimmerBloom() {
  console.log('✨ Triggering Shimmer Bloom...');
  
  if (!syncCtx) {
    setupCanvas();
    if (!syncCtx) return;
  }
  
  const width = syncCanvas.width / window.devicePixelRatio;
  const height = syncCanvas.height / window.devicePixelRatio;
  
  // Sparkle effect
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 10 + 2;
    
    const gradient = syncCtx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 107, 157, 0)');
    
    syncCtx.fillStyle = gradient;
    syncCtx.beginPath();
    syncCtx.arc(x, y, size, 0, Math.PI * 2);
    syncCtx.fill();
  }
  
  setTimeout(drawStaticVisualization, 1000);
  showNotification('✨ Shimmer Bloom activated (9kHz+)', 'success');
}

// Analytics Dashboard
function initializeAnalytics() {
  console.log('📊 Initializing Analytics...');
  console.log('✅ Analytics initialized');
}

function renderEmotionalChart() {
  const chartCanvas = document.getElementById('emotionalChart');
  if (!chartCanvas) {
    console.log('❌ Chart canvas not found');
    return;
  }
  
  if (emotionalChart) {
    console.log('📊 Chart already exists');
    return;
  }
  
  console.log('📊 Rendering emotional chart...');
  
  const ctx = chartCanvas.getContext('2d');
  
  // Generate emotional journey data
  const timePoints = [];
  const valenceData = [];
  const arousalData = [];
  
  // Build-up phase (0-60s)
  for (let t = 0; t <= 60; t += 5) {
    timePoints.push(t);
    valenceData.push(0.3 + (t / 60) * 0.5); // 0.3 to 0.8
    arousalData.push(0.4 + (t / 60) * 0.5); // 0.4 to 0.9
  }
  
  // Drop phase (60-90s)
  for (let t = 65; t <= 90; t += 5) {
    timePoints.push(t);
    valenceData.push(0.9); // Peak valence
    arousalData.push(1.0); // Peak arousal
  }
  
  // Breakdown phase (90-180s)
  for (let t = 95; t <= 180; t += 10) {
    timePoints.push(t);
    const progress = (t - 90) / 90;
    valenceData.push(0.6 - progress * 0.2); // 0.6 to 0.4
    arousalData.push(0.8 - progress * 0.5); // 0.8 to 0.3
  }
  
  emotionalChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: timePoints.map(t => `${Math.floor(t/60)}:${(t%60).toString().padStart(2, '0')}`),
      datasets: [{
        label: 'Valence',
        data: valenceData,
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        fill: true,
        tension: 0.4
      }, {
        label: 'Arousal',
        data: arousalData,
        borderColor: '#8A2BE2',
        backgroundColor: 'rgba(138, 43, 226, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: 'rgba(255, 255, 255, 0.8)'
          }
        }
      },
      scales: {
        x: {
          ticks: { color: 'rgba(255, 255, 255, 0.6)' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        y: {
          min: 0,
          max: 1,
          ticks: { color: 'rgba(255, 255, 255, 0.6)' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        }
      }
    }
  });
  
  console.log('✅ Emotional chart rendered');
}

// Export Functionality
function initializeExport() {
  console.log('📤 Initializing Export...');
  updateExportMetadata();
  console.log('✅ Export system initialized');
}

function updateExportMetadata() {
  const metadataPreview = document.getElementById('metadataPreview');
  if (!metadataPreview) return;
  
  const metadata = {
    title: "Generated Track",
    genre: "Bounce-Grime Fusion",
    duration: "8:24",
    emotional_arc: "Aggressive → Euphoric → Contemplative",
    sync_triggers: ["Floor Collapse", "Bassline Melt"],
    generation_params: {
      mutation_rate: (document.getElementById('mutationSlider')?.value || 35) / 100,
      style_focus: "analog_warmth"
    },
    prompt_dna: {
      style: currentPrompt.style ? currentPrompt.style.substring(0, 100) + "..." : "Not defined",
      lyrics_phases: currentPrompt.lyrics ? currentPrompt.lyrics.split('\n').length : 0,
      fx_blocks: currentPrompt.fx ? currentPrompt.fx.split('\n').length : 0
    }
  };
  
  metadataPreview.textContent = JSON.stringify(metadata, null, 2);
}

// Credit System
function deductCredits(amount) {
  console.log(`💳 Deducting ${amount} credits...`);
  currentCredits = Math.max(0, currentCredits - amount);
  updateCreditsDisplay();
}

function updateCreditsDisplay() {
  const creditAmount = document.getElementById('creditAmount');
  if (creditAmount) {
    creditAmount.textContent = currentCredits;
    
    // Add visual feedback
    creditAmount.classList.add('pulse');
    setTimeout(() => {
      creditAmount.classList.remove('pulse');
    }, 1000);
  }
}

// Modal Functions
function showUpgradeModal() {
  console.log('💰 Showing upgrade modal...');
  const modal = document.getElementById('upgradeModal');
  if (modal) {
    modal.classList.add('show');
  }
}

function hideUpgradeModal() {
  console.log('❌ Hiding upgrade modal...');
  const modal = document.getElementById('upgradeModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
  console.log(`🔔 Notification: ${message} (${type})`);
  
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(n => n.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification`;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 1100;
    max-width: 350px;
    padding: 16px 20px;
    background: rgba(13, 13, 35, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    font-size: 14px;
    box-shadow: 0 0 20px rgba(31, 184, 205, 0.3);
    animation: slideInRight 0.4s ease-out;
  `;
  
  // Add type-specific styling
  if (type === 'success') {
    notification.style.borderLeftColor = '#00FF7F';
    notification.style.borderLeftWidth = '3px';
  } else if (type === 'error') {
    notification.style.borderLeftColor = '#FF1493';
    notification.style.borderLeftWidth = '3px';
  } else if (type === 'warning') {
    notification.style.borderLeftColor = '#FFFF00';
    notification.style.borderLeftWidth = '3px';
  }
  
  notification.textContent = message;
  
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
  }, 4000);
}

// Window resize handler
window.addEventListener('resize', function() {
  if (syncCanvas) {
    setupCanvas();
  }
});

// Expose all necessary global functions for HTML onclick handlers
function exposeGlobalFunctions() {
  console.log('🌐 Exposing global functions...');
  
  // Make sure all functions are available globally
  window.loadTemplate = loadTemplate;
  window.applyGenreTemplate = applyGenreTemplate;
  window.insertLyricsStructure = insertLyricsStructure;
  window.addFxBlock = addFxBlock;
  window.generateMusic = generateMusic;
  window.generateMutation = generateMutation;
  window.applyMutation = applyMutation;
  window.revertToGeneration = revertToGeneration;
  window.startSyncPreview = startSyncPreview;
  window.stopSyncPreview = stopSyncPreview;
  window.triggerFloorCollapse = triggerFloorCollapse;
  window.triggerBasslineMelt = triggerBasslineMelt;
  window.triggerShimmerBloom = triggerShimmerBloom;
  window.showUpgradeModal = showUpgradeModal;
  window.hideUpgradeModal = hideUpgradeModal;
  
  console.log('✅ Global functions exposed');
}

// Debug function for testing
window.debugApp = function() {
  console.log('🔍 App Debug Info:');
  console.log('- Initialized:', isInitialized);
  console.log('- Current Credits:', currentCredits);
  console.log('- Current Prompt:', currentPrompt);
  console.log('- Mutation History Length:', mutationHistory.length);
  console.log('- Sync Preview Active:', syncPreviewActive);
  console.log('- Canvas Context:', !!syncCtx);
  console.log('- Chart Instance:', !!emotionalChart);
};

console.log('🎵 Singularity Kernel EDM Platform script loaded! Type debugApp() for debug info.');