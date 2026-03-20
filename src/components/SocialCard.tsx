import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  Icon: LucideIcon;
  href: string;
}

export default function SocialCard({ label, Icon, href }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      className="group relative flex items-center gap-4 px-5 py-4 bg-surface-container rounded-md hover:bg-surface-high transition-colors duration-200 overflow-hidden"
    >
      <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-secondary scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-200" />
      <Icon
        size={16}
        className="text-on-surface-variant group-hover:text-primary transition-transform duration-200"
      />
      <span className="text-xs tracking-label uppercase text-on-surface-variant group-hover:text-on-surface transition-colors duration-200">
        {label}
      </span>
    </a>
  );
}
