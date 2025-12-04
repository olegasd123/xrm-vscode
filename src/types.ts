export interface EnvironmentConfig {
  name: string;
  url: string;
  tenantId?: string;
  clientId?: string;
  clientSecret?: string;
  username?: string;
  password?: string;
}

export interface SolutionConfig {
  name: string;
  displayName?: string;
  default?: boolean;
}

export interface XrmConfiguration {
  environments: EnvironmentConfig[];
  solutions: SolutionConfig[];
  defaultSolution?: string;
}

export interface BindingEntry {
  /** Absolute path to the bound resource */
  localPath: string;
  /** CRM web resource path, e.g. new_/account/form.js */
  remotePath: string;
  /** Solution prefix or friendly name */
  solution: string;
  /** folder or file binding */
  kind: "file" | "folder";
}

export interface BindingSnapshot {
  bindings: BindingEntry[];
}
