import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
  User,
} from "@nextui-org/react";
import React from "react";
import { AvatarGenerator } from "random-avatar-generator";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  username: string;
  src?: string;
  socialLink?: string;
  socialHandle?: string;
};

const generator = new AvatarGenerator();

const UserAvatar = ({ username, src, socialLink, socialHandle }: Props) => {
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          toast.success("Logout success");
          router.push("/authorize");
        }
      });
    } catch (error: any) {
      console.log(error.error);
      toast.error(error.error);
    }
  };

  return (
    <div className="flex flex-row items-center">
      <Dropdown>
        <DropdownTrigger className="cursor-pointer">
          {src ? (
            <User
              name={username}
              description={
                <Link href={socialLink} size="sm" isExternal>
                  {socialHandle}
                </Link>
              }
              avatarProps={{
                src,
              }}
            />
          ) : (
            <div className="flex flex-row items-center justify-center">
              <Image
                src={generator.generateRandomAvatar(username)}
                alt="Profile avatar"
                width={50}
                height={50}
              />
              <p className="ml-2 font-semibold">{username}</p>
            </div>
          )}
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="profile" onClick={() => router.push("/profile")}>
            Profile
          </DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem
            onClick={logout}
            key="delete"
            className="text-danger"
            color="danger"
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserAvatar;
