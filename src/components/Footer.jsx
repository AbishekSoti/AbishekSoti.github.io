import { profile } from "../data/profile.js";

export function Footer() {
  return (
    <footer className="site-footer">
      <span>{profile.name}</span>
      <span>Electrical engineering portfolio</span>
    </footer>
  );
}
