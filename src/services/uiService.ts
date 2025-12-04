import * as vscode from "vscode";
import { EnvironmentConfig } from "../types";

export class UiService {
  async pickEnvironment(
    environments: EnvironmentConfig[],
  ): Promise<EnvironmentConfig | undefined> {
    if (!environments.length) {
      vscode.window.showErrorMessage(
        "No environments configured. Run 'XRM: Edit Environments & Solutions' first.",
      );
      return undefined;
    }

    const pick = await vscode.window.showQuickPick(
      environments.map((env) => ({
        label: env.name,
        description: env.url,
        env,
      })),
      { placeHolder: "Select environment for publish" },
    );

    return pick?.env;
  }

  async promptRemotePath(defaultValue?: string): Promise<string | undefined> {
    return vscode.window.showInputBox({
      prompt: "Enter CRM web resource path (e.g. new_/account/form.js)",
      value: defaultValue,
      ignoreFocusOut: true,
    });
  }

  async promptSolution(
    solutions: string[],
    defaultSolution?: string,
  ): Promise<string | undefined> {
    if (!solutions.length) {
      return vscode.window.showInputBox({
        prompt: "Enter solution prefix",
        value: defaultSolution,
        ignoreFocusOut: true,
      });
    }

    const pick = await vscode.window.showQuickPick(
      solutions.map((name) => ({
        label: name,
        picked: name === defaultSolution,
      })),
      { placeHolder: "Select solution for this resource" },
    );

    return pick?.label;
  }
}
