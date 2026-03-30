"use client";

import { Badge } from "@/components/ui/badge";

type User = {
  name: string;
  email: string;
  role: string;
};

export default function ProfileCard({ user }: { user: User }) {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-yellow-400 text-amber-950 shadow-xl rounded-2xl text-center space-y-4">
      <h2 className="text-2xl font-bold mb-4"> YOUR PROFILE</h2>

      {/* Avatar (first letter) */}
      <div className="w-20 h-20 mx-auto rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
        {user.name?.charAt(0).toUpperCase()}
      </div>

      {/* Name */}
      <h2 className="text-xl font-bold capitalize">
        {user.name}
      </h2>

      {/* Email */}
      <p className="text-gray-500 text-sm">
        {user.email}
      </p>

      {/* Role */}
      <Badge className="bg-purple-600 text-white px-3 py-1">
        {user.role}
      </Badge>

    </div>
  );
}