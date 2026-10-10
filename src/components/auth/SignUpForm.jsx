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
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));

    setPending(true);
    const { data, error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      // no callbackURL: it is not used here
    });
    setPending(false);

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন করা যায়নি");
      return;
    }

    toast.success("রেজিস্ট্রেশন সফল হয়েছে!");
    router.push("/");
  };

  const handleSocial = async (provider) => {
    const data = await authClient.signIn.social({
      provider: provider,
    });
    console.log(data);
  };

  return (
    <Card className="w-full max-w-md mt-6 p-5 sm:p-6">
      <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField name="name" isRequired className="w-full">
          <Label>নাম</Label>
          <Input placeholder="যেমন: রমিজ উদ্দিন" className="w-full" />
          <FieldError />
        </TextField>

        <TextField name="email" type="email" isRequired className="w-full">
          <Label>ইমেইল</Label>
          <Input placeholder="you@example.com" className="w-full" />
          <FieldError />
        </TextField>

        <PasswordField
          name="password"
          label="পাসওয়ার্ড"
          placeholder="কমপক্ষে ৮ অক্ষর"
          minLength={8}
          onChange={setPassword}
        />

        <PasswordField
          name="confirmPassword"
          label="পাসওয়ার্ড নিশ্চিত করুন"
          placeholder="আবার লিখুন"
          validate={(v) => (v !== password ? "পাসওয়ার্ড দুটি মিলছে না" : null)}
        />

        <Button
          className="bg-brand"
          type="submit"
          fullWidth
          isPending={pending}
        >
          অ্যাকাউন্ট তৈরি করুন
        </Button>
      </Form>

      <SocialButtons onSocial={handleSocial} />

      <p className="mt-5 text-center text-sm text-gray-500">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="font-semibold text-primary hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </Card>
  );
};

export default SignUpForm;
