
// 🔁 Injected execution handler
function executePlanIfNeeded(plan: any) {
  if (plan.shouldExecute) {
    console.log("✅ Executing plan...");
    executeAgentPlan(plan.steps);
  } else {
    console.warn("⚠️ Plan loop detected. Forcing mutation...");
    plan = mutatePlan(plan);
    executeAgentPlan(plan.steps);
  }
}
