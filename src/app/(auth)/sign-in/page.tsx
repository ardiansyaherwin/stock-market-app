"use client";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FooterLink } from "@/components/molecules/forms/footer-link";
import { InputField } from "@/components/molecules/forms/input-field";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth-action";

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      const result = await signInWithEmail(data);
      if (result.success) {
        router.push("/");
      } else {
        toast.error("Sign in failed", {
          description: result.error || "Failed to sign in",
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Sign in failed", {
        description: e instanceof Error ? e.message : "Failed to sign in",
      });
    }
  };
  return (
    <>
      <h1 className="form-title">Welcome Back!</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="your@domain.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email address is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
              message: "Enter a valid email address",
            },
          }}
          autoComplete="username"
        />

        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Your password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 }}
          autoComplete="current-password"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </Button>
        <FooterLink
          text="Don't have an account?"
          linkText="Create an account"
          href="/sign-up"
        />
      </form>
    </>
  );
};

export default SignIn;
