export type Project = {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  labelColor?: string;
  /** Live deployed demo — the whole card links here. */
  href?: string;
  /** Optional GitHub repo — rendered as a small icon link on the card. */
  githubHref?: string;
  /** Optional screenshot/preview image. Shown instead of the gradient+title header when set. Put the file in /public and reference it as e.g. "/projects/shopco.png". */
  image?: string;
};

export const projects: Project[] = [
  {
    title: "AURÉLIA",
    description: "Jewelry e-commerce with a build-your-ring flow.",
    tags: ["Next.js", "TypeScript"],
    gradient: "linear-gradient(135deg, #3b1e6e, #7c3aed)",
    href: "#",
  },
  {
    title: "SHOP.CO",
    description: "Fashion storefront built with React and Vite.",
    tags: ["React", "Vite"],
    gradient: "linear-gradient(135deg, #5b21a0, #c084fc)",
    href: "https://shopco-project00.netlify.app/",
    githubHref: "https://github.com/tahkhurram06/Shop.co",
    image: "/projects/shop.co.png",
  },
  {
    title: "Date-night app",
    description: "A narrative multi-screen experience, built vanilla.",
    tags: ["HTML", "JS"],
    gradient: "linear-gradient(135deg, #7e22ce, #f3e8ff)",
    labelColor: "rgba(10,4,16,0.75)",
    href: "#",
  },
  {
    title: "Compare-Ex",
    description: "Browse mobile phone models with specs and side-by-side comparisons.",
    tags: ["Vite", "React"], // adjust to whatever you actually used
    gradient: "linear-gradient(135deg, #6d28d9, #d8b4fe)",
    href: "https://compare-ex.vercel.app",
    githubHref: "https://github.com/tahkhurram06/compare-ex", // optional, if public
  },
  {
    title: "Add project #5",
    description: "Replace with a real project description.",
    tags: ["Tag1", "Tag2"],
    gradient: "linear-gradient(135deg, #6d28d9, #d8b4fe)",
    labelColor: "rgba(10,4,16,0.75)",
    href: "#",
  },
];
