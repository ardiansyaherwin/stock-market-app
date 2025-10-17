"use client";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FooterLink } from "@/components/molecules/forms/footer-link";
import { InputField } from "@/components/molecules/forms/input-field";
import { Button } from "@/components/ui/button";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    // control,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    try {
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
    console.log({ data });
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
            pattern: /^\w+@\w+\.\w+$/,
            // message: "Email address is required",
          }}
        />

        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Your password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 }}
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
