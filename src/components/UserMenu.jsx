"use client";

import Image from "next/image";
import { CaretDown } from "@gravity-ui/icons";
import { Button, Dropdown, Label } from "@heroui/react";
import Avatar from "@/assets/Avatar.png";

// shown in the header when a user is signed in
const UserMenu = ({ user }) => {
  const handleAction = (key) => {
    if (key === "sign-out") {
      // TODO: authClient.signOut()
    }
  };

  return (
    <div className="profile flex items-center gap-1">
      <Image
        src={user.image || Avatar}
        alt={user.name}
        width={32}
        height={32}
        className="size-8 rounded-full object-cover"
      />
      <Dropdown>
        <Button className="bg-transparent font-medium text-sm text-heading">
          {user.name}
          <CaretDown className="size-3.5" />
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu onAction={handleAction}>
            <Dropdown.Item id="profile" textValue="প্রোফাইল" href="/profile">
              <Label>প্রোফাইল</Label>
            </Dropdown.Item>
            <Dropdown.Item
              id="sign-out"
              textValue="সাইন আউট"
              variant="danger"
            >
              <Label>সাইন আউট</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
