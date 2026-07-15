import { AxiosError } from "axios";

import { AppError } from "../../core/errors/AppError";

export function toAppError(error: unknown) {
  if (error instanceof AxiosError) {
    return new AppError(error.response?.statusText ?? error.message, String(error.response?.status ?? "API_ERROR"));
  }

  if (error instanceof Error) {
    return new AppError(error.message);
  }

  return new AppError("Unexpected error");
}
