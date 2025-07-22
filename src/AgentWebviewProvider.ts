import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class AgentWebviewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'agentOrchestrator';

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    const nonce = this.getNonce();
    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview, nonce);

    // Send initial graph state
    const graphState = {
      nodes: [],
      edges: [],
      selectedNodeId: null,
    };
    webviewView.webview.postMessage({ type: 'graphState', payload: graphState });

    // Listen for messages from the webview
    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.type) {
        case 'graphStateUpdated':
          console.log('[AgentWebviewProvider] graphStateUpdated:', data.payload);
          break;
        default:
          console.warn('[AgentWebviewProvider] Unknown message type:', data.type);
      }
    });
  }

  private getHtmlForWebview(webview: vscode.Webview, nonce: string): string {
    const htmlPath = path.join(this._extensionUri.fsPath, 'dist', 'webview.html');
    let html = fs.readFileSync(htmlPath, 'utf8');
    html = html.replace(/__WEBVIEW_NONCE__/g, nonce);

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview.js')
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview.css')
    );

    html = html.replace('__SCRIPT_URI__', scriptUri.toString());
    html = html.replace('__STYLE_URI__', styleUri.toString());

    return html;
  }

  private getNonce(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}

export function activate(context: vscode.ExtensionContext) {
  const provider = new AgentWebviewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(AgentWebviewProvider.viewType, provider)
  );
}
