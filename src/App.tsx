import { useState } from 'react'
import { db } from './db/schema'
import { useLiveQuery } from 'dexie-react-hooks'
import { Layout, Users, BookOpen, ClipboardCheck, Settings, PlusCircle } from 'lucide-react'
import { JournalTab } from './components/Journal/JournalTab'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  
  const classes = useLiveQuery(() => db.classes.toArray())

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary-600 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
              T
            </div>
            TEAMATE
          </h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Trợ giáo thông minh</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            icon={<Layout size={20} />} 
            label="Tổng quan" 
          />
          <NavItem 
            active={activeTab === 'journal'} 
            onClick={() => setActiveTab('journal')}
            icon={<ClipboardCheck size={20} />} 
            label="Sổ đầu bài" 
          />
          <NavItem 
            active={activeTab === 'lesson-plan'} 
            onClick={() => setActiveTab('lesson-plan')}
            icon={<BookOpen size={20} />} 
            label="Soạn giáo án" 
          />
          <NavItem 
            active={activeTab === 'students'} 
            onClick={() => setActiveTab('students')}
            icon={<Users size={20} />} 
            label="Quản lý lớp học" 
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <NavItem 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
            icon={<Settings size={20} />} 
            label="Cài đặt" 
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {activeTab === 'dashboard' && (
          <>
            <header className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Chào buổi sáng, Thầy/Cô!</h2>
                <p className="text-slate-500">Hôm nay bạn có 5 tiết giảng dạy.</p>
              </div>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-primary-500/30">
                <PlusCircle size={20} />
                <span>Soạn bài mới</span>
              </button>
            </header>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatsCard label="Lớp đang dạy" value={classes?.length || 0} color="bg-blue-500" />
              <StatsCard label="Giáo án đã soạn" value="12" color="bg-purple-500" />
              <StatsCard label="Bài chưa chấm" value="3" color="bg-amber-500" />
            </div>

            <section className="mt-12">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Lịch dạy gần đây</h3>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-bottom border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Tiết</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Lớp</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Môn</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <TableRow period={1} className="10A1" subject="Toán học" status="Đã ghi sổ" />
                    <TableRow period={2} className="11B2" subject="Toán học" status="Chờ ghi sổ" highlight />
                    <TableRow period={4} className="10A1" subject="Toán học" status="Chờ ghi sổ" />
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {activeTab === 'journal' && <JournalTab />}
      </main>
    </div>
  )
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-primary-50 text-primary-600 font-medium' 
          : 'text-slate-600 hover:bg-slate-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function StatsCard({ label, value, color }: { label: string, value: string | number, color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
          <Layout size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  )
}

function TableRow({ period, className, subject, status, highlight }: { period: number, className: string, subject: string, status: string, highlight?: boolean }) {
  return (
    <tr className={highlight ? 'bg-primary-50/50' : ''}>
      <td className="px-6 py-4 font-medium text-slate-700">Tiết {period}</td>
      <td className="px-6 py-4 text-slate-600">{className}</td>
      <td className="px-6 py-4 text-slate-600">{subject}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Đã ghi sổ' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
        }`}>
          {status}
        </span>
      </td>
    </tr>
  )
}

export default App
