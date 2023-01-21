import React from "react";
import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-blue-100">
      <Spinner color="info" className="h-24 w-24" aria-label="Purple spinner example" />
    </div>
  );
}
