export interface IEnvironment {
  /**
   * Specifies whether the current environment is production (or not)
   */
  production: boolean;
  /**
   * Specifies the backend technology being used,
   * this allows angular to inject the correct service to
   * perform lower-level operations (outside of the browser)
   */
  backend: string;
}