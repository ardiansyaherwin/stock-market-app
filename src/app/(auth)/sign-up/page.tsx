"use client";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FooterLink } from "@/components/molecules/forms/footer-link";
import { InputField } from "@/components/molecules/forms/input-field";
import { SelectField } from "@/components/molecules/forms/select-field";
import { SelectFieldCountry } from "@/components/molecules/forms/select-field-country";
import { Button } from "@/components/ui/button";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "US",
      investmentGoals: "",
      riskTolerance: "",
      preferredIndustry: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    try {
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
    console.log({ data });
  };
  return (
    <>
      <h1 className="form-title">Sign Up & Personalize</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          validation={{ required: "Full name is required", minLength: 2 }}
        />

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

        <SelectFieldCountry
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
        />

        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter a strong password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 }}
        />

        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />

        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />

        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting
            ? "Creating account..."
            : "Start Your Investing Journey"}
        </Button>

        <FooterLink
          text="Already have an account?"
          linkText="Sign in"
          href="/sign-in"
        />
      </form>
    </>
  );
};

export default SignUp;
