"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import PasswordField from "./PasswordField";
import SocialButtons from "./SocialButtons";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const SignInForm = () => {
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const { data, error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/",
    });
    if (data) {
      toast.success("Successfully LogIn");
    }
    if (error) {
      toast.error(error.message);
    }
    console.log(error);
  };

  const handleSocial = async (provider) => {
    // TODO (better-auth): authClient.signIn.social({ provider })
    const data = await authClient.signIn.social({
      provider: provider,
    });
    console.log(data);
  };

  return (
    <Card className="w-full max-w-md mt-6 p-5 sm:p-6">
      <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField name="email" type="email" isRequired className="w-full">
          <Label>ইমেইল</Label>
          <Input placeholder="you@example.com" className="w-full" />
          <FieldError />
        </TextField>

        <PasswordField
          name="password"
          label="পাসওয়ার্ড"
          placeholder="কমপক্ষে ৮ অক্ষর"
        />

        <Button
          className="bg-brand"
          type="submit"
          fullWidth
          isPending={pending}
        >
          সাইন ইন
        </Button>
      </Form>

      <SocialButtons onSocial={handleSocial} />

      <p className="mt-5 text-center text-sm text-gray-500">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/signup"
          className="font-semibold text-primary hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </Card>
  );
};

export default SignInForm;
