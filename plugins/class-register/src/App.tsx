import { useState, useEffect } from 'react';
import { KernelProvider, useKernel } from './context/KernelContext';
import { DocumentNode } from '@teamate/kernel';
import { LessonLogPayload } from './types';
import { DashboardStats } from './components/DashboardStats';
import { ClassRegisterGrid } from './components/ClassRegisterGrid';
import { LessonLogModal } from './components/LessonLogModal';
import { Wifi, WifiOff, RefreshCw, Filter } from 'lucide-react';

function ClassRegisterMain() {
  const kernel = useKernel();
  const [isOnline, setIsOnline] = useState(true);
  const [logs, setLogs] = useState<DocumentNode<LessonLogPayload>[]>([]);
  const [selectedClass, setSelectedClass] = useState('All');
  
  // Trạng thái cho modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDay, setModalDay] = useState<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>('monday');
  const [modalPeriod, setModalPeriod] = useState(1);
  const [editingDoc, setEditingDoc] = useState<DocumentNode<LessonLogPayload> | undefined>(undefined);
  
  // Trạng thái đồng bộ
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchLogs = async () => {
    const data = await kernel.getDocuments<LessonLogPayload>('lesson_log');
    setLogs(data);
  };

  // Lắng nghe trạng thái mạng
  useEffect(() => {
    kernel.onNetworkChange((online) => {
      setIsOnline(online);
    });
  }, [kernel]);

  // Khởi tạo và nạp dữ liệu mẫu nếu DB trống
  useEffect(() => {
    const initAndSeed = async () => {
      const data = await kernel.getDocuments<LessonLogPayload>('lesson_log');
      if (data.length === 0) {
        console.log('[ClassRegister] DB trống. Đang gieo dữ liệu mẫu (Seeding)...');
        
        const mockLogs: Omit<LessonLogPayload, 'is_synced' | 'created_at' | 'updated_at' | 'deleted_at'>[] = [
          {
            dayOfWeek: 'monday',
            period: 1,
            classId: '10A1',
            subject: 'Toán',
            topic: 'Tiết 1: Ôn tập khảo sát đầu năm',
            totalStudents: 42,
            absentCount: 0,
            absents: [],
            notes: 'Lớp học nghiêm túc, nghe giảng bài tốt, chuẩn bị bài đầy đủ.',
            grade: 10,
            teacherSignature: 'Nguyễn Văn Hùng'
          },
          {
            dayOfWeek: 'monday',
            period: 2,
            classId: '10A1',
            subject: 'Toán',
            topic: 'Tiết 2: Mệnh đề và tập hợp',
            totalStudents: 42,
            absentCount: 1,
            absents: [{ name: 'Trần Văn An', type: 'permitted', note: 'Ốm sốt' }],
            notes: 'Học sinh hăng hái phát biểu, ghi bài đầy đủ.',
            grade: 9,
            teacherSignature: 'Nguyễn Văn Hùng'
          },
          {
            dayOfWeek: 'tuesday',
            period: 3,
            classId: '11B2',
            subject: 'Ngữ Văn',
            topic: 'Tiết 10: Đọc văn bản Chiều tối (Hồ Chí Minh)',
            totalStudents: 40,
            absentCount: 2,
            absents: [
              { name: 'Nguyễn Thị Hoa', type: 'permitted', note: 'Đi thi HSG' },
              { name: 'Lê Minh Tuấn', type: 'unpermitted', note: 'Bỏ tiết' }
            ],
            notes: 'Lớp hơi ồn ở nửa sau tiết học, kiểm tra bài cũ đạt yêu cầu.',
            grade: 8,
            teacherSignature: 'Trần Thị Thảo'
          },
          {
            dayOfWeek: 'wednesday',
            period: 5,
            classId: '12A3',
            subject: 'Tiếng Anh',
            topic: 'Unit 1: Language Focus & Pronunciation',
            totalStudents: 45,
            absentCount: 0,
            absents: [],
            notes: 'Cả lớp tập trung nghe giảng, làm bài tập đầy đủ.',
            grade: 10,
            teacherSignature: 'Lê Thu Hà'
          },
          {
            dayOfWeek: 'friday',
            period: 4,
            classId: '10A1',
            subject: 'Vật Lý',
            topic: 'Tiết 8: Chuyển động cơ và hệ quy chiếu',
            totalStudents: 42,
            absentCount: 0,
            absents: [],
            notes: 'Lớp chuẩn bị bài tốt, xây dựng bài tích cực.',
            grade: 9,
            teacherSignature: 'Hoàng Minh Đức'
          }
        ];

        for (const log of mockLogs) {
          await kernel.insertDocument('lesson_log', log);
        }
        
        // Refresh lại danh sách sau khi gieo
        const refreshed = await kernel.getDocuments<LessonLogPayload>('lesson_log');
        setLogs(refreshed);
      } else {
        setLogs(data);
      }
    };

    initAndSeed();
  }, [kernel]);

  // Click vào một ô trống hoặc ô đã có tiết
  const handleSelectSlot = (
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday',
    period: number,
    existingDoc?: DocumentNode<LessonLogPayload>
  ) => {
    setModalDay(day);
    setModalPeriod(period);
    setEditingDoc(existingDoc);
    setIsModalOpen(true);
  };

  // Lưu hoặc cập nhật tiết dạy
  const handleSaveLesson = async (payload: LessonLogPayload) => {
    if (editingDoc) {
      await kernel.updateDocument(editingDoc.id, payload);
    } else {
      await kernel.insertDocument('lesson_log', payload);
    }
    await fetchLogs();
  };

  // Xóa tiết dạy
  const handleDeleteLesson = async () => {
    if (editingDoc) {
      await kernel.deleteDocument(editingDoc.id);
      setIsModalOpen(false);
      await fetchLogs();
    }
  };

  // Kích hoạt đồng bộ thủ công
  const handleSync = async () => {
    setIsSyncing(true);
    await kernel.syncNow();
    // Giả lập xoay vòng animation trong 1s để tăng trải nghiệm người dùng
    setTimeout(async () => {
      await fetchLogs();
      setIsSyncing(false);
    }, 1000);
  };

  // Danh sách các lớp học độc nhất xuất hiện trong dữ liệu để lọc
  const classesList = ['All', ...Array.from(new Set(logs.map(log => log.payload.classId))).filter(Boolean)];

  // Lọc dữ liệu theo lớp được chọn
  const filteredLogs = selectedClass === 'All'
    ? logs
    : logs.filter(log => log.payload.classId === selectedClass);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased pb-12 selection:bg-indigo-500/30">
      {/* Top Navigation / Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              TM
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-wide">TEAMATE</h1>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Sổ đầu bài điện tử</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Network Indicator */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              isOnline 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}>
              {isOnline ? (
                <>
                  <Wifi className="h-3.5 w-3.5" />
                  <span>Trực tuyến</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3.5 w-3.5" />
                  <span>Ngoại tuyến</span>
                </>
              )}
            </div>

            {/* Sync Button */}
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white px-4 py-1.5 rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin text-indigo-400' : ''}`} />
              <span>Đồng bộ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Statistics section */}
        <DashboardStats logs={filteredLogs} />

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900/40 p-4 border border-slate-900 rounded-2xl">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">Bộ lọc dữ liệu</h3>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs text-slate-400 font-medium">Chọn Lớp:</label>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {classesList.map(c => (
                <option key={c} value={c}>
                  {c === 'All' ? 'Tất cả các lớp' : `Lớp ${c}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Weekly Grid */}
        <ClassRegisterGrid logs={filteredLogs} onSelectSlot={handleSelectSlot} />
      </main>

      {/* Detail log modal */}
      <LessonLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLesson}
        onDelete={handleDeleteLesson}
        initialData={editingDoc?.payload}
        dayOfWeek={modalDay}
        period={modalPeriod}
      />
    </div>
  );
}

function App() {
  return (
    <KernelProvider>
      <ClassRegisterMain />
    </KernelProvider>
  );
}

export default App;
