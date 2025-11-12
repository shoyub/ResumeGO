import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase_config";
// import { UserButton, useUser } from "@clerk/clerk-react"

const Header = () => {
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      navigate("/register");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
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
          <div className="flex gap-2">
            <Link to={"/dashboard"}>
              <Button
                variant={"outline"}
                className="hover:bg-accent hover:text-accent-foreground"
              >
                Dashboard
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
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
