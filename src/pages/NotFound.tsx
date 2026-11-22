import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-background p-4">
    <div className="text-center max-w-md">
      <Leaf className="h-16 w-16 mx-auto text-primary opacity-50" />
      <h1 className="font-serif text-7xl font-bold mt-6 text-primary-dark">404</h1>
      <p className="text-xl text-muted-foreground mt-2">This page seems to have wandered off into the herbs.</p>
      <Button asChild className="mt-8" size="lg"><Link to="/">Back to Home</Link></Button>
    </div>
  </div>
);

export default NotFound;
