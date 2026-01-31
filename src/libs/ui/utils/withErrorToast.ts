import { showToast } from "./showToast";

type WithErrorToastParams<T> = {
  fn: () => Promise<T>;
  errorPrefix?: string;
};

export async function withErrorToast<T>({
  fn,
  errorPrefix = "Failed to do action",
}: WithErrorToastParams<T>): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof Error) {
      showToast({
        message: `${errorPrefix}: ${error.message}`,
      });
    }
  }
}
