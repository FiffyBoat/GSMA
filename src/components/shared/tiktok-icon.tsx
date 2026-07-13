import { SiTiktok } from "react-icons/si";

interface TikTokIconProps {
  className?: string;
}

export default function TikTokIcon({ className }: TikTokIconProps) {
  return <SiTiktok className={className} aria-hidden="true" />;
}
