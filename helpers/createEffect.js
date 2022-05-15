export function createEffect(type, args) {
  return {
    ...args,
    type,
    status: "idle",
    markAsStarted() {
      this.status = "started";
    },
  };
}
