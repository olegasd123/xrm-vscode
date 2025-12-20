import * as vscode from "vscode";
import { BindingEntry, EnvironmentConfig } from "../../features/config/domain/models";

export interface LastPublishContext {
  binding: BindingEntry;
  environment: EnvironmentConfig;
  targetUri: vscode.Uri;
  isFolder: boolean;
}

export interface LastAssemblyPublishContext {
  assemblyId: string;
  assemblyName?: string;
  environment: EnvironmentConfig;
  assemblyUri: vscode.Uri;
}

export class StatusBarService {
  private readonly item: vscode.StatusBarItem;
  private last?: LastPublishContext;

  constructor(commandId: string) {
    this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    this.item.command = commandId;
    this.item.tooltip = "Publish the last web resource again";
    this.item.hide();
  }

  setLastPublish(context: LastPublishContext): void {
    this.last = context;
    this.render();
  }

  getLastPublish(): LastPublishContext | undefined {
    return this.last;
  }

  clear(): void {
    this.last = undefined;
    this.render();
  }

  dispose(): void {
    this.item.dispose();
  }

  private render(): void {
    if (!this.last) {
      this.item.hide();
      return;
    }

    const relative = vscode.workspace.asRelativePath(this.last.targetUri, false);
    const target = this.last.isFolder ? `${relative}/` : relative;
    this.item.text = `$(file-code) ${this.last.environment.name} • ${this.last.binding.solutionName}`;
    this.item.tooltip = `Publish ${target} to ${this.last.environment.name} (${this.last.binding.remotePath})`;
    this.item.show();
  }
}

export class AssemblyStatusBarService {
  private readonly item: vscode.StatusBarItem;
  private last?: LastAssemblyPublishContext;

  constructor(commandId: string) {
    this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 99);
    this.item.command = commandId;
    this.item.tooltip = "Publish the last plugin assembly again";
    this.item.hide();
  }

  setLastPublish(context: LastAssemblyPublishContext): void {
    this.last = context;
    this.render();
  }

  getLastPublish(): LastAssemblyPublishContext | undefined {
    return this.last;
  }

  clear(): void {
    this.last = undefined;
    this.render();
  }

  dispose(): void {
    this.item.dispose();
  }

  private render(): void {
    if (!this.last) {
      this.item.hide();
      return;
    }

    const relative = vscode.workspace.asRelativePath(this.last.assemblyUri, false);
    const assemblyName = this.last.assemblyName ?? "assembly";
    this.item.text = `$(package) ${this.last.environment.name} • ${assemblyName}`;
    this.item.tooltip = `Publish ${relative} to ${this.last.environment.name}`;
    this.item.show();
  }
}
