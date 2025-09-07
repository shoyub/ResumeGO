import AddResume from "./components/AddResume";
import { useContext, useEffect, useState } from "react";
import ResumeItem from "./components/ResumeItem";
import { UserContext } from "@/context/UserContext";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../utils/firebase_config";
import Header from "@/components/custom/Header";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      getResumesList();
    }
  }, [user]);

  const getResumesList = async () => {
    try {
      setLoading(true);
      const db = getFirestore(app);
      const resumesRef = collection(db, "usersByEmail", user.email, "resumes");
      const querySnapshot = await getDocs(resumesRef);

      const resumes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Resumes fetched from Firestore:", resumes);
      setResumeList(resumes);
    } catch (error) {
      console.error("Error fetching resumes: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 p-10 md:px-20 lg:px-32">
        <h1 className="font-bold text-3xl text-foreground mb-2">My Resume</h1>
        <p className="text-muted-foreground mb-10">
          Start Creating AI Resume for your next job role
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <AddResume />
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : resumeList.length > 0 ? (
            resumeList.map((resume) => (
              <div
                key={resume.id}
                className="hover:scale-105 transition-transform duration-200"
              >
                <ResumeItem resume={resume} refreshData={getResumesList} />
              </div>
            ))
          ) : (
            <div className="flex m-0 h-full items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 col-span-full">
              <p className="text-muted-foreground">No resume found</p>
            </div>
          )}
        </div>
      </div>
      <footer className="border-t bg-card mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-4">
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

export default Dashboard;
