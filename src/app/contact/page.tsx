import type { Metadata } from "next";
import Contact from "../../components/Contact/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Taha Khurram — full-stack developer based in Karachi, Pakistan. Reach out about projects, roles, or collaborations.",
};

export default function ContactPage() {
  return (
    <div className="relative z-10 flex flex-col flex-1">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col px-6 pt-[140px] pb-24 sm:px-8 min-[901px]:pt-40">
        <Contact />
      </div>
    </div>
  );
}