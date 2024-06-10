export function interopDefault<T>(
  m: T,
): T extends { default: infer U } ? U : T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (m as any).default || m
}
