
// 🔁 Loop detection logic
function handlePlanLoopDetection(newPlan: any, previousPlan: any) {
  if (JSON.stringify(newPlan) === JSON.stringify(previousPlan)) {
    console.log("♻️ Identical plan detected. Forcing mutation...");
    return mutatePromptOrState(newPlan);
  }
  return newPlan;
}
