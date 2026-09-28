// The View Transitions API isn't in TypeScript's DOM lib yet. Minimal
// ambient typing for the one method ThemeToggle uses.
interface ViewTransition {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => void;
}

interface Document {
  startViewTransition?: (callback: () => void) => ViewTransition;
}