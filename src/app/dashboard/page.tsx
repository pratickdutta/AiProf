"use client";

import { useState } from "react";
import Link from "next/link";
import { UploadCloud, FileText, Send, Sparkles, BookOpen, BrainCircuit } from "lucide-react";

export default function Dashboard() {
  const [isUploading, setIsUploading] = useState(false);
  const [prompt, setPrompt] = useState("");
  // Placeholder data for UI demonstration
  const [documents, setDocuments] = useState<{name: string, size: string}[]>([
    { name: "Biology_Chapter_4.pdf", size: "2.4 MB" },
    { name: "React_Hooks_Cheatsheet.md", size: "12 KB" }
  ]);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: "ai", content: "Hello! I'm AiProf. Upload a document or ask me a question about your current notes." }
  ]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          // Add successfully processed document to the list
          const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + " MB";
          setDocuments(prev => [...prev, { name: result.fileName, size: sizeStr }]);
          
          // Optionally add a system message to chat log
          setMessages(prev => [...prev, { 
            role: "ai", 
            content: `Successfully analyzed ${result.fileName}! (${result.textLength} characters extracted). I am ready to answer questions about it.` 
          }]);
        } else {
          alert("Error: " + result.error);
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("An error occurred while uploading.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    // Add User Message
    setMessages(prev => [...prev, { role: "user", content: prompt }]);
    setPrompt("");

    // Simulate AI thinking and response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: "This is a simulated response based on your notes. Once we connect the backend, I'll provide actual answers with citations!" 
      }]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-gray-100 overflow-hidden">
      
      {/* Sidebar: Upload & Docs Manager */}
      <aside className="w-80 border-r border-gray-800 bg-[#151f38] flex flex-col pt-8 pb-4 px-4 h-full relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        <Link href="/" className="flex items-center gap-2 mb-10 px-2 group cursor-pointer w-fit">
          <div className="bg-blue-600/20 p-2 rounded-lg group-hover:bg-blue-600/40 transition">
            <BrainCircuit className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-xl font-bold tracking-wide">Ai<span className="text-blue-400">Prof</span></span>
        </Link>

        {/* Upload Zone */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Knowledge Base</h2>
          <label className={`
            flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer
            transition-all duration-300 relative overflow-hidden
            ${isUploading ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800/30 hover:border-blue-500/50 hover:bg-gray-800/80'}
          `}>
            {isUploading ? (
              <div className="flex flex-col items-center animate-pulse">
                <Sparkles className="w-8 h-8 text-blue-400 mb-2" />
                <span className="text-sm font-medium text-blue-400">Processing...</span>
              </div>
            ) : (
              <>
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2 group-hover:text-blue-400 transition" />
                <span className="text-sm font-medium text-gray-300">Click to upload</span>
                <span className="text-xs text-gray-500 mt-1">PDF, DOCX, TXT</span>
              </>
            )}
            <input type="file" className="hidden" onChange={handleUpload} accept=".pdf,.txt,.md" />
          </label>
        </div>

        {/* Document List */}
        <div className="flex-1 overflow-y-auto min-h-0 space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-800">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2 sticky top-0 bg-[#151f38] py-2">Your Documents</h2>
          {documents.map((doc, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800 transition cursor-pointer group">
              <FileText className="w-5 h-5 text-purple-400 group-hover:text-blue-400 transition" />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-gray-200 truncate">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.size}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content: Chat / Q&A UI */}
      <main className="flex-1 flex flex-col relative bg-[#0f172a] h-full">
        {/* Glow effect */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />
        
        {/* Top Navigation / Action Bar */}
        <header className="h-16 border-b border-gray-800/60 bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0 z-10 sticky top-0">
          <div className="flex gap-6">
            <button className="text-sm font-semibold text-blue-400 border-b-2 border-blue-400 pb-5 translate-y-[10px]">Context Chat</button>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-300 pb-5 translate-y-[10px] transition">Auto Summaries</button>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-300 pb-5 translate-y-[10px] transition">Quizzes</button>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> AI is Active
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 z-10 scrollbar-thin scrollbar-thumb-gray-800">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex max-w-[80%] ${msg.role === 'user' ? 'ml-auto' : ''}`}>
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mr-3 mt-1 shrink-0">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
              )}
              <div className={`p-4 rounded-2xl leading-relaxed text-[15px] shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-gray-800/80 border border-gray-700/50 text-gray-200 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-6 bg-gradient-to-t from-[#0f172a] to-transparent shrink-0 z-10">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative group">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a question about your documents..."
              className="w-full bg-gray-800/50 border border-gray-700 text-gray-100 rounded-full pl-6 pr-14 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-lg backdrop-blur-sm"
            />
            <button 
              type="submit" 
              disabled={!prompt.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed group-focus-within:bg-blue-500"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
