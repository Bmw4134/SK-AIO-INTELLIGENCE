#!/bin/bash
# Reorganize Infinity Singularity Kernel repo for modular structure

mkdir -p agents orchestration memory plugins wasm docs apps

# Move agent logic
mv script(4).py agents/file_structure_agent.py
mv prompt_dna.json agents/
mv fingerprint.json agents/
mv mutation_lineage.json agents/

# Move orchestration logic
mv schema_router.ts orchestration/
mv StateCoherenceAdapter.ts orchestration/
mkdir -p orchestration/langgraph_dags

# Move memory artifacts
mv goal_tracker.json memory/
mv session_audit.json memory/
mv diff_watcher.py memory/

# Move plugin files
mv plugin_server.py plugins/
mv run_plugin.sh plugins/
mv ai-plugin.json plugins/
mv openapi.yaml plugins/

# Move WASM registry
mv wasm_registry.json wasm/

# Move documentation
mv Recursive\ DNA\ Synthesis*.md docs/
mv Monetization*.md docs/
mv Technical*.md docs/
mv evolution_roadmap.md docs/
mv dev_compass.md docs/

# Move exported apps
mkdir -p apps/exported-assets apps/infinity-singularity-labs apps/vercel_agentic_showcase apps/singularity-kernel-demo
