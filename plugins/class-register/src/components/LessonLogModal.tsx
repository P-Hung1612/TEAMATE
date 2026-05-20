import React, { useState, useEffect } from 'react';
import { LessonLogPayload, AbsentStudent } from '../types';
import { X, UserPlus, Trash2, Check } from 'lucide-react';

interface LessonLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: LessonLogPayload) => Promise<void>;
  onDelete?: () => Promise<void>;
  initialData?: LessonLogPayload;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  period: number;
}

const DAYS_MAP = {
  monday: 'Thứ Hai',
  tuesday: 'Thứ Ba',
  wednesday: 'Thứ Tư',
  thursday: 'Thứ Năm',
  friday: 'Thứ Sáu',
  saturday: 'Thứ Bảy',
};

export const LessonLogModal: React.FC<LessonLogModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
  dayOfWeek,
  period,
}) => {
  const [classId, setClassId] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [totalStudents, setTotalStudents] = useState(40);
  const [absents, setAbsents] = useState<AbsentStudent[]>([]);
  const [notes, setNotes] = useState('');
  const [grade, setGrade] = useState(10);
  const [teacherSignature, setTeacherSignature] = useState('');

  // Local state for adding an absent student
  const [newAbsentName, setNewAbsentName] = useState('');
  const [newAbsentType, setNewAbsentType] = useState<'permitted' | 'unpermitted'>('permitted');
  const [newAbsentNote, setNewAbsentNote] = useState('');

  useEffect(() => {
    if (initialData) {
      setClassId(initialData.classId || '');
      setSubject(initialData.subject || '');
      setTopic(initialData.topic || '');
      setTotalStudents(initialData.totalStudents || 40);
      setAbsents(initialData.absents || []);
      setNotes(initialData.notes || '');
      setGrade(initialData.grade ?? 10);
      setTeacherSignature(initialData.teacherSignature || '');
    } else {
      setClassId('');
      setSubject('');
      setTopic('');
      setTotalStudents(40);
      setAbsents([]);
      setNotes('');
      setGrade(10);
      setTeacherSignature('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddAbsent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAbsentName.trim()) return;
    const item: AbsentStudent = {
      name: newAbsentName.trim(),
      type: newAbsentType,
      note: newAbsentNote.trim() || undefined,
    };
    setAbsents([...absents, item]);
    setNewAbsentName('');
    setNewAbsentNote('');
  };

  const handleRemoveAbsent = (index: number) => {
    setAbsents(absents.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classId || !subject || !topic || !teacherSignature) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc (Lớp, Môn, Bài học, Giáo viên ký).');
      return;
    }
    await onSave({
      dayOfWeek,
      period,
      classId,
      subject,
      topic,
      totalStudents,
      absentCount: absents.length,
      absents,
      notes,
      grade,
      teacherSignature,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
          <div>
            <h3 className="text-xl font-bold text-white">Sổ Đầu Bài: {DAYS_MAP[dayOfWeek]} - Tiết {period}</h3>
            <p className="text-sm text-slate-400 mt-1">Cập nhật thông tin chi tiết của giờ dạy học</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Hàng 1: Lớp, Môn, Sĩ số */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Lớp học *</label>
              <input
                type="text"
                required
                placeholder="Ví dụ: 10A1, 12A2..."
                value={classId}
                onChange={e => setClassId(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Môn học *</label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Toán, Ngữ Văn, Tiếng Anh..."
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Sĩ số lớp</label>
              <input
                type="number"
                min={1}
                value={totalStudents}
                onChange={e => setTotalStudents(Number(e.target.value))}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>

          {/* Hàng 2: Tên bài dạy */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nội dung bài học / Chuyên đề *</label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Tiết 12: Đọc hiểu văn bản Chiều tối..."
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Điểm danh học sinh vắng */}
          <div className="bg-slate-950/30 rounded-2xl p-4 border border-slate-800">
            <h4 className="text-sm font-semibold text-white mb-3">Điểm danh học sinh vắng ({absents.length} vắng)</h4>
            
            {/* Form thêm học sinh vắng */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="text"
                placeholder="Tên học sinh vắng..."
                value={newAbsentName}
                onChange={e => setNewAbsentName(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <select
                value={newAbsentType}
                onChange={e => setNewAbsentType(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="permitted">Có phép</option>
                <option value="unpermitted">Không phép</option>
              </select>
              <input
                type="text"
                placeholder="Lý do/Chú thích..."
                value={newAbsentNote}
                onChange={e => setNewAbsentNote(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddAbsent}
                className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg px-4 py-1.5 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                Thêm
              </button>
            </div>

            {/* Danh sách học sinh vắng */}
            {absents.length > 0 ? (
              <div className="max-h-32 overflow-y-auto divide-y divide-slate-800 border border-slate-800 rounded-xl bg-slate-950/50">
                {absents.map((student, idx) => (
                  <div key={idx} className="flex items-center justify-between px-3 py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-200">{student.name}</span>
                      <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                        student.type === 'permitted'
                          ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 ring-rose-500/20'
                      }`}>
                        {student.type === 'permitted' ? 'Có phép' : 'Không phép'}
                      </span>
                      {student.note && <span className="text-slate-400 text-xs">- {student.note}</span>}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAbsent(idx)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-slate-500 text-sm italic">Không có học sinh vắng. Lớp đi học đầy đủ!</div>
            )}
          </div>

          {/* Nhận xét tiết học */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nhận xét bài học / nề nếp</label>
            <textarea
              rows={3}
              placeholder="Nhập nhận xét của giáo viên về tiết học..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
            />
          </div>

          {/* Điểm số & Chữ ký */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slider điểm số */}
            <div className="bg-slate-950/30 p-4 border border-slate-800 rounded-2xl flex flex-col justify-center">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-slate-300">Điểm đánh giá tiết học:</span>
                <span className={`text-xl font-bold px-3 py-1 rounded-lg ${
                  grade >= 8 ? 'bg-emerald-500/20 text-emerald-400' : grade >= 5 ? 'bg-orange-500/20 text-orange-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {grade}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={grade}
                onChange={e => setGrade(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>1 (Kém)</span>
                <span>5 (TB)</span>
                <span>8 (Khá)</span>
                <span>10 (Tốt)</span>
              </div>
            </div>

            {/* Ký tên giáo viên */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Giáo viên ký xác nhận *</label>
              <input
                type="text"
                required
                placeholder="Nhập tên của bạn để ký nhận..."
                value={teacherSignature}
                onChange={e => setTeacherSignature(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between">
          <div>
            {initialData && onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="h-4.5 w-4.5" />
                Xóa ghi chép
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-800 text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
            >
              <Check className="h-4.5 w-4.5" />
              Lưu sổ sách
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
