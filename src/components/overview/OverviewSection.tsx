import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "../ui/Icons";

type Props = {
  title: string;
  link: string;
  linkText: string;
  children: React.ReactNode;
};

const OverviewSection = ({ title, link, children, linkText }: Props) => {
  const CaretRight = Icons["caretRight"];
  return (
    <section className="rounded-xl bg-white p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold capitalize text-lg">{title}</h2>
        <Link className="flex items-center gap-2 text-gray-500" to={link}>
          {linkText}
          <CaretRight className="w-1 fill-gray-500" />
        </Link>
      </div>
      {children}
    </section>
  );
};

export default OverviewSection;
