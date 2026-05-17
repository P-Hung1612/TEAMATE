import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { vi } from 'date-fns/locale';

interface WeeklyScheduleProps {
  onSelectSlot: (date: string, period: number, classId: string, subject: string) => void;
  mockClassId?: string;
  selectedDate?: string;
  selectedPeriod?: number;
}

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ 
  onSelectSlot, 
  mockClassId,
  selectedDate,
  selectedPeriod
}) => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start on Monday
  const weekDays = Array.from({ length: 6 }).map((_, i) => addDays(startDate, i));

  // Hardcoded schedule for MVP testing
  const scheduleTemplate = [
    { dayOffset: 0, period: 1, subject: 'Toán học' }, // Thứ 2
    { dayOffset: 0, period: 2, subject: 'Toán học' },
    { dayOffset: 1, period: 3, subject: 'Toán học' }, // Thứ 3
    { dayOffset: 2, period: 1, subject: 'Toán học' }, // Thứ 4
    { dayOffset: 3, period: 4, subject: 'Toán học' }, // Thứ 5
    { dayOffset: 4, period: 2, subject: 'Toán học' }, // Thứ 6
  ];

  if (!mockClassId) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Chưa có lớp học nào</h3>
        <p className="text-slate-500">Vui lòng sang tab "Quản lý lớp học" để thêm ít nhất 1 lớp trước khi sử dụng Sổ đầu bài.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50">
        <h3 className="font-semibold text-slate-800">Lịch dạy tuần này (Dữ liệu mẫu)</h3>
        <p className="text-sm text-slate-500">Click vào một tiết học để mở/sửa Sổ đầu bài</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="w-16 border-b border-r border-slate-200 bg-slate-50 p-3 text-center text-xs font-semibold text-slate-500 uppercase">Tiết</th>
              {weekDays.map((date) => (
                <th key={date.toISOString()} className="border-b border-slate-200 bg-slate-50 p-3 text-center">
                  <div className="text-sm font-semibold text-slate-800">{format(date, 'EEEE', { locale: vi })}</div>
                  <div className="text-xs text-slate-500">{format(date, 'dd/MM')}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((period) => (
              <tr key={period}>
                <td className="border-b border-r border-slate-200 p-3 text-center font-medium text-slate-600 bg-slate-50">
                  {period}
                </td>
                {weekDays.map((date, dayOffset) => {
                  const dateStr = format(date, 'yyyy-MM-dd');
                  const isSelected = selectedDate === dateStr && selectedPeriod === period;
                  
                  // Check if there is a slot in the mock schedule
                  const slot = scheduleTemplate.find(s => s.dayOffset === dayOffset && s.period === period);
                  
                  if (slot) {
                    return (
                      <td key={dateStr} className={`border-b border-slate-200 p-2 text-center transition-colors ${
                        isSelected ? 'bg-primary-50 ring-2 ring-inset ring-primary-500' : 'hover:bg-slate-50 cursor-pointer'
                      }`} onClick={() => onSelectSlot(dateStr, period, mockClassId, slot.subject)}>
                        <div className={`p-2 rounded-lg text-sm font-medium ${
                          isSelected ? 'bg-primary-100 text-primary-700' : 'bg-blue-50 text-blue-700'
                        }`}>
                          <div>{mockClassId === 'mock' ? 'Lớp mẫu' : 'Lớp đã chọn'}</div>
                          <div className="text-xs opacity-80">{slot.subject}</div>
                        </div>
                      </td>
                    );
                  }
                  return (
                    <td key={dateStr} className="border-b border-slate-200 p-2"></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
