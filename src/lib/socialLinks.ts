import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa6";
import type { IconType } from "react-icons";

export type SocialLink = {
  name: string;
  href: string;
  icon: IconType;
};

export const socialLinks: SocialLink[] = [
  { name: "GitHub", href: "https://github.com/tahkhurram06", icon: FaGithub },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/taha-khurram-7219b43b3/", icon: FaLinkedin },
  { name: "Instagram", href: "https://www.instagram.com/im_bloody_/", icon: FaInstagram },
  { name: "Facebook", href: "https://www.facebook.com/taha.khurram.214325", icon: FaFacebook },
];