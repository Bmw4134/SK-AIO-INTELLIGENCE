import * as vscode from 'vscode';
import { getNonce } from './utilities';

export class LangGraphViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'sk-aio-intelligence.langGraphView';
  private _view?: vscode.WebviewView;

  constructor(
    private readonly _extensionUri: vscode.Uri,
  ) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Enable JavaScript in the webview
      enableScripts: true,
      // Restrict the webview to only load resources from the extension's directory
      localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // Handle messages from the webview
    webviewView.webview.onDidReceiveMessage(message => {
      switch (message.type) {
        case 'graphStateUpdated':
          console.log('Graph state updated:', message.graphState);
          // Handle graph state updates
          break;
      }
    });

    // Example: Send initial graph state to the webview
    this._sendInitialGraphState();
  }

  private _sendInitialGraphState() {
    if (this._view) {
      // Example initial graph state
      const initialGraphState = {
        currentNode: 'node1',
        nodes: [
          {
            id: 'node1',
            type: 'sidebar',
            data: {
              nodes: [
                { id: 'start', name: 'Start', state: 'active' },
                { id: 'process', name: 'Process', state: 'idle' },
                { id: 'end', name: 'End', state: 'complete' }
              ],
              onSelectNode: (id: string) => console.log(`Selected ${id}`)
            }
          }
        ]
      };

      this._view.webview.postMessage({ 
        type: 'updateGraphState', 
        graphState: initialGraphState 
      });
    }
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    // Get the local path to main script run in the webview
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview.js')
    );

    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce();

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">
        <title>LangGraph View</title>
      </head>
      <body>
        <div id="root"></div>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>`;
  }
}