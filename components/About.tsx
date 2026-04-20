'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchGitHubProfile, type GitHubUser } from '@/lib/github';

export default function About() {
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchGitHubProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  return (
    <section className="relative min-h-screen py-20 px-4 bg-[#0a0a0a] text-white overflow-hidden">
      {/* CRT + scanlines overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100%_4px] animate-scanlines" />
        <div className="absolute inset-0 shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.9)]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[40vh] flex items-center justify-center"
            >
              <div className="pixel-font text-xl glow-text-emerald blink">
                LOADING USER DATA...
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Title */}
              <div className="text-center">
                <h2 className="pixel-font text-3xl md:text-5xl glow-text-emerald mb-4">
                  WHO AM I?
                </h2>
                <div className="w-24 h-1 bg-emerald-400 mx-auto skill-bar" />
              </div>

              {/* Grid layout */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Avatar Section */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="pixel-border p-4 bg-emerald-500/10 inline-block mb-6">
                    <div className="w-48 h-48 mx-auto relative overflow-hidden">
                      <img
                        src="/images/profile.jpg"
                        alt={profile?.name || 'Profile'}
                        className="w-full h-full object-cover"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="pixel-font text-xl glow-text-emerald">
                      {profile?.name || 'DEVELOPER'}
                    </h3>
                    <p className="mono-font text-lg text-emerald-300/90">
                      @{profile?.login || 'annamalai2912'}
                    </p>
                    {profile?.location && (
                      <p className="mono-font text-emerald-200/80">📍 {profile.location}</p>
                    )}
                    {profile?.blog && (
                      <a
                        href={profile.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono-font text-sm text-emerald-400 underline hover:text-emerald-300"
                      >
                        🔗 {profile.blog}
                      </a>
                    )}
                  </div>
                </motion.div>

                {/* Bio Section */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="ascii-border p-6 bg-emerald-500/5"
                >
                  <div className="space-y-4">
                    <div className="mono-font text-sm opacity-80">&gt; cat about.txt</div>
                    <div className="mono-font text-lg leading-relaxed text-emerald-100/90">
                      {profile?.bio ||
                        'As a Data Science student specializing in AI/ML, I am actively learning to build intelligent systems using deep learning, NLP, robotics, and IoT technologies.'}
                    </div>
                    <div className="pt-4 border-t border-emerald-400/40 opacity-80">
                      <div className="flex flex-wrap gap-4 text-sm mono-font text-emerald-200/80">
                        <span>👥 {profile?.followers || 0} followers</span>
                        <span>📚 {profile?.public_repos || 0} repositories</span>
                        {profile?.company && <span>🏢 {profile.company}</span>}
                      </div>
                    </div>

                    {/* Quick links */}
                    <div className="flex flex-wrap gap-3 pt-4 text-sm">
                      <a
                        href={`https://github.com/${profile?.login}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-lg border border-emerald-400/50 bg-black/30 hover:bg-black/40 transition mono-font"
                      >
                        🐙 GitHub Profile
                      </a>
                      {profile?.twitter_username && (
                        <a
                          href={`https://twitter.com/${profile.twitter_username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-lg border border-emerald-400/50 bg-black/30 hover:bg-black/40 transition mono-font"
                        >
                          🐦 Twitter
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Skills preview area */}
              {/* Complete GitHub Profile README Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-20"
              >
                <h3 className="pixel-font text-2xl text-center glow-text-emerald mb-8">
                  PROFILE_README.MD
                </h3>
                
                {/* Terminal-style container */}
                <div className="max-w-6xl mx-auto">
                  <div className="ascii-border p-6 bg-emerald-500/5">
                    {/* Terminal header */}
                    <div className="mono-font text-sm text-emerald-400 mb-6">
                      &gt; cat README.md | display --matrix-style
                    </div>
                    
                    {/* Header & Title */}
                    <div className="text-center mb-8">
                      <h2 className="pixel-font text-xl glow-text-emerald mb-2">
                        DEEP LEARNING ENGINEER | NLP SPECIALIST | AI SOLUTIONS ARCHITECT
                      </h2>
                      <div className="mono-font text-emerald-300/90 text-sm leading-relaxed">
                        With 1 year of focused experience in AI/ML development and software engineering, 
                        I specialize in building intelligent systems that leverage cutting-edge deep learning, 
                        NLP, robotics, and IoT technologies.
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      <div className="ascii-border p-4 bg-black/30">
                        <div className="mono-font text-emerald-400 text-sm mb-2">🌍 LOCATION</div>
                        <div className="text-white">Based in India</div>
                      </div>
                      <div className="ascii-border p-4 bg-black/30">
                        <div className="mono-font text-emerald-400 text-sm mb-2">✉️ CONTACT</div>
                        <div className="text-emerald-300 text-sm">pranav.navghare@email.com</div>
                      </div>
                    </div>

                    {/* Current Focus */}
                    <div className="mb-8">
                      <h4 className="pixel-font text-lg glow-text-emerald mb-4">CURRENT_FOCUS.EXE</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="mono-font text-sm text-emerald-300/80">
                            🧠 Currently exploring <span className="text-emerald-400">LLMs, AI agents, MLOps</span>
                          </div>
                          <div className="mono-font text-sm text-emerald-300/80">
                            🤝 Open to collaborating on <span className="text-emerald-400">AI/ML projects, chatbots</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="mono-font text-sm text-emerald-300/80">
                            🔧 Working with <span className="text-emerald-400">robotics and IoT integrations</span>
                          </div>
                          <div className="mono-font text-sm text-emerald-300/80">
                            ⚡ Passionate about <span className="text-emerald-400">AI + robotics impact</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Core Expertise */}
                    <div className="mb-8">
                      <h4 className="pixel-font text-lg glow-text-emerald mb-4">CORE_EXPERTISE.JSON</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {/* AI & ML Skills */}
                        <div className="ascii-border p-3 bg-black/20 hover:bg-black/40 transition">
                          <div className="text-emerald-400 text-xs mb-2">🧠 AI & ML</div>
                          <div className="mono-font text-xs text-white space-y-1">
                            <div>PyTorch</div>
                            <div>TensorFlow</div>
                            <div>Transformers</div>
                            <div>Hugging Face</div>
                          </div>
                        </div>
                        
                        {/* Development */}
                        <div className="ascii-border p-3 bg-black/20 hover:bg-black/40 transition">
                          <div className="text-emerald-400 text-xs mb-2">💻 DEV</div>
                          <div className="mono-font text-xs text-white space-y-1">
                            <div>Python</div>
                            <div>JavaScript</div>
                            <div>React</div>
                            <div>Django</div>
                          </div>
                        </div>
                        
                        {/* Cloud & DevOps */}
                        <div className="ascii-border p-3 bg-black/20 hover:bg-black/40 transition">
                          <div className="text-emerald-400 text-xs mb-2">☁️ CLOUD</div>
                          <div className="mono-font text-xs text-white space-y-1">
                            <div>AWS</div>
                            <div>Docker</div>
                            <div>Kubernetes</div>
                            <div>MLflow</div>
                          </div>
                        </div>
                        
                        {/* IoT & Robotics */}
                        <div className="ascii-border p-3 bg-black/20 hover:bg-black/40 transition">
                          <div className="text-emerald-400 text-xs mb-2">🤖 IOT</div>
                          <div className="mono-font text-xs text-white space-y-1">
                            <div>Arduino</div>
                            <div>ROS</div>
                            <div>MQTT</div>
                            <div>Sensors</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Featured Projects */}
                    <div className="mb-8">
                      <h4 className="pixel-font text-lg glow-text-emerald mb-4">FEATURED_PROJECTS.PY</h4>
                      <div className="space-y-4">
                        <div className="ascii-border p-4 bg-black/20">
                          <div className="mono-font text-emerald-400 text-sm mb-2">def conversational_agent_project():</div>
                          <div className="mono-font text-xs text-emerald-300/80 ml-4 mb-2">
                            """Transformer-based conversational AI with 85% accuracy"""
                          </div>
                          <div className="mono-font text-xs text-white ml-4">
                            Technologies: PyTorch, Hugging Face Transformers, FastAPI
                          </div>
                        </div>
                        
                        <div className="ascii-border p-4 bg-black/20">
                          <div className="mono-font text-emerald-400 text-sm mb-2">def computer_vision_project():</div>
                          <div className="mono-font text-xs text-emerald-300/80 ml-4 mb-2">
                            """Real-time object detection optimized for edge devices"""
                          </div>
                          <div className="mono-font text-xs text-white ml-4">
                            Technologies: TensorFlow Lite, OpenCV, Raspberry Pi
                          </div>
                        </div>
                        
                        <div className="ascii-border p-4 bg-black/20">
                          <div className="mono-font text-emerald-400 text-sm mb-2">def iot_monitoring_project():</div>
                          <div className="mono-font text-xs text-emerald-300/80 ml-4 mb-2">
                            """End-to-end IoT solution with ML-powered insights"""
                          </div>
                          <div className="mono-font text-xs text-white ml-4">
                            Technologies: Arduino, MQTT, Time Series Analysis, Flask
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Technical Skills Icons */}
                    <div className="mb-8">
                      <h4 className="pixel-font text-lg glow-text-emerald mb-4">TECH_STACK.SVG</h4>
                      <div className="grid grid-cols-6 md:grid-cols-12 gap-3">
                        {[
                          { name: "Python", icon: "🐍" },
                          { name: "PyTorch", icon: "🔥" },
                          { name: "TensorFlow", icon: "🧠" },
                          { name: "React", icon: "⚛️" },
                          { name: "Docker", icon: "🐳" },
                          { name: "AWS", icon: "☁️" },
                          { name: "MongoDB", icon: "🍃" },
                          { name: "Git", icon: "📚" },
                          { name: "Linux", icon: "🐧" },
                          { name: "Arduino", icon: "🔧" },
                          { name: "OpenCV", icon: "👁️" },
                          { name: "FastAPI", icon: "⚡" }
                        ].map((tech, index) => (
                          <div key={index} className="text-center p-2 rounded border border-emerald-400/30 bg-black/20 hover:bg-black/40 transition">
                            <div className="text-lg mb-1">{tech.icon}</div>
                            <div className="mono-font text-xs text-white">{tech.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Current Learning */}
                    <div className="mb-8">
                      <h4 className="pixel-font text-lg glow-text-emerald mb-4">CURRENT_LEARNING.LOG</h4>
                      <div className="space-y-2">
                        {[
                          "Large Language Model Architectures & Fine-tuning",
                          "MLOps & Responsible AI Practices", 
                          "Advanced Robotics Integration with AI",
                          "Full-Stack AI Application Development",
                          "Edge AI & IoT Systems"
                        ].map((item, index) => (
                          <div key={index} className="mono-font text-sm text-emerald-300/80">
                            • Learning: <span className="text-emerald-400">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="mb-8">
                      <h4 className="pixel-font text-lg glow-text-emerald mb-4">CONNECT.SOCIAL</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <a href="https://github.com/pranav-navghare" target="_blank" className="ascii-border p-3 bg-black/20 hover:bg-black/40 transition text-center">
                          <div className="text-lg mb-1">🐙</div>
                          <div className="mono-font text-xs text-emerald-400">GitHub</div>
                        </a>
                        <a href="https://www.linkedin.com/in/pranav-navghare" target="_blank" className="ascii-border p-3 bg-black/20 hover:bg-black/40 transition text-center">
                          <div className="text-lg mb-1">💼</div>
                          <div className="mono-font text-xs text-emerald-400">LinkedIn</div>
                        </a>
                        <a href="https://www.x.com/pranav-navghare" target="_blank" className="ascii-border p-3 bg-black/20 hover:bg-black/40 transition text-center">
                          <div className="text-lg mb-1">🐦</div>
                          <div className="mono-font text-xs text-emerald-400">Twitter</div>
                        </a>
                        <a href="http://www.medium.com/@pranav-navghare" target="_blank" className="ascii-border p-3 bg-black/20 hover:bg-black/40 transition text-center">
                          <div className="text-lg mb-1">📝</div>
                          <div className="mono-font text-xs text-emerald-400">Medium</div>
                        </a>
                      </div>
                    </div>
                    {/* Footer Quote */}
                    <div className="text-center pt-6 border-t border-emerald-400/30">
                      <div className="mono-font text-emerald-400 text-sm">
                        &gt; "Transforming AI potential into real-world impact"
                      </div>
                      <div className="mono-font text-emerald-300/80 text-xs mt-2">
                        -- Deep Learning Engineer passionate about creating meaningful solutions --
                      </div>
                    </div>
                  </div>
                </div>
                
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .glow-text-emerald { text-shadow: 0 0 8px rgba(16,185,129,0.75), 0 0 20px rgba(16,185,129,0.35); }
        .pixel-font { font-family: 'Press Start 2P', ui-monospace, monospace; }
        .mono-font { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
        @keyframes scanlines { from { transform: translateY(0); } to { transform: translateY(4px); } }
        .animate-scanlines { animation: scanlines .12s linear infinite; }
        .blink { animation: blink 1.2s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </section>
  );
}
