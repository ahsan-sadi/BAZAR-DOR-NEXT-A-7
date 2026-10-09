"use client";

import { useState } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { FieldError, Input, Label, TextField } from "@heroui/react";

const PasswordField = ({
  name,
  label,
  placeholder,
  minLength,
  validate,
  onChange,
}) => {
  const [show, setShow] = useState(false);

  return (
    <TextField
      name={name}
      type={show ? "text" : "password"}
      isRequired
      minLength={minLength}
      validate={validate}
      onChange={onChange}
      className="w-full"
    >
      <Label>{label}</Label>
      <div className="relative">
        <Input placeholder={placeholder} className="w-full pr-10" />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-heading"
        >
          {show ? <EyeSlash className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      <FieldError />
    </TextField>
  );
};

export default PasswordField;
