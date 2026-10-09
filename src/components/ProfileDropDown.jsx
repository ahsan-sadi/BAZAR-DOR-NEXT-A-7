"use client";

import { Button, Dropdown, Label } from "@heroui/react";
import { CaretDown } from "@gravity-ui/icons";

export default function ProfileDropdown({ user }) {
  return (
    <Dropdown>
      <Button className="bg-transparent font-medium text-sm text-heading">
        {user.name} <CaretDown />
      </Button>

      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
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
  );
}
