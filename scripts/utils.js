let nextId = 1;

export function generateUniqueId() {
  const timestamp = Date.now();
  return `id-${timestamp}-${nextId++}`;
}