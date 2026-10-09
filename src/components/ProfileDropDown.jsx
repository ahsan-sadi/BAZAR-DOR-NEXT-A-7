"use client";

import Image from "next/image";
import { Button, Dropdown, Label } from "@heroui/react";
import { CaretDown, Person, ArrowUturnCcwLeft } from "@gravity-ui/icons";
import Avatar from "@/assets/Avatar.png";
// import { useSignOut } from "@/hooks/useSignOut";
import { useSignOut } from "@/app/hooks/useSignOut";

export default function ProfileDropdown({ user }) {
  const { signOut, isPending: signingOut } = useSignOut();

  const firstName = user.name?.split(" ")[0] ?? "";

  const handleAction = (key) => {
    if (key === "sign-out") signOut();
  };

  return (
    <Dropdown>
      {/* trigger: avatar + first name + caret */}
      <Button
        aria-label="প্রোফাইল মেনু"
        className="h-auto gap-3 bg-transparent p-1 pr-2 font-medium text-sm text-heading"
      >
        <Image
          src={user.image || Avatar}
          alt=""
          width={40}
          height={40}
          className="size-10 rounded-xl object-cover"
        />
        <span className="hidden sm:inline text-base">{firstName}</span>
        <CaretDown className="size-3 text-gray-500" />
      </Button>

      <Dropdown.Popover className="min-w-64 rounded-2xl">
        {/* user info (not clickable) */}
        <div className="px-4 pt-4 pb-3">
          <p className="font-bold text-heading leading-6">{user.name}</p>
          <p className="text-sm text-gray-500 break-all">{user.email}</p>
        </div>

        <Dropdown.Menu onAction={handleAction} className="px-1 pb-2">
          <Dropdown.Item id="profile" textValue="আমার প্রোফাইল" href="/profile">
            <Person className="size-4" />
            <Label>আমার প্রোফাইল</Label>
          </Dropdown.Item>

          <Dropdown.Item
            id="sign-out"
            textValue="সাইন আউট"
            variant="danger"
            isDisabled={signingOut}
          >
            <ArrowUturnCcwLeft className="size-4" />
            <Label>{signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
