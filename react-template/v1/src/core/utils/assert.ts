export function assertDefined<TValue>(
  value: TValue | null | undefined,
  message = "Expected value to be defined",
): TValue {
  if (value === null || value === undefined) {
    throw new Error(message);
  }

  return value;
}
