import { useState } from 'react';
import { TipTapEditor } from './TipTapEditor';
import type { LessonPlanPayload } from '../types';
import { Save, X } from 'lucide-react';

interface LessonPlanFormProps {
  initialData?: LessonPlanPayload;
  onSave: (data: LessonPlanPayload) => void;
  onCancel: () => void;
}

export const LessonPlanForm = ({ initialData, onSave, onCancel }: LessonPlanFormProps) => {
  const [formData, setFormData] = useState<LessonPlanPayload>(
    initialData || {
      subject: '',
      classGrade: '',
      topic: '',
      duration: 1,
      content: {
        objectives: '',
        materials: '',
        procedures: '',
      },
    }
  );

  const handleChange = (field: keyof LessonPlanPayload, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContentChange = (field: keyof LessonPlanPayload['content'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white">Soạn Giáo Án Mới</h2>
          <p className="text-sm text-slate-400 mt-1">Chuẩn Công văn 5512 (Rút gọn)</p>
        </div>
        <button onClick={onCancel} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Thông tin chung */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Tên bài dạy (Chủ đề)</label>
            <input
              required
              type="text"
              value={formData.topic}
              onChange={(e) => handleChange('topic', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              placeholder="VD: Bài 1: Mệnh đề..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Môn học</label>
            <input
              required
              type="text"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              placeholder="VD: Toán học"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Khối lớp</label>
            <input
              required
              type="text"
              value={formData.classGrade}
              onChange={(e) => handleChange('classGrade', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              placeholder="VD: Lớp 10"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">Thời lượng (Số tiết)</label>
            <input
              required
              type="number"
              min="1"
              value={formData.duration}
              onChange={(e) => handleChange('duration', parseInt(e.target.value) || 1)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="w-full h-px bg-slate-800"></div>

        {/* Nội dung chi tiết CV 5512 */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-base font-bold text-indigo-400 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-indigo-500/20 flex items-center justify-center text-sm">I</span>
              Mục tiêu bài dạy
            </label>
            <TipTapEditor
              content={formData.content.objectives}
              onChange={(val) => handleContentChange('objectives', val)}
            />
          </div>

          <div className="space-y-3">
            <label className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center text-sm">II</span>
              Thiết bị dạy học và Học liệu
            </label>
            <TipTapEditor
              content={formData.content.materials}
              onChange={(val) => handleContentChange('materials', val)}
            />
          </div>

          <div className="space-y-3">
            <label className="text-base font-bold text-amber-400 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-amber-500/20 flex items-center justify-center text-sm">III</span>
              Tiến trình dạy học
            </label>
            <TipTapEditor
              content={formData.content.procedures}
              onChange={(val) => handleContentChange('procedures', val)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
          >
            <Save className="w-4 h-4" />
            Lưu giáo án
          </button>
        </div>
      </form>
    </div>
  );
};
