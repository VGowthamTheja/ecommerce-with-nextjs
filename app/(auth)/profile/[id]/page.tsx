import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div>
      <h1>Profile</h1>
      <br />
      <p>
        Profile page
        <span className="p-2 ml-2 rounded-md bg-gray-300 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
};

export default UserProfile;
