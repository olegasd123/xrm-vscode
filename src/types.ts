export interface EnvironmentConfig {
  name: string;
  url: string;
}

export interface SolutionConfig {
  /** Publisher prefix used for web resource paths, e.g. new_ */
  prefix: string;
  displayName?: string;
  default?: boolean;
}

export interface XrmConfiguration {
  environments: EnvironmentConfig[];
  solutions: SolutionConfig[];
  /** Default publisher prefix */
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

export interface PublishContext {
  credentialsMissing: boolean;
}
