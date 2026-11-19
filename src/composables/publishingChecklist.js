export const PUBLISHING_PROGRESS_KEY = 'vue-guide-publishing-checklist-v1';
export function readPublishingProgress(validIds, storage) {
  try {
    const parsed = JSON.parse(
      (storage ?? globalThis.localStorage).getItem(PUBLISHING_PROGRESS_KEY) || '[]'
    );
    return Array.isArray(parsed) ? [...new Set(parsed.filter((id) => validIds.includes(id)))] : [];
  } catch {
    return [];
  }
}
export function savePublishingProgress(ids, storage) {
  try {
    (storage ?? globalThis.localStorage).setItem(PUBLISHING_PROGRESS_KEY, JSON.stringify(ids));
    return true;
  } catch {
    return false;
  }
}
export function publishingMarkdown(categories, done) {
  const completed = new Set(done);
  return [
    '# Vue 3 실무 퍼블리싱 체크리스트',
    '',
    ...categories.flatMap((category) => [
      `## ${category.title}`,
      '',
      ...category.tips.map((tip) => `- [${completed.has(tip.id) ? 'x' : ' '}] ${tip.checklist}`),
      ''
    ])
  ].join('\n');
}
