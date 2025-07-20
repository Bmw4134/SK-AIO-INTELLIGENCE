# Create frontend components with intelligent API vault integration

# 1. API Vault React Component
api_vault_tsx = '''import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, CheckCircle, AlertCircle, Plus, Eye, EyeOff } from 'lucide-react';

interface APIKey {
  provider: string;
  isValid: boolean;
  lastValidated: string;
  masked: string;
}

interface APIVaultProps {
  onKeysUpdated?: () => void;
}

export const APIVault: React.FC<APIVaultProps> = ({ onKeysUpdated }) => {
  const [keys, setKeys] = useState<APIKey[]>([]);
  const [newKey, setNewKey] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [showValues, setShowValues] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const response = await fetch('/api/vault/keys');
      const data = await response.json();
      setKeys(data.keys);
    } catch (error) {
      console.error('Error fetching keys:', error);
    }
  };

  const addKey = async () => {
    if (!newKey.trim()) return;
    
    setIsAdding(true);
    try {
      const response = await fetch('/api/vault/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: newKey })
      });
      
      const data = await response.json();
      
      if (data.success) {
        await fetchKeys();
        setNewKey('');
        onKeysUpdated?.();
      } else {
        alert(`Failed to add key: ${data.error}`);
      }
    } catch (error) {
      console.error('Error adding key:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const toggleVisibility = (provider: string) => {
    setShowValues(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };

  const getProviderColor = (provider: string, isValid: boolean) => {
    if (!isValid) return 'border-red-500 bg-red-50';
    
    const colors = {
      openai: 'border-green-500 bg-green-50',
      huggingface: 'border-yellow-500 bg-yellow-50', 
      anthropic: 'border-orange-500 bg-orange-50',
      gemini: 'border-blue-500 bg-blue-50',
      mistral: 'border-purple-500 bg-purple-50',
      stripe: 'border-indigo-500 bg-indigo-50',
      suno: 'border-pink-500 bg-pink-50'
    };
    
    return colors[provider as keyof typeof colors] || 'border-gray-500 bg-gray-50';
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <div className="flex items-center gap-3 mb-6">
        <Key className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Intelligent API Vault</h2>
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
          {keys.filter(k => k.isValid).length} Active
        </span>
      </div>

      {/* Add New Key */}
      <div className="mb-6 p-4 border border-dashed border-gray-300 rounded-lg">
        <div className="flex gap-3">
          <input
            type="password"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="Paste any API key - provider will be detected automatically"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addKey}
            disabled={isAdding || !newKey.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isAdding ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Add Key
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ✨ Supports: OpenAI, Hugging Face, Anthropic, Gemini, Mistral, Stripe, Suno
        </p>
      </div>

      {/* API Keys List */}
      <div className="space-y-3">
        <AnimatePresence>
          {keys.map((key) => (
            <motion.div
              key={key.provider}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 border rounded-lg ${getProviderColor(key.provider, key.isValid)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {key.isValid ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <div>
                    <h3 className="font-medium capitalize">{key.provider}</h3>
                    <p className="text-sm text-gray-600">
                      {showValues[key.provider] ? '••••••••••••••••••••' : key.masked}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleVisibility(key.provider)}
                    className="p-1 hover:bg-white/50 rounded"
                  >
                    {showValues[key.provider] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <span className="text-xs text-gray-500">
                    {key.lastValidated}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {keys.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Key className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No API keys added yet</p>
          <p className="text-sm">Add your first key above to get started</p>
        </div>
      )}
    </div>
  );
};'''

