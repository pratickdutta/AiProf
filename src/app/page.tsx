import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20 relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />

      <main className="flex flex-col gap-8 items-center text-center max-w-4xl z-10">
        
        <div className="space-y-4 animate-fade-in">
          <div className="inline-flex items-center rounded-full border border-gray-700/50 bg-gray-800/50 px-3 py-1 text-sm font-medium text-gray-300 backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            v1.0 is now in development
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
            Meet <span className="text-gradient">AiProf</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Your personal, context-aware AI tutor. Upload your notes, ask questions, and spark your understanding.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in animate-delay-100">
          <Link 
            href="/dashboard"
            className="rounded-full bg-blue-600 text-white px-8 py-4 text-lg font-semibold hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]"
          >
            Get Started Free
          </Link>
          <Link
            href="#features"
            className="rounded-full border border-gray-700 bg-gray-800/50 px-8 py-4 text-lg font-medium hover:bg-gray-700 transition-all backdrop-blur-sm"
          >
            See how it works
          </Link>
        </div>

        {/* Feature Highlights */}
        <div id="features" className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 w-full animate-fade-in animate-delay-200">
          {[
            {
              title: "Context-Aware Q&A",
              desc: "Ask the AI anything. It answers strictly based on your uploaded materials, reducing hallucinations.",
              icon: "🧠"
            },
            {
              title: "Auto Summaries",
              desc: "Generate concise or detailed summaries to grasp complex topics in minutes.",
              icon: "📝"
            },
            {
              title: "Smart Quizzes",
              desc: "Automatically generate MCQs to test your knowledge and track your progress.",
              icon: "🧪"
            }
          ].map((feature, i) => (
            <div 
              key={i} 
              className="p-6 rounded-2xl border border-gray-800 bg-gray-800/20 backdrop-blur-md hover:bg-gray-800/40 transition-all flex flex-col items-start text-left gap-4 hover:-translate-y-1"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-100">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
