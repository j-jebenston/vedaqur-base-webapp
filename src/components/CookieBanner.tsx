import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const CookieBanner = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("vedaqur-cookies")) setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 bg-card border border-border rounded-xl shadow-elegant p-5">
      <p className="text-sm text-foreground">
        We use cookies to improve your experience on Vedaqur. By continuing to browse, you agree to our use of cookies.
      </p>
      <div className="mt-3 flex gap-2 justify-end">
        <Button variant="ghost" size="sm" onClick={() => { localStorage.setItem("vedaqur-cookies","declined"); setShow(false); }}>Decline</Button>
        <Button size="sm" onClick={() => { localStorage.setItem("vedaqur-cookies","accepted"); setShow(false); }}>Accept</Button>
      </div>
    </div>
  );
};
