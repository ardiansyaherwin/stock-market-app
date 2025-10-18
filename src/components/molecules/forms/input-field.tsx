import { cn } from "@/lib/utils";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { ErrorMessage } from "./error-message";

const InputField = ({
  name,
  label,
  placeholder,
  type = "text",
  register,
  error,
  validation,
  disabled,
  autoComplete,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        className={cn("form-input", {
          "opacity-50 cursor-not-allowed": disabled,
        })}
        autoComplete={autoComplete || undefined}
        {...register(name, validation)}
      />
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export { InputField };
