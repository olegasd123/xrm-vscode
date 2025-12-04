import * as vscode from "vscode";
import { BindingEntry, EnvironmentConfig } from "../types";
import { EnvironmentCredentials } from "./secretService";

export class PublisherService {
  private readonly output: vscode.OutputChannel;

  constructor() {
    this.output = vscode.window.createOutputChannel("XRM Publisher");
  }

  async publish(
    binding: BindingEntry,
    env: EnvironmentConfig,
    creds?: EnvironmentCredentials,
  ): Promise<void> {
    this.output.appendLine(
      `[${new Date().toISOString()}] Publishing ${binding.remotePath} to ${env.name} (${env.url})...`,
    );
    if (!creds) {
      this.output.appendLine("No credentials found in secret storage for this environment.");
    } else {
      this.output.appendLine(
        `Using clientId ${creds.clientId} ${creds.tenantId ? `(tenant ${creds.tenantId})` : ""} from secret storage.`,
      );
    }
    // Placeholder for CRM publish logic.
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.output.appendLine("Upload completed (stub).");
    this.output.appendLine("Publishing to CRM (stub)...");
    await new Promise((resolve) => setTimeout(resolve, 200));
    this.output.appendLine("Publish completed.");
    this.output.show(true);
  }
}
