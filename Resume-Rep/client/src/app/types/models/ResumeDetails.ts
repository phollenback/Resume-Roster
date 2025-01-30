export default interface ResumeDetails {
    userId: number;
    positionTitle: string;
    company: string;
    keywords: string[];
    date: Date;
    file? : File | null;
}