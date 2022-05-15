export function runningOnClient() {
  if (typeof window !== "undefined") {
    return true;
  }
  return false;
}
