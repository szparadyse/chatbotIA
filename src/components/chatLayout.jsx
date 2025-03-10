import React from "react";
import { Outlet } from "react-router-dom";
import Room from "./avatarRoom";

export default function ChatLayout({ handleClick }) {
  const rooms = [
    {
      id: 1,
      name: "Gaming Lounge",
      password: "game123",
      status: "public",
      avatar:
        "https://cdn.pixabay.com/photo/2024/10/16/16/14/cat-9125207_1280.jpg",
      members: [
        { userId: "user123" },
        { userId: "user456" },
        { userId: "user789" },
      ],
      owner: "owner123",
    },
    {
      id: 2,
      name: "Book Club",
      password: null,
      status: "private",
      avatar:
        "https://cdn.pixabay.com/photo/2025/02/05/14/51/swan-9384798_1280.jpg",
      members: [{ userId: "reader1" }, { userId: "reader2" }],
      owner: "owner456",
    },
    {
      id: 3,
      name: "Tech Talk",
      password: "tech2024",
      status: "public",
      avatar:
        "https://cdn.pixabay.com/photo/2024/10/16/16/14/cat-9125207_1280.jpg",
      members: [
        { userId: "dev1" },
        { userId: "dev2" },
        { userId: "dev3" },
        { userId: "dev4" },
      ],
      owner: "owner789",
    },
    {
      id: 4,
      name: "Music Studio",
      password: null,
      status: "public",
      avatar:
        "https://cdn.pixabay.com/photo/2024/06/21/08/12/lotus-8843853_1280.jpg",
      members: [
        { userId: "musician1" },
        { userId: "musician2" },
        { userId: "musician3" },
      ],
      owner: "owner101",
    },
    {
      id: 5,
      name: "Study Group",
      password: "study2024",
      status: "private",
      avatar:
        "https://cdn.pixabay.com/photo/2023/05/31/11/14/smoothie-8031132_1280.jpg",
      members: [
        { userId: "student1" },
        { userId: "student2" },
        { userId: "student3" },
        { userId: "student4" },
        { userId: "student5" },
      ],
      owner: "owner202",
    },
  ];

  return (
    <>
      <div className="flex mt-4">
        <div className="flex gap-3 flex-col items-center p-5">
          {rooms.map((item) => (
            <Room
              key={item.id}
              id={item.id}
              name={item.name}
              avatar={item.avatar}
              handleClick={handleClick}
            />
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
}
