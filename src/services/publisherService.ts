import * as vscode from "vscode";
import { BindingEntry, EnvironmentConfig } from "../types";

export class PublisherService {
  private readonly output: vscode.OutputChannel;

  constructor() {
    this.output = vscode.window.createOutputChannel("XRM Publisher");
  }

  async publish(binding: BindingEntry, env: EnvironmentConfig): Promise<void> {
    this.output.appendLine(
      `[${new Date().toISOString()}] Publishing ${binding.remotePath} to ${env.name} (${env.url})...`,
    );
    // Placeholder for CRM publish logic.
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.output.appendLine("Upload completed (stub).");
    this.output.appendLine("Publishing to CRM (stub)...");
    await new Promise((resolve) => setTimeout(resolve, 200));
    this.output.appendLine("Publish completed.");
    this.output.show(true);
  }
}
