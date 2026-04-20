'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const asciiArt = [
    "████████╗███████╗ ██████╗██╗  ██╗██╗  ██╗███╗   ██╗ ██████╗ ████████╗███████╗",
    "╚══██╔══╝██╔════╝██╔════╝██║ ██╔╝██║ ██╔╝████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝",
    "   ██║   █████╗  ██║     █████╔╝ █████╔╝ ██╔██╗ ██║██║   ██║   ██║   ███████╗",
    "   ██║   ██╔══╝  ██║     ██╔═██╗ ██╔═██╗ ██║╚██╗██║██║   ██║   ██║   ╚════██║",
    "   ██║   ███████╗╚██████╗██║  ██╗██║  ██╗██║ ╚████║╚██████╔╝   ██║   ███████║",
    "   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝"
  ];

  const chars = "█▓▒░#@%&$*+=-:. "; 
  const [display, setDisplay] = useState<string[]>(asciiArt);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const contacts = [
    { label: 'Email', value: 'pranav.navghare@email.com', command: 'mail' },
    { label: 'GitHub', value: 'github.com/pranav-navghare', command: 'git' },
    { label: 'LinkedIn', value: 'linkedin.com/in/pranav-navghare', command: 'link' },
    { label: 'Phone', value: '+91 9356671329', command: 'num' },
    { label: 'Twitter', value: 'twitter.com/pranav-navghare', command: 'tweet' },
  ];

  const secretMessages = [
    "Konami Code Unlocked!",
    "Deep AI Modules Loaded",
    "Matrix Cheat Enabled",
    "Terminal Override Active",
    "System Integrity Verified",
  ];

  useEffect(() => {
    let iterations = 0;
    const maxIterations = 20; 
    const interval = setInterval(() => {
      setDisplay(asciiArt.map((line) =>
        line
          .split("")
          .map((ch) =>
            iterations < maxIterations
              ? (Math.random() > 0.5 ? chars[Math.floor(Math.random() * chars.length)] : ch)
              : ch
          )
          .join("")
      ));
      iterations++;
      if (iterations > maxIterations) clearInterval(interval);
    }, 80);

    // Animate terminal logs
    let logIndex = 0;
    const logs = [
      "Initializing network...",
      "Connecting to GitHub...",
      "Loading AI modules...",
      "Decrypting TECHKNOTS...",
      "Ready for commands"
    ];
    const logInterval = setInterval(() => {
      if (logIndex < logs.length) {
        setTerminalLogs(prev => [...prev, logs[logIndex]]);
        logIndex++;
      } else clearInterval(logInterval);
    }, 700);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, []);

  const handleContactClick = (contact: typeof contacts[0]) => {
    setCurrentCommand(contact.command);
    if (contact.command === 'mail') window.location.href = `mailto:${contact.value}`;
    else if (contact.command === 'num') window.location.href = `tel:${contact.value}`;
    else window.open(`https://${contact.value}`, '_blank');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setFormSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setFormSubmitted(false), 3000);
        } else {
          console.error('Error:', result.error);
          alert('Failed to send message: ' + result.error);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Error connecting to server. Please try again.');
      }
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 z-0 opacity-20 matrix-rain pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ASCII TECHKNOTS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <pre className="text-[10px] md:text-[18px] leading-none tracking-tight glow-text-green">
            {display.join("\n")}
          </pre>
          <p className="text-green-500 opacity-80 mt-2 text-sm flicker">
            Booting TECHKNOTS Terminal...
          </p>
        </motion.div>

        {/* Terminal Logs */}
        <div className="ascii-border p-6 mb-8 bg-black bg-opacity-90 border border-green-500">
          {terminalLogs.map((log, i) => (
            <div key={i} className="mono-font text-sm">{log}</div>
          ))}
        </div>

        {/* Contact Options */}
        <div className="space-y-4 mb-8">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.command}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 border border-green-500 hover:bg-green-500 hover:text-black transition-all cursor-pointer"
              onClick={() => handleContactClick(contact)}
            >
              <div className="flex items-center gap-4">
                <span className="text-xs glow-text-green">{contact.command}</span>
                <span className="text-sm">{contact.label}</span>
              </div>
              <span className="text-sm opacity-70">{contact.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ascii-border p-6 bg-black bg-opacity-90 border border-green-500 mb-8"
        >
          <div className="mono-font text-sm text-green-500 mb-4">
            &gt; SEND_MESSAGE.EXE
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-green-500 text-xs mb-2">NAME:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Enter your name"
                className="w-full bg-black border border-green-500 text-green-400 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-green-500 text-xs mb-2">EMAIL:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="your@email.com"
                className="w-full bg-black border border-green-500 text-green-400 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-green-500 text-xs mb-2">MESSAGE:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Type your message..."
                rows={4}
                className="w-full bg-black border border-green-500 text-green-400 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition-all text-sm font-mono"
            >
              SEND &gt;
            </button>
          </form>
          {formSubmitted && (
            <div className="mt-4 text-green-500 text-sm text-center glow-text-green">
              MESSAGE SENT! ✓
            </div>
          )}
        </motion.div>

        {/* Current Command Footer */}
        <div className="border-t border-green-500 pt-4">
          <div className="flex items-center gap-2 mono-font text-sm">
            <span>&gt;</span>
            <span>{currentCommand || "waiting for command..."}</span>
            <span className="blink">█</span>
          </div>
        </div>

        {/* Secret Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-6 text-center"
        >
          <div className="pixel-border p-4 bg-black bg-opacity-80 inline-block">
            <p className="pixel-font text-xs glow-text-green mb-2">
              SECRET UNLOCKED!
            </p>
            <p className="mono-font text-sm opacity-70">
              {secretMessages[Math.floor(Math.random() * secretMessages.length)]}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .glow-text-green {
          text-shadow: 0 0 8px #00ff00, 0 0 16px #00ff00;
        }
        .flicker {
          animation: flicker 2s infinite alternate;
        }
        .blink {
          animation: blink 1s step-start infinite;
        }
        @keyframes flicker {
          0% { opacity: 1; }
          50% { opacity: 0.8; }
          100% { opacity: 1; }
        }
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .matrix-rain::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0,255,0,0.05),
            rgba(0,255,0,0.05) 2px,
            transparent 2px,
            transparent 4px
          );
          animation: matrixMove 1s linear infinite;
        }
        @keyframes matrixMove {
          0% { background-position-y: 0; }
          100% { background-position-y: 100%; }
        }
      `}</style>
    </section>
  );
}
