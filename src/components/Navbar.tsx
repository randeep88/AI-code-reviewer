import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  return (
    <div className="flex items-center justify-between px-20 py-3">
      <div>Code Reviewer</div>

      <div></div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button size="sm" variant="outline">
          Login
        </Button>
        <Button size="sm">Sign Up</Button>
      </div>
    </div>
  );
};

export default Navbar;
