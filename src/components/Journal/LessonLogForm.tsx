import React, { useState, useEffect, useRef } from 'react';
import { db, type LessonLog } from '../../db/schema';
import { AttendanceList } from './AttendanceList';
import { useLiveQuery } from 'dexie-react-hooks';
import { Save, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface LessonLogFormProps {
  classId: string;
  date: string;
  period: number;
  defaultSubject: string;
  onClose: () => void;
}

export const LessonLogForm: React.FC<LessonLogFormProps> = ({ classId, date, period, defaultSubject, onClose }) => {
  const [log, setLog] = useState<Partial<LessonLog>>({
    classId,
    date,
    period,
    subject: defaultSubject,
    topic: '',
    notes: '',
    attendance: [],
    syncStatus: 'pending'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // Data loading state
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch related data
  const students = useLiveQuery(() => db.students.where('classId').equals(classId).toArray(), [classId]);
  const classInfo = useLiveQuery(() => db.classes.get(classId), [classId]);

  // Load existing log if any
  useEffect(() => {
    const loadExistingLog = async () => {
      const existingLogs = await db.lessonLogs
        .where('[classId+date+period]')
        .equals([classId, date, period])
        .toArray();
        
      if (existingLogs.length > 0) {
        setLog(existingLogs[0]);
      }
      setIsLoaded(true);
    };
    
    loadExistingLog();
  }, [classId, date, period]);

  // Auto-save logic
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip auto-save on initial mount/load
    if (isFirstRender.current || !isLoaded) {
      isFirstRender.current = false;
      return;
    }

    setIsSaving(true);
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        if (log.id) {
          await db.lessonLogs.update(log.id, { ...log, syncStatus: 'pending' });
        } else {
          const id = await db.lessonLogs.add({ ...log, syncStatus: 'pending' } as LessonLog);
          setLog(prev => ({ ...prev, id: id.toString() }));
        }
        setLastSaved(new Date());
      } catch (error) {
        console.error("Failed to save log:", error);
      } finally {
        setIsSaving(false);
      }
    }, 1000); // 1s debounce

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [log, isLoaded]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLog(prev => ({ ...prev, [name]: value }));
  };

  const handleAttendanceChange = (attendance: any[]) => {
    setLog(prev => ({ ...prev, attendance }));
  };

  if (!isLoaded || !students || !classInfo) {
    return (
      <div className="flex items-center justify-center p-12 bg-white rounded-xl border border-slate-200 shadow-sm">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[80vh]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              Sổ đầu bài: Lớp {classInfo.name}
            </h2>
            <p className="text-sm text-slate-500">
              Tiết {period} • {format(new Date(date), 'dd/MM/yyyy')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {isSaving ? (
            <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full font-medium">
              <Loader2 size={14} className="animate-spin" /> Đang lưu...
            </span>
          ) : lastSaved ? (
            <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1.5 rounded-full font-medium">
              <CheckCircle2 size={14} /> Đã lưu ({format(lastSaved, 'HH:mm:ss')})
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full font-medium">
              <Save size={14} /> Chưa lưu
            </span>
          )}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Môn học</label>
              <input
                type="text"
                name="subject"
                value={log.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow text-slate-800"
                placeholder="VD: Toán học"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Tên bài dạy</label>
              <input
                type="text"
                name="topic"
                value={log.topic}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow text-slate-800"
                placeholder="Nhập tên bài học hôm nay..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Ghi chú (Tùy chọn)</label>
              <textarea
                name="notes"
                value={log.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow text-slate-800 resize-none"
                placeholder="Nhập ghi chú cho tiết học này..."
              />
            </div>
          </div>

          <div>
            <AttendanceList
              students={students}
              attendance={log.attendance || []}
              onChange={handleAttendanceChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
