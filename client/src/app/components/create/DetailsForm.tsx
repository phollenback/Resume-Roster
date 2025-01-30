"use client"
import ResumeDetails from "@/app/types/models/ResumeDetails";
import { useEffect, useState } from "react";

interface DetailsProps {
    setResume : (resume: ResumeDetails) => void;
}

const DetailsForm: React.FC<DetailsProps> = ({ setResume } : DetailsProps) => {
    const [resumeDetails, setResumeDetails] = useState<ResumeDetails>({
        userId: 0,
        positionTitle: '',
        company: '',
        keywords: [],
        date: new Date(),
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeDetails(prevDetails => ({
            ...prevDetails,
            [name]: name === 'keywords' ? value.split(',').map(keyword => keyword.trim()) : value,
        }));
    };

    useEffect(() => {
        setResume(resumeDetails);
    }, [resumeDetails])

    return (
<>
    <div className="flex flex-col ml-8 w-2/3 mt-4">
        <form className="flex flex-row w-full">
            <div className="flex-1 mr-2 mt-6">
                <label className="block">
                    Position Title:
                    <input 
                        type="text" 
                        name="positionTitle"
                        value={resumeDetails.positionTitle} 
                        onChange={handleInputChange} 
                        className="border border-black rounded p-2 w-full" // Added border-black
                    />
                </label>
            </div>
            <div className="flex-1 mx-2 mt-6">
                <label className="block">
                    Company:
                    <input 
                        type="text" 
                        name="company"
                        value={resumeDetails.company} 
                        onChange={handleInputChange} 
                        className="border border-black rounded p-2 w-full" // Added border-black
                    />
                </label>
            </div>
            <div className="flex-1 ml-2 mt-5">
                <label className="block">
                    Keywords:
                    <textarea 
                        name="keywords"
                        value={resumeDetails.keywords.join(', ')} 
                        onChange={handleInputChange} 
                        className="border border-black rounded p-2 w-full" // Added border-black
                        rows={4} 
                        placeholder="Separate keywords with commas"
                    ></textarea>
                </label>
            </div>
        </form>
    </div>
</>
    );
}

export default DetailsForm;