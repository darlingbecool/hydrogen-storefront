const STORAGE_KEY = 'mercer79_wishlist';

export function getWishlist() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToWishlist(item) {
  const current = getWishlist();
  const newItem = {
    id: `${item.handle}-${item.size}-${item.initial}-${Date.now()}`,
    handle: item.handle,
    title: item.title,
    size: item.size,
    initial: item.initial,
    image: item.image,
    price: item.price,
    savedAt: Date.now(),
  };
  const updated = [...current, newItem];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('wishlist-updated'));
  return updated;
}

export function removeFromWishlist(id) {
  const current = getWishlist();
  const updated = current.filter((item) => item.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('wishlist-updated'));
  return updated;
}

export function isInWishlist(handle, size, initial) {
  const current = getWishlist();
  return current.some(
    (item) => item.handle === handle && item.size === size && item.initial === initial
  );
}