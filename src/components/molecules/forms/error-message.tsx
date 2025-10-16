import type { FieldError } from "react-hook-form";

const ErrorMessage = ({ error }: { error: FieldError }) => {
  if (!error?.message) return;
  return <p className="text-sm text-red-500">{error.message}</p>;
};

export { ErrorMessage };
