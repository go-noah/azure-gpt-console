import React from "react";
import Link from "next/link";
import GithubStar from "./../misc/GithubStar";

type Props = {};

export default function ChatPlaceholder({}: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="max-w-3xl p-4 text-center text-primary">
        <h1 className="text-4xl font-medium">Azure Private GPT Playground</h1>
        <p className="mt-4 text-lg">
          사내 환경에서만 접근 가능합니다.
        </p>
        <p className="mt-4 text-lg">
          https://learn.microsoft.com/ko-kr/azure/compliance/
        </p>

      </div>
    </div>
  );
}
