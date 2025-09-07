import Header from "@/components/custom/Header";
import { AtomIcon, Edit, Share2, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStartedButton = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative z-10">
        <div className="max-w-4xl mx-auto text-center px-6 py-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            Create Professional <br /> Resumes Instantly
          </h1>

          <p className="mx-auto text-muted-foreground max-w-2xl text-base sm:text-lg mb-8">
            Build standout resumes with our intuitive resume builder. Simple,
            fast, and professional results every time.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleGetStartedButton}
              className="inline-flex items-center gap-2 bg-gray-800 text-white px-5 py-2 rounded-md shadow-sm text-sm hover:bg-gray-700 transition-colors duration-200"
            >
              Get Started
              <svg
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose / Features */}
      <section className="pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Why Choose ResumeGo?</h2>
          <p className="text-sm text-muted-foreground mb-10">
            Everything you need to create a professional resume that gets you
            hired
          </p>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-card border shadow-sm flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-200">
                <svg
                  className="w-6 h-6 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 8v4l3 3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground">Quick & Easy</h3>
              <p className="text-xs text-muted-foreground mt-2">
                Create your resume in minutes with our streamlined process and
                intuitive interface
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-card border shadow-sm flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-200">
                <svg
                  className="w-6 h-6 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 7h18M7 3v4M17 3v4M5 21h14a2 2 0 002-2V9H3v10a2 2 0 002 2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground">
                Professional Templates
              </h3>
              <p className="text-xs text-muted-foreground mt-2">
                Choose from professionally designed templates that impress
                employers
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-card border shadow-sm flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-200">
                <svg
                  className="w-6 h-6 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 1v4M12 19v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1 12h4M19 12h4M4.2 19.8l2.8-2.8M17 7l2.8-2.8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground">
                Secure & Private
              </h3>
              <p className="text-xs text-muted-foreground mt-2">
                Your data is protected with enterprise-grade security and
                privacy measures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Footer style */}
      <section className="bg-muted/50 py-12 flex-1">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-3 text-foreground">
            Ready to Build Your Resume?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of professionals who have created their perfect
            resume with ResumeGo
          </p>
          <button
            onClick={handleGetStartedButton}
            className="inline-flex items-center gap-2 bg-gray-800 text-white px-5 py-2 rounded-md shadow-sm text-sm hover:bg-gray-700 transition-colors duration-200"
          >
            Start Building Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card mt-auto">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="text-sm text-muted-foreground text-center">
              Developed by{" "}
              <span className="font-semibold text-foreground">Shoyub Khan</span>
            </div>
            <a
              href="https://shoyub.site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
