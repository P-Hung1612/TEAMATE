import { useState, useEffect } from 'react';
import { KernelProvider, useKernel } from './context/KernelContext';
import type { DocumentNode } from '@teamate/kernel';
import type { LessonPlanPayload } from './types';
import { LessonPlanForm } from './components/LessonPlanForm';
import { BookOpen, Plus, Search, FileText, Calendar, MoreVertical, Pencil, Trash2 } from 'lucide-react';

function LessonPlannerMain() {
  const kernel = useKernel();
  const [plans, setPlans] = useState<DocumentNode<LessonPlanPayload>[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPlan, setEditingPlan] = useState<DocumentNode<LessonPlanPayload> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPlans = async () => {
    const data = await kernel.getDocuments<LessonPlanPayload>('lesson_plan');
    setPlans(data);
  };

  useEffect(() => {
    const initSeed = async () => {
      const data = await kernel.getDocuments<LessonPlanPayload>('lesson_plan');
      if (data.length === 0) {
        console.log("Seeding mock lesson plan...");
        const mock: Omit<LessonPlanPayload, 'is_synced' | 'created_at' | 'updated_at' | 'deleted_at'> = {
          subject: 'Toán học',
          classGrade: 'Lớp 10',
          topic: 'Bài 1: Mệnh đề',
          duration: 2,
          content: {
            objectives: '<p><strong>1. Kiến thức:</strong> Nắm được khái niệm mệnh đề.</p><p><strong>2. Kỹ năng:</strong> Biết lập mệnh đề phủ định.</p>',
            materials: '<p>Sách giáo khoa, máy chiếu, phiếu học tập.</p>',
            procedures: '<p><strong>Hoạt động 1:</strong> Khởi động (10 phút)</p><p><strong>Hoạt động 2:</strong> Hình thành kiến thức (30 phút)</p>'
          }
        };
        await kernel.insertDocument('lesson_plan', mock);
        await fetchPlans();
      } else {
        setPlans(data);
      }
    };
    initSeed();
  }, [kernel]);

  const handleSave = async (payload: LessonPlanPayload) => {
    if (editingPlan) {
      await kernel.updateDocument(editingPlan.id, payload);
    } else {
      await kernel.insertDocument('lesson_plan', payload);
    }
    setIsCreating(false);
    setEditingPlan(null);
    await fetchPlans();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa giáo án này?")) {
      await kernel.deleteDocument(id);
      await fetchPlans();
    }
  };

  const filteredPlans = plans.filter(p =>
    p.payload.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.payload.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased pb-12">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-wide">TEAMATE</h1>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Soạn giáo án thông minh</p>
            </div>
          </div>
          {!isCreating && !editingPlan && (
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" />
              Tạo Giáo Án
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {(isCreating || editingPlan) ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <LessonPlanForm
              initialData={editingPlan ? editingPlan.payload : undefined}
              onSave={handleSave}
              onCancel={() => { setIsCreating(false); setEditingPlan(null); }}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-2 w-full max-w-md shadow-sm">
              <div className="pl-3 text-slate-400"><Search className="w-5 h-5" /></div>
              <input
                type="text"
                placeholder="Tìm kiếm theo bài dạy, môn học..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-transparent border-none text-sm text-white w-full focus:outline-none focus:ring-0 py-2"
              />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map(plan => (
                <div key={plan.id} className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 transition-all hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 bg-slate-800 rounded-xl text-emerald-400">
                      <FileText className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditingPlan(plan)} className="p-1.5 text-slate-500 hover:text-emerald-400 bg-slate-800/0 hover:bg-slate-800 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(plan.id)} className="p-1.5 text-slate-500 hover:text-rose-400 bg-slate-800/0 hover:bg-slate-800 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{plan.payload.topic}</h3>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300">
                      {plan.payload.subject}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300">
                      {plan.payload.classGrade}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Calendar className="w-3 h-3" />
                      {plan.payload.duration} tiết
                    </span>
                  </div>
                </div>
              ))}

              {filteredPlans.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-2xl">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Không tìm thấy giáo án nào.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <KernelProvider>
      <LessonPlannerMain />
    </KernelProvider>
  );
}

export default App;
