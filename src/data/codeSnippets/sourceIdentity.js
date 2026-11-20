// Content identity for example lookup, not a security hash. Both seeds and length are checked.
export function sourceIdentity(source) {
  let a = 2166136261,
    b = 2246822507;
  for (let i = 0; i < source.length; i++) {
    const char = source.charCodeAt(i);
    a = Math.imul(a ^ char, 16777619);
    b = Math.imul(b ^ char, 3266489909);
  }
  return `${source.length}-${(a >>> 0).toString(16)}-${(b >>> 0).toString(16)}`;
}
