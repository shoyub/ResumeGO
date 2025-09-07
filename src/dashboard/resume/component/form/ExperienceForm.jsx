/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState, useRef } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeContext } from "@/context/ResumeContext";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "@/utils/firebase_config";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

const ExperienceForm = ({ resumeId, email, enableNext }) => {
  const [experienceList, setExperienceList] = useState([formField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const isInitializedRef = useRef(false);
  const lastExperienceRef = useRef(null);

  // Initialize form with existing data (only once)
  useEffect(() => {
    if (!isInitializedRef.current && resumeInfo?.experience?.length > 0) {
      setExperienceList(resumeInfo.experience);
      lastExperienceRef.current = resumeInfo.experience;
      isInitializedRef.current = true;
    }
  }, [resumeInfo?.experience]);

  // Update context whenever experienceList changes (but avoid infinite loop)
  useEffect(() => {
    if (isInitializedRef.current) {
      const experienceChanged =
        JSON.stringify(lastExperienceRef.current) !==
        JSON.stringify(experienceList);

      if (experienceChanged) {
        setResumeInfo((prevInfo) => ({
          ...prevInfo,
          experience: experienceList,
        }));
        lastExperienceRef.current = experienceList;
      }
    }
  }, [experienceList, setResumeInfo]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setExperienceList((prevList) => {
      const newList = [...prevList];
      newList[index] = {
        ...newList[index],
        [name]: value,
      };
      return newList;
    });
  };

  const handleRichTextEditor = (e, name, index) => {
    setExperienceList((prevList) => {
      const newList = [...prevList];
      newList[index] = {
        ...newList[index],
        [name]: e.target.value,
      };
      return newList;
    });
  };

  const addNewExperience = () => {
    setExperienceList((prevList) => [...prevList, { ...formField }]);
  };

  const removeExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList((prevList) => prevList.slice(0, -1));
    }
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const db = getFirestore(app);
      const resumeRef = doc(
        db,
        `usersByEmail/${email}/resumes`,
        `resume-${resumeId}`
      );
      const data = {
        experience: experienceList.map((item, index) => ({
          id: `exp-${index + 1}`,
          title: item.title || "Position title not provided",
          companyName: item.companyName || "Company not specified",
          location: {
            city: item.city || "City not specified",
            state: item.state || "State not specified",
          },
          duration: {
            startDate: item.startDate || "Start date not provided",
            endDate: item.endDate || "End date not provided",
          },
          workSummery: item.workSummery || "No work summary provided.",
        })),
      };

      await setDoc(resumeRef, data, { merge: true });
      setResumeInfo((prev) => ({
        ...prev,
        experience: data.experience,
      }));

      toast.success("Details updated!");
      enableNext(true);
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      toast.error("Error updating details!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-black bg-white">
        <h2 className="font-bold text-lg text-gray-900">
          Professional Experience
        </h2>
        <p className="text-gray-600">Add your previous job experience</p>

        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border border-gray-200 p-3 my-5 rounded-lg bg-white">
                <div>
                  <label className="text-xs text-gray-700">
                    Position Title
                  </label>
                  <Input
                    name="title"
                    value={item.title}
                    onChange={(event) => handleChange(index, event)}
                    className="mt-1 border-gray-300 text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-700">Company Name</label>
                  <Input
                    name="companyName"
                    value={item.companyName}
                    onChange={(event) => handleChange(index, event)}
                    className="mt-1 border-gray-300 text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-700">City</label>
                  <Input
                    name="city"
                    value={item.city}
                    onChange={(event) => handleChange(index, event)}
                    className="mt-1 border-gray-300 text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-700">State</label>
                  <Input
                    name="state"
                    value={item.state}
                    onChange={(event) => handleChange(index, event)}
                    className="mt-1 border-gray-300 text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-700">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    value={item.startDate}
                    onChange={(event) => handleChange(index, event)}
                    className="mt-1 border-gray-300 text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-700">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    value={item.endDate}
                    onChange={(event) => handleChange(index, event)}
                    className="mt-1 border-gray-300 text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs text-gray-700">Work Summary</label>
                  <RichTextEditor
                    index={index}
                    value={item.workSummery}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummery", index)
                    }
                    className="mt-2 border border-gray-200"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={addNewExperience}
              className="border border-gray-300 text-gray-900 hover:bg-gray-50"
            >
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              onClick={removeExperience}
              className="border border-gray-300 text-gray-900 hover:bg-gray-50"
            >
              - Remove
            </Button>
          </div>

          <Button
            disabled={loading}
            onClick={onSave}
            className="bg-black text-white hover:bg-gray-800"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;
