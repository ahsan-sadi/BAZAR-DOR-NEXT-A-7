import Image from "next/image";
import React, { Suspense } from "react";
import Logo from "@/assets/logo.png";
import Avatar from "@/assets/Avatar.png";
import { CaretDown } from "@gravity-ui/icons";
import { Button, Dropdown, Label } from "@heroui/react";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";

let today = new Date().toLocaleDateString("bn-BD", {
  dateStyle: "full",
});

const Navbar = () => {
  return (
    <div className="">
      <div className="container mx-auto header flex justify-between items-center py-3">
        <div className="logo flex items-center gap-2">
          <div className="img bg-primary py-1.5 px-3 rounded-lg flex items-center">
            <Image src={Logo} alt="Logo"></Image>
          </div>
          <div className="logo-text">
            <h3 className="text-heading font-bold text-xl">বাজার দর</h3>
            <h3 className="text-pera font-normal text-[12px]">{today}</h3>
          </div>
        </div>
        <div className="profile flex items-center gap-2">
          <div className="img">
            <Image src={Avatar} alt="Profile Picture"></Image>
          </div>
          <div className="name">
            <Dropdown>
              <Button className="bg-transparent font-medium text-sm text-heading">
                Rezwan <CaretDown />
              </Button>

              <Dropdown.Popover>
                <Dropdown.Menu
                  onAction={(key) => console.log(`Selected: ${key}`)}
                >
                  <Dropdown.Item id="new-file" textValue="New file">
                    <Label>New file</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="copy-link" textValue="Copy link">
                    <Label>Copy link</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="edit-file" textValue="Edit file">
                    <Label>Edit file</Label>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="delete-file"
                    textValue="Delete file"
                    variant="danger"
                  >
                    <Label>Delete file</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="flex gap-4">
            <span className="loading loading-spinner loading-sm"></span>
          </div>
        }
      >
        <NavLinks />
      </Suspense>

      <Marquee />
    </div>
  );
};

export default Navbar;
