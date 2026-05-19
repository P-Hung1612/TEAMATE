import React from 'react';
import { LessonForm } from './components/LessonForm';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans text-slate-800 py-12">
      {/* Premium glassmorphism background */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-300/30 rounded-full blur-[120px] mix-blend-multiply pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[800px] h-[800px] bg-indigo-300/20 rounded-full blur-[150px] mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[10%] w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-[100px] mix-blend-multiply pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <header className="mb-12 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 mb-4 tracking-tight">
            Kho Giáo Án
          </h1>
          <p className="text-slate-600 font-medium max-w-2xl text-lg">
            TEAMATE Plugin • Soạn thảo và lưu trữ kế hoạch bài dạy thông minh
          </p>
        </header>

        <main>
          <LessonForm />
        </main>
      </div>
    </div>
  );
}

export default App;
