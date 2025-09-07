import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
// import { UserButton, useUser } from "@clerk/clerk-react"

const Header = () => {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  // const {isSignedIn} = true;
  return (
    <div className="p-3 px-5 flex justify-between shadow-sm border-b bg-background">
      <Link to="/">
        <div className="flex justify-center align-middle items-center gap-3">
          <h1
            id="headingTitle"
            className="text-foreground hover:text-primary transition-colors duration-200"
          >
            ResumeGO
          </h1>
        </div>
      </Link>
      <div className="flex gap-4 items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="hover:bg-accent hover:text-accent-foreground"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
        {user ? (
          <Link to={"/dashboard"}>
            <Button
              variant={"outline"}
              className="hover:bg-accent hover:text-accent-foreground"
            >
              Dashboard
            </Button>
          </Link>
        ) : (
          <Link to={"/dashboard"}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
