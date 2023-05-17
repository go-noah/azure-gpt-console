import { useAuth } from "@/context/AuthProvider";
import React from "react";
import { MdClose, MdToken } from "react-icons/md";

type Props = {
  className?: string;
};

export default function AddTokenModal({ className }: Props) {
  const { token, addToken, clearToken } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState(token);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClear = () => {
    clearToken();
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToken(input);
    setOpen(false);
  };

  return (
    <>
    </>
  );
}
