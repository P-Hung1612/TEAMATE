import { DocumentNode } from '@teamate/kernel';
import { LessonLogPayload } from '../types';
import { Plus, Cloud, CloudOff } from 'lucide-react';

interface ClassRegisterGridProps {
  logs: DocumentNode<LessonLogPayload>[];
  onSelectSlot: (
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday',
    period: number,
    existingDoc?: DocumentNode<LessonLogPayload>
  ) => void;
}

const DAYS: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday')[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const DAY_LABELS = {
  monday: 'Thứ Hai',
  tuesday: 'Thứ Ba',
  wednesday: 'Thứ Tư',
  thursday: 'Thứ Năm',
  friday: 'Thứ Sáu',
  saturday: 'Thứ Bảy',
};

const PERIODS = [1, 2, 3, 4, 5];

export const ClassRegisterGrid: React.FC<ClassRegisterGridProps> = ({ logs, onSelectSlot }) => {
  // Tìm document dựa trên thứ và tiết
  const findLog = (day: string, period: number) => {
    return logs.find(log => log.payload.dayOfWeek === day && log.payload.period === period);
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md shadow-xl animate-fade-in">
      <table className="min-w-full table-fixed border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-950/40">
            <th className="w-20 p-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Tiết</th>
            {DAYS.map(day => (
              <th key={day} className="p-4 text-sm font-semibold text-slate-200 text-center border-l border-slate-800/50">
                {DAY_LABELS[day]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {PERIODS.map(period => (
            <tr key={period} className="hover:bg-slate-950/10 transition-colors">
              <td className="p-4 text-center font-bold text-slate-400 border-r border-slate-800/50">
                T.{period}
              </td>
              {DAYS.map(day => {
                const doc = findLog(day, period);
                return (
                  <td key={day} className="p-3 border-l border-slate-800/30 align-top">
                    {doc ? (
                      /* Card hiển thị thông tin tiết dạy */
                      <div
                        onClick={() => onSelectSlot(day, period, doc)}
                        className="group relative cursor-pointer overflow-hidden rounded-xl bg-slate-950/40 border border-slate-800 p-3 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-950/70 hover:border-indigo-500/50"
                      >
                        <div className="flex items-start justify-between">
                          <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
                            {doc.payload.classId}
                          </span>
                          <span className="text-xs font-medium text-slate-400">{doc.payload.subject}</span>
                        </div>
                        
                        <p className="mt-2 text-xs font-medium text-slate-200 line-clamp-1 group-hover:text-indigo-300 transition-colors">
                          {doc.payload.topic}
                        </p>
                        
                        <div className="mt-3 flex items-center justify-between border-t border-slate-800/50 pt-2 text-[10px]">
                          <div className="flex items-center gap-1.5">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                              doc.payload.grade >= 8
                                ? 'bg-emerald-500'
                                : doc.payload.grade >= 5
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`} />
                            <span className="text-slate-400 font-semibold">{doc.payload.grade}đ</span>
                          </div>

                          {doc.payload.absentCount > 0 && (
                            <span className="text-rose-400 font-medium">Vắng: {doc.payload.absentCount}</span>
                          )}
                          
                          <div className="text-slate-500 flex items-center">
                            {doc.is_synced ? (
                              <span title="Đã đồng bộ lên máy chủ">
                                <Cloud className="h-3.5 w-3.5 text-emerald-500" />
                              </span>
                            ) : (
                              <span title="Chờ đồng bộ">
                                <CloudOff className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Ô trống chưa có tiết dạy */
                      <button
                        onClick={() => onSelectSlot(day, period)}
                        className="w-full min-h-[90px] flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 hover:border-slate-700 bg-transparent hover:bg-slate-950/20 text-slate-600 hover:text-slate-400 hover:shadow-inner transition-all duration-200 group"
                      >
                        <Plus className="h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200" />
                        <span className="text-[10px] mt-1 font-medium opacity-0 group-hover:opacity-100 transition-all duration-200">Thêm tiết</span>
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
