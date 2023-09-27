"use client";

import EditModal from "@/components/EditModal";
import { useAppState } from "@/context/state";
import IconHistory from "@/icons/HistoryIcon";
import IconSearchLine from "@/icons/SearchIcon";
import { Button, Image, Input } from "@nextui-org/react";
import { AvatarGenerator } from "random-avatar-generator";
import React, { useEffect, useState } from "react";

const generator = new AvatarGenerator();

const Profile = () => {
  const { state, setState } = useAppState();

  const name =
    state.currentUser?.user.first_name +
    " " +
    state.currentUser?.user.last_name;

  useEffect(() => {
    async function getCurrentUser() {
      const response = await fetch("/api/auth/current_user");
      const currentUser = await response.json();

      if (currentUser.error === "No token present") {
        return;
      }

      setState((prevState) => ({
        ...prevState,
        currentUser,
      }));
    }
    getCurrentUser();
  }, []);

  return (
    <div className="flex items-center justify-between p-10">
      <div className="flex flex-1 flex-col h-full items-center border py-10 rounded-lg mx-10 shadow-md">
        <div className="w-32 h-32 flex-1 mb-10">
          <Image
            src={
              state.currentUser?.user.avatar ||
              generator.generateRandomAvatar(name)
            }
            width={128}
            height={128}
            alt="avatar"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col flex-2 items-start">
          <h1 className="text-3xl uppercase flex items-center font-semibold text-gray-500">
            <span>Contact Details</span>
          </h1>
          <div className="flex flex-col items-start mt-5 gap-5">
            <p className="flex flex-col">
              <span className="font-semibold uppercase text-gray-500">
                Name
              </span>
              <span className="p-3 rounded-lg bg-gray-200">{name}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-semibold uppercase text-gray-500">
                Email
              </span>
              <span className="p-3 rounded-lg bg-gray-200">
                {state.currentUser?.user.email}
              </span>
              <span className="text-[10px] font-medium text-red-700">
                Note: Changing your email will require you to verify your new
                email.
              </span>
            </p>
            <p className="flex flex-col">
              <span className="font-semibold uppercase text-gray-500">
                Phone
              </span>
              <span className="p-3 rounded-lg bg-gray-200">
                {state.currentUser?.user.phone_number ||
                  "No phone number provided"}
              </span>
              <span className="text-[10px] font-medium text-red-700">
                Note: Changing you phone number will require you to verify your
                new phone number.
              </span>
            </p>
            <p className="flex flex-col">
              <span className="font-semibold uppercase text-gray-500">
                Address
              </span>
              <span className="p-3 rounded-lg bg-gray-200">
                {state.currentUser?.user.address || "No address provided"}
              </span>
            </p>
          </div>
        </div>
        <div className="uppercase text-[10px] mt-5">
          <h2 className="text-sm font-semibold">Account Instructions</h2>
          <p className="mt-2 text-gray-500">
            - To change your account details, click on{" "}
            <EditModal user={state.currentUser?.user} />
          </p>
          <p className="mt-2 text-gray-500">
            - To change your password, click on{" "}
            <Button
              variant="solid"
              className="bg-red-600 text-white font-medium px-2 py-1"
              size="sm"
            >
              reset password
            </Button>
          </p>
          <p className="mt-2 text-gray-500">
            - To delete your account, click on{" "}
            <Button
              variant="solid"
              className="bg-red-600 text-white font-medium px-2 py-1"
              size="sm"
            >
              delete account
            </Button>
          </p>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-4xl uppercase font-medium flex items-center">
          <span>
            <IconHistory className="w-10 h-10 mr-5 text-sky-400" />
          </span>
          <span>past orders and reviews</span>
        </h1>
        <div className="mt-5">
          <Input
            endContent={
              <IconSearchLine className="w-6 h-6 text-black cursor-pointer" />
            }
            placeholder="Search for orders and reviews"
            width="50%"
            size="lg"
          />

          <p className="text-center mt-10 text-gray-500">
            <span className="font-semibold uppercase">
              No past orders or reviews
            </span>
            <span className="block">
              Please place an order or review a product to see it here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
