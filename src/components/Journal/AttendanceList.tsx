import React from 'react';
import type { Student } from '../../db/schema';
import { Check, UserX, AlertCircle } from 'lucide-react';

type AttendanceStatus = 'present' | 'absent_permitted' | 'absent_unpermitted';

interface AttendanceRecord {
  studentId: string;
  status: AttendanceStatus;
}

interface AttendanceListProps {
  students: Student[];
  attendance: AttendanceRecord[];
  onChange: (attendance: AttendanceRecord[]) => void;
}

export const AttendanceList: React.FC<AttendanceListProps> = ({ students, attendance, onChange }) => {
  const getStatus = (studentId: string): AttendanceStatus => {
    const record = attendance.find(a => a.studentId === studentId);
    return record ? record.status : 'present'; // Default to present as per MVP agreement
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    const newAttendance = [...attendance];
    const index = newAttendance.findIndex(a => a.studentId === studentId);
    
    if (index >= 0) {
      newAttendance[index].status = status;
    } else {
      newAttendance.push({ studentId, status });
    }
    
    onChange(newAttendance);
  };

  const markAllPresent = () => {
    // We can just clear the array if 'present' is default, 
    // but explicitly setting them might be safer depending on how we query later.
    // However, to keep it simple and small, we can just map all to present.
    const allPresent = students.map(s => ({ studentId: s.id as string, status: 'present' as AttendanceStatus }));
    onChange(allPresent);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-semibold text-slate-800">Điểm danh ({students.length} học sinh)</h4>
        <button 
          type="button"
          onClick={markAllPresent}
          className="text-xs text-primary-600 hover:text-primary-700 font-medium px-3 py-1.5 bg-primary-50 rounded-lg transition-colors"
        >
          Đánh dấu tất cả có mặt
        </button>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-500 w-12 text-center">STT</th>
              <th className="px-4 py-3 font-semibold text-slate-500">Họ và tên</th>
              <th className="px-4 py-3 font-semibold text-slate-500 text-center w-64">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                  Lớp này chưa có học sinh nào.
                </td>
              </tr>
            ) : (
              students.map((student, index) => {
                const status = getStatus(student.id as string);
                
                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-center text-slate-500">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">{student.fullName}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1 bg-slate-100 p-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id as string, 'present')}
                          className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-md transition-all text-xs font-medium ${
                            status === 'present' 
                              ? 'bg-white text-green-600 shadow-sm ring-1 ring-slate-200/50' 
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                          title="Có mặt"
                        >
                          <Check size={14} /> Có mặt
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id as string, 'absent_permitted')}
                          className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-md transition-all text-xs font-medium ${
                            status === 'absent_permitted' 
                              ? 'bg-white text-amber-600 shadow-sm ring-1 ring-slate-200/50' 
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                          title="Vắng có phép"
                        >
                          <AlertCircle size={14} /> Phép
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id as string, 'absent_unpermitted')}
                          className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-md transition-all text-xs font-medium ${
                            status === 'absent_unpermitted' 
                              ? 'bg-white text-red-600 shadow-sm ring-1 ring-slate-200/50' 
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                          title="Vắng không phép"
                        >
                          <UserX size={14} /> K.Phép
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
