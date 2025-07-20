#!/bin/bash
echo "🔁 Setting up Infinity Singularity Kernel..."

# Create required directories
mkdir -p agents/meta orchestration/langgraph_dags memory plugins wasm docs apps

# Move behavior manifest
if [ -f "gpt_behavior_manifest.json" ]; then
  mv gpt_behavior_manifest.json agents/meta/
fi

# Run refactor if available
if [ -f "copilot_refactor.sh" ]; then
  bash copilot_refactor.sh
fi

# Confirm repo structure
echo "✅ Repo modular structure initialized."

# Git init if needed
if [ ! -d ".git" ]; then
  git init
  git add .
  git commit -m "Initialize Infinity Singularity Kernel"
fi
