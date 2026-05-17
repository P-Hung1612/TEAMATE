import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/schema';
import { WeeklySchedule } from './WeeklySchedule';
import { LessonLogForm } from './LessonLogForm';
import { exportJournalToExcel } from '../../utils/excelExport';
import { FileSpreadsheet, PlusCircle } from 'lucide-react';

export const JournalTab: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    period: number;
    classId: string;
    subject: string;
  } | null>(null);

  const classes = useLiveQuery(() => db.classes.toArray()) || [];
  const logs = useLiveQuery(() => db.lessonLogs.toArray()) || [];
  const students = useLiveQuery(() => db.students.toArray()) || [];

  const handleSelectSlot = (date: string, period: number, classId: string, subject: string) => {
    setSelectedSlot({ date, period, classId, subject });
  };

  const handleExportExcel = async () => {
    try {
      await exportJournalToExcel(logs, classes, students);
    } catch (error) {
      console.error("Export failed", error);
      alert("Có lỗi xảy ra khi xuất file Excel.");
    }
  };

  const hasClasses = classes.length > 0;
  // Use the first class as mock class for the schedule if classes exist
  const mockClassId = hasClasses ? classes[0].id : undefined;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Sổ đầu bài</h2>
          <p className="text-slate-500">Quản lý lịch dạy và ghi sổ đầu bài nhanh chóng.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportExcel}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
          >
            <FileSpreadsheet size={18} className="text-green-600" />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {!hasClasses && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-start gap-3">
          <div className="mt-0.5">
            <PlusCircle size={18} className="text-amber-600" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-900">Chưa có dữ liệu lớp học</h4>
            <p className="text-sm mt-1 text-amber-700">
              Bạn cần thêm ít nhất 1 lớp học và danh sách học sinh ở tab <strong>"Quản lý lớp học"</strong> để có thể sử dụng tính năng Sổ đầu bài.
            </p>
          </div>
        </div>
      )}

      {selectedSlot ? (
        <LessonLogForm
          classId={selectedSlot.classId}
          date={selectedSlot.date}
          period={selectedSlot.period}
          defaultSubject={selectedSlot.subject}
          onClose={() => setSelectedSlot(null)}
        />
      ) : (
        <WeeklySchedule 
          onSelectSlot={handleSelectSlot}
          mockClassId={mockClassId}
        />
      )}
    </div>
  );
};
