import React from "react";
import { useAuth } from "@/context/AuthProvider";
import { MdContentCopy, MdDelete } from "react-icons/md";
import AddTokenModal from "./../../../auth/AddTokenModal";

type Props = {};

export default function ApiKey({}: Props) {
  const { token, clearToken } = useAuth();

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <div className="py-2">
    </div>
  );
}
