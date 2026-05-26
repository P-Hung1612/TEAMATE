export interface LessonPlanPayload {
  subject: string;
  classGrade: string; // e.g. "Lớp 10"
  topic: string;
  duration: number; // in periods
  content: {
    objectives: string; // HTML string from TipTap
    materials: string; // HTML string from TipTap
    procedures: string; // HTML string from TipTap
  };
  templateId?: string;
}
