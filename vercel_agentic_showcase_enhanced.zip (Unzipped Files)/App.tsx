
// 🧠 Injected checkpoint comparison
import { saveCheckpoint, loadCheckpoint, compareCheckpoint, mutatePlan } from './utils/checkpoints';

function runWithMemoryState(agentState: any) {
  const lastState = loadCheckpoint();
  if (compareCheckpoint(agentState, lastState)) {
    console.warn("🔁 Detected loop. Forcing mutation...");
    const mutated = mutatePlan(agentState);
    saveCheckpoint(mutated);
    return mutated;
  }
  saveCheckpoint(agentState);
  return agentState;
}
