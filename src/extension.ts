import * as vscode from 'vscode';
import { AgentWebviewProvider } from './AgentWebviewProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('SK-AIO Intelligence extension is now active');

  // Register WebView Provider
  const provider = new AgentWebviewProvider(context.extensionUri);
  
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      AgentWebviewProvider.viewType,
      provider
    )
  );

  // Register command to show the Agent view
  const showAgentViewCommand = vscode.commands.registerCommand(
    'sk-aio-intelligence.showAgentView',
    () => {
      vscode.commands.executeCommand('workbench.view.extension.agentOrchestrator-view');
    }
  );

  context.subscriptions.push(showAgentViewCommand);
}

export function deactivate() {
  // Clean up resources when extension is deactivated
}