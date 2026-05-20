import React from 'react';
import { DocumentNode } from '@teamate/kernel';
import { LessonLogPayload } from '../types';
import { BookOpen, Trophy, Users } from 'lucide-react';

interface DashboardStatsProps {
  logs: DocumentNode<LessonLogPayload>[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ logs }) => {
  const totalLessons = logs.length;
  
  const avgGrade = totalLessons > 0
    ? (logs.reduce((sum, log) => sum + log.payload.grade, 0) / totalLessons).toFixed(1)
    : '0.0';

  const totalAbsences = logs.reduce((sum, log) => sum + (log.payload.absentCount || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
      {/* Card 1: Tổng số tiết */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Tổng Số Tiết Đã Dạy</p>
            <h3 className="text-3xl font-bold text-white mt-2">{totalLessons}</h3>
          </div>
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <BookOpen className="h-6 w-6" />
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 text-indigo-500/5 select-none font-bold text-8xl pointer-events-none">
          {totalLessons}
        </div>
      </div>

      {/* Card 2: Điểm trung bình nề nếp */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Điểm Nề Nếp Trung Bình</p>
            <h3 className="text-3xl font-bold text-white mt-2">
              {avgGrade} <span className="text-sm text-slate-500">/ 10</span>
            </h3>
          </div>
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <Trophy className="h-6 w-6" />
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 text-emerald-500/5 select-none font-bold text-8xl pointer-events-none">
          {avgGrade}
        </div>
      </div>

      {/* Card 3: Học sinh vắng */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/10 to-orange-500/10 border border-rose-500/20 p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-rose-500/40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Tổng Lượt Vắng Học</p>
            <h3 className="text-3xl font-bold text-white mt-2">
              {totalAbsences} <span className="text-sm text-slate-500">lượt</span>
            </h3>
          </div>
          <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl">
            <Users className="h-6 w-6" />
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 text-rose-500/5 select-none font-bold text-8xl pointer-events-none">
          {totalAbsences}
        </div>
      </div>
    </div>
  );
};
