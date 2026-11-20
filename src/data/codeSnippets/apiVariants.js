import { sourceIdentity } from './sourceIdentity';
let pending;
export function loadOptionsExamples() {
  // Load the comparison sources only when Options API is selected.
  pending ||= import('../optionsSources.json')
    .then((module) => module.default)
    .catch((error) => {
      pending = undefined;
      throw error;
    });
  return pending;
}
export function findOptionsExample(catalog, source) {
  return catalog?.[sourceIdentity(source)]?.code || '';
}
