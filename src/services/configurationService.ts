import * as vscode from "vscode";
import * as path from "path";
import {
  BindingSnapshot,
  XrmConfiguration,
  BindingEntry,
} from "../types";

const CONFIG_FILENAME = "xrm.config.json";
const BINDINGS_FILENAME = "xrm.bindings.json";

export class ConfigurationService {
  private readonly workspaceFolder: vscode.WorkspaceFolder | undefined;

  constructor() {
    this.workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  }

  get workspaceRoot(): string | undefined {
    return this.workspaceFolder?.uri.fsPath;
  }

  async loadConfiguration(): Promise<XrmConfiguration> {
    const uri = this.getConfigUri();
    const exists = await this.exists(uri);
    if (!exists) {
      const defaults: XrmConfiguration = {
        environments: [
          { name: "dev", url: "https://your-dev.crm.dynamics.com" },
          { name: "prod", url: "https://your-prod.crm.dynamics.com" }
        ],
        solutions: [
          { name: "new_", displayName: "Default Solution", default: true },
          { name: "cmp_", displayName: "Component Solution" }
        ],
        defaultSolution: undefined,
      };
      await this.saveConfiguration(defaults);
      return defaults;
    }

    const content = await vscode.workspace.fs.readFile(uri);
    return JSON.parse(content.toString()) as XrmConfiguration;
  }

  async saveConfiguration(config: XrmConfiguration): Promise<void> {
    const uri = this.getConfigUri();
    await this.ensureVscodeFolder();
    await vscode.workspace.fs.writeFile(
      uri,
      Buffer.from(JSON.stringify(config, null, 2), "utf8"),
    );
  }

  async loadBindings(): Promise<BindingSnapshot> {
    const uri = this.getBindingsUri();
    const exists = await this.exists(uri);
    if (!exists) {
      const empty: BindingSnapshot = { bindings: [] };
      await this.saveBindings(empty);
      return empty;
    }

    const content = await vscode.workspace.fs.readFile(uri);
    return JSON.parse(content.toString()) as BindingSnapshot;
  }

  async saveBindings(snapshot: BindingSnapshot): Promise<void> {
    const uri = this.getBindingsUri();
    await this.ensureVscodeFolder();
    await vscode.workspace.fs.writeFile(
      uri,
      Buffer.from(JSON.stringify(snapshot, null, 2), "utf8"),
    );
  }

  createBinding(partial: BindingEntry): BindingEntry {
    if (!this.workspaceRoot) {
      throw new Error("No workspace folder detected.");
    }

    const normalizedLocal = path.normalize(partial.localPath);
    return {
      ...partial,
      localPath: normalizedLocal,
    };
  }

  getRelativeToWorkspace(fsPath: string): string {
    if (!this.workspaceRoot) {
      return fsPath;
    }

    return path.relative(this.workspaceRoot, fsPath);
  }

  private getConfigUri(): vscode.Uri {
    return this.ensureWorkspaceUri(CONFIG_FILENAME);
  }

  private getBindingsUri(): vscode.Uri {
    return this.ensureWorkspaceUri(BINDINGS_FILENAME);
  }

  private ensureWorkspaceUri(filename: string): vscode.Uri {
    if (!this.workspaceFolder) {
      throw new Error("This extension requires an opened workspace folder.");
    }

    return vscode.Uri.joinPath(
      this.workspaceFolder.uri,
      ".vscode",
      filename,
    );
  }

  private async ensureVscodeFolder(): Promise<void> {
    if (!this.workspaceFolder) {
      return;
    }

    const vscodeDir = vscode.Uri.joinPath(this.workspaceFolder.uri, ".vscode");
    const exists = await this.exists(vscodeDir);
    if (!exists) {
      await vscode.workspace.fs.createDirectory(vscodeDir);
    }
  }

  private async exists(uri: vscode.Uri): Promise<boolean> {
    try {
      await vscode.workspace.fs.stat(uri);
      return true;
    } catch {
      return false;
    }
  }
}
