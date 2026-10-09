"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const ProfileForm = ({ name: initialName }) => {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [savedName, setSavedName] = useState(initialName);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", text }

  const trimmed = name.trim();
  const isDirty = trimmed !== savedName;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDirty || pending) return;

    setPending(true);
    setStatus(null);

    const { error } = await authClient.updateUser({ name: trimmed });

    if (error) {
      setStatus({
        type: "error",
        text: error.message || "আপডেট করা যায়নি। আবার চেষ্টা করুন।",
      });
    } else {
      setSavedName(trimmed);
      setName(trimmed);
      setStatus({ type: "success", text: "প্রোফাইল সফলভাবে আপডেট হয়েছে।" });
      router.refresh(); // refresh server-rendered data (header, page)
    }
    setPending(false);
  };

  return (
    <Card className="p-4 sm:p-6">
      <h2 className="text-base font-bold text-heading mb-4">তথ্য</h2>

      <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          name="name"
          value={name}
          onChange={(v) => {
            setName(v);
            setStatus(null);
          }}
          isRequired
          minLength={2}
          maxLength={60}
          className="w-full"
        >
          <Label>নাম</Label>
          <Input placeholder="আপনার নাম লিখুন" className="w-full" />
          <FieldError />
        </TextField>

        {status && (
          <p
            role="status"
            className={`text-sm font-semibold ${
              status.type === "success" ? "text-success" : "text-error"
            }`}
          >
            {status.text}
          </p>
        )}

        <Button
          className="bg-brand"
          type="submit"
          fullWidth
          isPending={pending}
          isDisabled={!isDirty}
        >
          আপডেট
        </Button>
      </Form>
    </Card>
  );
};

export default ProfileForm;
