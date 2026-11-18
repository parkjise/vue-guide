const SECRET_PATTERN = /\b(?:AIza[\w-]{35}|sk-(?:proj-|svcacct-)?[\w-]{20,})/;
export function hasSecret(value, config = {}) {
  const text = typeof value === 'string' ? value : JSON.stringify(value) || '';
  return (
    SECRET_PATTERN.test(text) ||
    ['GEMINI_API_KEY', 'OPENAI_API_KEY'].some((name) => {
      const key = config[name]?.trim();
      return key && key.length >= 8 && text.includes(key);
    })
  );
}
