export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function validateTitle(title: string): string | null {
  const trimmed = title.trim();
  if (!trimmed) return 'Title is required';
  if (trimmed.length < 3) return 'Title must be at least 3 characters';
  if (trimmed.length > 80) return 'Title must be 80 characters or fewer';
  return null;
}

export function validateDescription(desc: string): string | null {
  if (desc.trim().length > 300) return 'Description must be 300 characters or fewer';
  return null;
}
