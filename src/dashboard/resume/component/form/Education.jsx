/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState, useCallback } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeContext } from "@/context/ResumeContext";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "@/utils/firebase_config";

const formField = {
  school: "",
  degree: "",
  city: "",
  state: "",
  fieldOfStudy: "",
  graduationDate: "",
  description: "",
};

const Education = ({ resumeId, email, enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [educationList, setEducationList] = useState(() =>
    resumeInfo?.education?.length > 0 ? resumeInfo.education : [formField]
  );
  const [loading, setLoading] = useState(false);
  const [shouldUpdateContext, setShouldUpdateContext] = useState(false);

  useEffect(() => {
    if (shouldUpdateContext) {
      setResumeInfo((prev) => ({
        ...prev,
        education: educationList,
      }));
      setShouldUpdateContext(false);
    }
  }, [shouldUpdateContext, setResumeInfo, educationList]);

  const handleChange = useCallback((index, event) => {
    const { name, value } = event.target;
    setEducationList((prev) => {
      const newEntries = [...prev];
      newEntries[index][name] = value;
      return newEntries;
    });
    setShouldUpdateContext(true);
  }, []);

  const addNewEducation = useCallback(() => {
    setEducationList((prev) => [...prev, { ...formField }]);
    setShouldUpdateContext(true);
  }, []);

  const removeEducation = useCallback(() => {
    if (educationList.length > 1) {
      setEducationList((prev) => prev.slice(0, -1));
      setShouldUpdateContext(true);
    }
  }, [educationList.length]);

  const handleRichTextEditor = useCallback((e, name, index) => {
    setEducationList((prev) => {
      const newEntries = [...prev];
      newEntries[index][name] = e.target.value;
      return newEntries;
    });
    setShouldUpdateContext(true);
  }, []);

  const onSave = async () => {
    setLoading(true);
    try {
      const db = getFirestore(app);
      const resumeRef = doc(
        db,
        `usersByEmail/${email}/resumes`,
        `resume-${resumeId}`
      );
      await setDoc(resumeRef, { education: educationList }, { merge: true });
      setLoading(false);
      toast.success("Education details updated!");
      enableNext(true);
    } catch (error) {
      setLoading(false);
      console.error("Error saving to Firestore:", error);
      toast.error("Error updating education details!");
    }
  };

  return (
    <div>
      {/* Card */}
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-black mt-10 bg-white">
        <h2 className="font-bold text-lg text-gray-900">
          Professional Education
        </h2>
        <p className="text-gray-600">Add your educational background</p>

        <div>
          {educationList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border border-gray-200 p-4 my-5 rounded-lg">
                <div>
                  <label className="text-xs text-gray-700">
                    School / University
                  </label>
                  <Input
                    name="school"
                    value={item.school}
                    onChange={(event) => handleChange(index, event)}
                    className="mt-1 border-gray-300 text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-700">Degree</label>
                  <Input
                    name="degree"
                    value={item.degree}
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
                  <label className="text-xs text-gray-700">
                    Field of Study
                  </label>
                  <Input
                    name="fieldOfStudy"
                    value={item.fieldOfStudy}
                    onChange={(event) => handleChange(index, event)}
                    className="mt-1 border-gray-300 text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-700">
                    Graduation Date
                  </label>
                  <Input
                    type="date"
                    name="graduationDate"
                    value={item.graduationDate}
                    onChange={(event) => handleChange(index, event)}
                    className="mt-1 border-gray-300 text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs text-gray-700">Description</label>
                  <RichTextEditor
                    index={index}
                    value={item.description}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "description", index)
                    }
                    className="mt-2 border border-gray-200"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={addNewEducation}
              className="border border-gray-300 text-gray-900 hover:bg-gray-50"
            >
              + Add More Education
            </Button>

            <Button
              variant="outline"
              onClick={removeEducation}
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

export default Education;
