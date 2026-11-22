import logoImg from "@/assets/vedaqur-logo.png";
import { Link } from "react-router-dom";

export const Logo = ({ compact = false }: { compact?: boolean }) => (
  <Link to="/" className="flex items-center gap-3 group">
    <img
      src={logoImg}
      alt="Vedaqur logo"
      className={`${compact ? "h-10 w-10" : "h-12 w-12"} rounded-full object-cover ring-1 ring-primary/20 transition-smooth group-hover:ring-primary/50`}
    />
    <div className="flex flex-col leading-none">
      <span className="font-serif text-2xl font-bold text-primary-dark tracking-tight">
        Vedaqur
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
        Natural Wellness
      </span>
    </div>
  </Link>
);
