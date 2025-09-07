import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeContext } from "@/context/ResumeContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Brain, Loader2 } from "lucide-react";
import { AIchatSession } from "../../../../../service/AiModel.js";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "@/utils/firebase_config";

const prompt = `Given the job title "{jobTitle}", provide three job summary suggestions for a resume. Each suggestion should be in JSON format with fields "experience_level" (values can be "Fresher", "Mid-level", "Experienced") and "summary" (a brief summary). Output an array of JSON objects.`;

const SummaryForm = ({ resumeId, email, enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();

  useEffect(() => {
    if (summary) {
      setResumeInfo((prev) => ({
        ...prev,
        summary,
      }));
    }
  }, [summary]);

  const generateSummary = async () => {
    setLoading(true);
    try {
      // Check if AIchatSession is available
      if (!AIchatSession) {
        toast.error(
          "AI service not available. Please configure your Gemini API key in the .env file."
        );
        return;
      }

      const PROMPT = prompt.replace(
        "{jobTitle}",
        resumeInfo?.personalDetail?.jobTitle || "your job title"
      );
      const result = await AIchatSession.sendMessage(PROMPT);
      const rawResponse = await result.response.text();
      const wrappedResponse = rawResponse.startsWith("[")
        ? rawResponse
        : `[${rawResponse}]`;
      const parsedResponse = JSON.parse(wrappedResponse);
      setAiGenerateSummeryList(parsedResponse);
    } catch (error) {
      console.error("Error generating summaries:", error);
      if (error.message?.includes("API_KEY")) {
        toast.error(
          "Invalid API key. Please check your Gemini API key in the .env file."
        );
      } else if (error.message?.includes("QUOTA")) {
        toast.error("API quota exceeded. Please try again later.");
      } else if (error.message?.includes("NETWORK")) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        toast.error("Failed to generate summaries. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const db = getFirestore(app);
      const resumeRef = doc(
        db,
        `usersByEmail/${email}/resumes`,
        `resume-${resumeId}`
      );
      await setDoc(resumeRef, { summary }, { merge: true });
      enableNext(true);
      toast.success("Details Updated");
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Failed to update details");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (summaryText) => {
    setSummary(summaryText);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-black mt-10 bg-card">
        <h2 className="font-bold text-lg text-foreground">Summary Detail</h2>
        <p className="text-muted-foreground">Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label className="text-gray-800">Add Summary</label>
            <Button
              size="sm"
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white flex gap-2 transition-all duration-200 hover:scale-105 hover:shadow-md"
              type="button"
              onClick={generateSummary}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Brain className="h-4 w-4" />
              )}
              {loading ? "Generating..." : "Generate from AI"}
            </Button>
          </div>

          <Textarea
            className="mt-5 border-gray-300 focus:border-black focus:ring-black"
            required
            onChange={(e) => setSummary(e.target.value)}
            value={summary}
            placeholder="Write your job summary here..."
          />

          <div className="mt-2 flex justify-end">
            <Button
              disabled={loading}
              type="submit"
              className="bg-black text-white hover:bg-gray-800"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg text-foreground">Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer border border-border hover:bg-accent hover:shadow-xl hover:scale-105 transition-all duration-200 bg-card"
              onClick={() => handleSuggestionClick(item.summary)}
            >
              <h2 className="font-bold my-1 text-foreground">
                Level:{" "}
                <span className="text-muted-foreground">
                  {item.experience_level}
                </span>
              </h2>
              <p className="text-card-foreground">{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryForm;
