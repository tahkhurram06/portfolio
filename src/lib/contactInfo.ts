export type ContactDetail = {
  label: string;
  value: string;
  href?: string;
};

export const contactDetails: ContactDetail[] = [
  {
    label: "Email",
    value: "tahkhurram06@gmail.com",
    href: "mailto:tahkhurram06@gmail.com",
  },
  {
    label: "Based in",
    value: "Karachi, Pakistan",
  },
];