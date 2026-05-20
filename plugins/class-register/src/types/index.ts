export interface AbsentStudent {
  name: string;
  type: 'permitted' | 'unpermitted';
  note?: string;
}

export interface LessonLogPayload {
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  period: number; // Tiết 1 -> Tiết 5
  classId: string; // Tên lớp (ví dụ: '10A1')
  subject: string; // Môn học (ví dụ: 'Toán')
  topic: string; // Nội dung bài dạy / Chuyên đề
  totalStudents: number; // Sĩ số lớp
  absentCount: number; // Số lượng học sinh vắng
  absents: AbsentStudent[]; // Danh sách học sinh vắng cụ thể
  notes: string; // Nhận xét bài học / nề nếp
  grade: number; // Điểm tiết học (1-10)
  teacherSignature: string; // Tên giáo viên đứng lớp ký tên
}
