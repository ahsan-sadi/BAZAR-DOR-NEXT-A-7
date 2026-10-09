"use client";

import Image from "next/image";
import { ArrowUturnCcwLeft } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";
import Avatar from "@/assets/Avatar.png";
// import { useSignOut } from "@/app/hooks/useSignOut";
import { useSignOut } from "@/app/hooks/useSignOut";

const ProfileHeader = ({ name, email, image }) => {
  const { signOut, isPending } = useSignOut();

  return (
    <Card className="p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Image
            src={image || Avatar}
            alt={name}
            width={80}
            height={80}
            className="size-16 sm:size-20 shrink-0 rounded-2xl object-cover"
          />
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-heading truncate">{name}</h2>
            <p className="text-sm text-gray-500 truncate">{email}</p>
          </div>
        </div>

        <Button
          variant="outline"
          onPress={signOut}
          isPending={isPending}
          className="border-error text-error shrink-0"
        >
          <ArrowUturnCcwLeft className="size-4" />
          সাইন আউট
        </Button>
      </div>
    </Card>
  );
};

export default ProfileHeader;
