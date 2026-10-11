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
    title: "SMIT Portal Mockup",
    description:
      "Mockup of a student portal LMS, inspired by SMIT's actual system.",
    tags: ["Next.js", "TypeScript"],
    gradient: "linear-gradient(135deg, #0d9488, #2dd4bf)",
    href: "https://smit-portal-mockup.vercel.app/",
    githubHref: "https://github.com/tahkhurram06/smit-portal-mockup",
    image: "/projects/smit-portal.png",
  },
  {
    title: "Compare-Ex",
    description:
      "Browse mobile phone models with specs and side-by-side comparisons.",
    tags: ["React", "Vite"], // adjust to whatever you actually used
    gradient: "linear-gradient(135deg, #0f766e, #2dd4bf)",
    href: "https://compare-ex.vercel.app",
    githubHref: "https://github.com/tahkhurram06/compare-ex", // optional, if public
    image: "/projects/compare-ex.png",
  },
  {
    title: "SHOP.CO",
    description: "Fashion storefront built with React and Vite.",
    tags: ["React", "Vite"],
    gradient: "linear-gradient(135deg, #0d9488, #5eead4)",
    href: "https://shopco-project00.netlify.app/",
    githubHref: "https://github.com/tahkhurram06/Shop.co",
    image: "/projects/shop.co.png",
  },
];