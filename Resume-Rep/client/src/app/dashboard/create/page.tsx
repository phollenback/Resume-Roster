"use client"
import DetailsForm from "@/app/components/create/DetailsForm";
import { useState } from "react";
import type ResumeDetails from "@/app/types/models/ResumeDetails";
import { uploadFile } from "@/app/utils/fileUpload";

export default function CreateContainer() {
    const [resume, setResume] = useState<ResumeDetails>({
        userId: 0,
        positionTitle: '',
        company: '',
        keywords: [],
        date: new Date(),
        file: null,
    });

    const updateResume = (updatedResume: Partial<ResumeDetails>) => {
        setResume(prevResume => ({
            ...prevResume,
            ...updatedResume,
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setResume(prevResume => ({
            ...prevResume,
            file,
        }));
    };

    const handleSubmit = async () => {
        if (resume.file) { // Ensure file is present
            await uploadFile(resume.file);
        } else {
            console.error("No file selected.");
        }
    };

    return (
    <>
        <div className="w-full h-full p-8">
            <div className="w-full">
                <p className="text-5xl font-bold">Step 1:</p> 
                <p className="text-2xl font-bold pl-8 pt-8">Submit your Resume Instance:</p>
                <label>
                    <input 
                        type="file" 
                        className="border border-black rounded p-4 pl-8 ml-8 mt-4" 
                        onChange={handleFileChange} // Update state when file changes
                    />
                </label>
                <hr className="mt-8 border-t-2 border-black"/> {/* Added classes for dark hr */}
            </div>
            <div className="p-8 flex">
                <div className="w-1/3">
                    <p className="text-5xl font-bold">Step 2:</p> 
                    <p className="text-2xl font-bold pl-8 pt-8">Describe your Resume Instance:</p>
                </div>
                <DetailsForm setResume={updateResume} />
                <hr className="border-t-2 border-black mt-4"/> {/* Dark hr for separation */}
            </div>
            <div className="w-full text-right">
                <button 
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    </>
);
}