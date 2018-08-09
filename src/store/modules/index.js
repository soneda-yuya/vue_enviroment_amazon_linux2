import { createEntriesStore } from './entries';

export function createModules() {
  const entries = createEntriesStore();
  return {
    entries,
  };
}
