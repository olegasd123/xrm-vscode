import * as vscode from "vscode";

const LAST_ENV_KEY = "xrm.lastEnvironment";

/**
 * Stores user choices per workspace so we can preselect them later.
 */
export class LastSelectionService {
  constructor(private readonly state: vscode.Memento) {}

  async setLastEnvironment(envName: string): Promise<void> {
    await this.state.update(LAST_ENV_KEY, envName);
  }

  getLastEnvironment(): string | undefined {
    return this.state.get<string>(LAST_ENV_KEY);
  }
}
