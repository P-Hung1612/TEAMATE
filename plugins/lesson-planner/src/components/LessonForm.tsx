import React, { useState } from 'react';
import { BookOpen, Target, Settings, Activity, Save } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';

export const LessonForm: React.FC = () => {
  const [objectives, setObjectives] = useState('<p>1. Kiến thức: ...</p><p>2. Năng lực: ...</p>');
  const [preparation, setPreparation] = useState('<p>Giáo viên: ...</p><p>Học sinh: ...</p>');
  const [activities, setActivities] = useState('<p>Hoạt động 1: Khởi động (5 phút)</p>');

  return (
    <div className="bg-white/60 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white shadow-lg shadow-blue-500/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-sans text-slate-800">Soạn Giáo Án 5512</h2>
            <p className="text-slate-500">Mẫu kế hoạch bài dạy theo Công văn 5512/BGDĐT-GDTrH</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
          <Save className="w-4 h-4" />
          Lưu bản nháp
        </button>
      </div>

      <div className="space-y-10">
        {/* I. Mục tiêu */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-800">I. Mục tiêu bài học</h3>
          </div>
          <div className="pl-7">
            <RichTextEditor content={objectives} onChange={setObjectives} />
          </div>
        </section>

        {/* II. Chuẩn bị */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-800">II. Thiết bị dạy học và học liệu</h3>
          </div>
          <div className="pl-7">
            <RichTextEditor content={preparation} onChange={setPreparation} />
          </div>
        </section>

        {/* III. Tiến trình */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-slate-800">III. Tiến trình dạy học</h3>
          </div>
          <div className="pl-7">
            <RichTextEditor content={activities} onChange={setActivities} />
          </div>
        </section>
      </div>
    </div>
  );
};