# 2. Prompt Lab with enhanced DNA synthesis
prompt_lab_tsx = '''import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Play, Copy, RotateCcw, Sparkles } from 'lucide-react';

interface PromptTemplate {
  id: string;
  name: string;
  style: string;
  lyrics: string;
  fx: string;
  tags: string[];
}

const DNA_TEMPLATES: PromptTemplate[] = [
  {
    id: 'bounce-grime',
    name: 'Bounce-Grime Fusion',
    style: 'Maximal entropy bounce-grime-UKG emotional garage fusion with Ross-from-Friends analog tape warmth. Field-recorded rainfall textures as polyrhythmic foundation. Bar-0 drops with immediate emotional impact. Sub-bass mono-locked at 78Hz.',
    lyrics: '[Intro][Field Recording][Rainfall Texture]\\nRain drops like memories falling\\nDigital static through the calling\\n\\n[Zoom In Phase][Tempo Acceleration]\\nZoom in, zoom in, feel the rush\\nBass hits harder than the crush\\nGarage beats with grime precision\\nMaking sonic collision',
    fx: '[Sub Mono Lock: 78Hz]\\n[Bass Tube Saturation: Warm Drive]\\n[Stereo Shimmer: 9kHz Bloom Enhancement]\\n[Floor Collapse: Sub-Bass Impact Points]',
    tags: ['bounce', 'grime', 'emotional-garage', 'lo-fi']
  },
  {
    id: 'quantum-jungle',
    name: 'Quantum Jungle Breakbeats',
    style: 'Quantum field recording fusion with cosmic background radiation as polyrhythmic foundation beneath jungle breakbeats. Vocal formant filtering through liquid nitrogen resonance chambers. Gravitational wave distortion for temporal bass displacement.',
    lyrics: '[Cosmic Intro][Background Radiation Layer]\\nStars align in digital time\\nQuantum beats in paradigm\\n\\n[Jungle Break Phase]\\nBreakbeats cutting through the void\\nLiquid nitrogen harmonies deployed\\nGravitational waves reshape the sound\\nWhere space and rhythm can be found',
    fx: '[Quantum Field Processing]\\n[Liquid Nitrogen Resonance]\\n[Gravitational Wave Distortion]\\n[Aurora Borealis Color Mapping]',
    tags: ['jungle', 'quantum', 'cosmic', 'experimental']
  }
];

export const PromptLab: React.FC = () => {
  const [currentTemplate, setCurrentTemplate] = useState<PromptTemplate>(DNA_TEMPLATES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationHistory, setGenerationHistory] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/music/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          style: currentTemplate.style,
          lyrics: currentTemplate.lyrics,
          fx: currentTemplate.fx,
          duration: 480 // 8 minutes
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Add to history for recursive mutations
        setGenerationHistory(prev => [...prev, result.track_id].slice(-10));
        
        // Show success notification
        alert('🎵 Track generation started! Check Audio Vault for progress.');
      }
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const mutatePrompt = async () => {
    try {
      const response = await fetch('/api/music/mutate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base_prompt: currentTemplate,
          mutation_strength: 0.7,
          previous_generations: generationHistory
        })
      });
      
      const mutated = await response.json();
      setCurrentTemplate(mutated.template);
    } catch (error) {
      console.error('Mutation error:', error);
    }
  };

  const copyToClipboard = () => {
    const fullPrompt = `STYLE: ${currentTemplate.style}\\n\\nLYRICS:\\n${currentTemplate.lyrics}\\n\\nFX:\\n${currentTemplate.fx}`;
    navigator.clipboard.writeText(fullPrompt);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Wand2 className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold">Recursive DNA Prompt Lab</h2>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={mutatePrompt}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Mutate
            </button>
            
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              Generate
            </button>
          </div>
        </div>

        {/* Template Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">DNA Template</label>
          <div className="flex gap-2">
            {DNA_TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => setCurrentTemplate(template)}
                className={`px-4 py-2 rounded-lg border ${
                  currentTemplate.id === template.id
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>

        {/* Style Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Style Description</label>
          <textarea
            ref={textareaRef}
            value={currentTemplate.style}
            onChange={(e) => setCurrentTemplate({...currentTemplate, style: e.target.value})}
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the musical style and production techniques..."
          />
        </div>

        {/* Lyrics Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Lyrics Structure</label>
          <textarea
            value={currentTemplate.lyrics}
            onChange={(e) => setCurrentTemplate({...currentTemplate, lyrics: e.target.value})}
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write lyrics with tempo phase markers..."
          />
        </div>

        {/* FX Processing Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">FX Processing</label>
          <textarea
            value={currentTemplate.fx}
            onChange={(e) => setCurrentTemplate({...currentTemplate, fx: e.target.value})}
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Define audio processing and visual sync triggers..."
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {currentTemplate.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};'''

print("🎨 FRONTEND COMPONENTS")
print("=" * 50)
print("\n1. 🔐 API VAULT COMPONENT")
print("File: frontend/src/components/APIVault.tsx")
print("-" * 30)
print(f"Component with {len(api_vault_tsx.split('\\n'))} lines - Full reactive API key management")

print("\n2. 🧬 PROMPT LAB COMPONENT") 
print("File: frontend/src/components/PromptLab.tsx")
print("-" * 30)
print(f"Component with {len(prompt_lab_tsx.split('\\n'))} lines - Recursive DNA synthesis and mutations")