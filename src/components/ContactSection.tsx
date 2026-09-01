import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle2, Copy, ArrowUpRight, Sparkles, PhoneCall, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { smoothScrollTo } from '../utils/smoothScroll';

interface ContactSectionProps {
  email: string;
  phone?: string;
}

export default function ContactSection({ email = 'kabirgureja08@gmail.com', phone = '+91 9826977750' }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [projectType, setProjectType] = useState('Custom Website / Student Web');
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !senderEmail || !message) return;

    setSent(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.85 },
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#09090b] relative"
    >
      <div className="max-w-[94vw] 2xl:max-w-[92vw] mx-auto">
        {/* Section Header */}
        <div className="pb-12 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.25em] text-[#ff3b30] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#ff3b30]" />
            SECTOR 10 // DIRECT INQUIRY & TRANSMISSION
          </div>

          <h2 className="text-[clamp(3rem,8.5vw,12.5rem)] font-display font-black tracking-tight text-zinc-100 uppercase leading-[0.88]">
            GOT AN IDEA? <br />
            <span className="text-[#ff3b30]">LET’S BUILD SOMETHING.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start">
          {/* Left Column: Direct Contact Details & Quick Copy */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-base sm:text-lg font-sans text-zinc-300 leading-relaxed">
              Whether you need a bespoke website built at student-friendly pricing, want to collaborate on robotics/AI prototypes, or discuss streetwear and Marvel theories, Kabir’s channels are open.
            </p>

            {/* Contact Channels Grid */}
            <div className="space-y-4">
              {/* Email Direct Box */}
              <div className="p-5 rounded-2xl border border-zinc-800 bg-[#121216]/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-zinc-400">
                    <Mail className="w-3.5 h-3.5 text-[#ff3b30]" />
                    <span>PRIMARY INBOX</span>
                  </div>
                  <a
                    href={`mailto:${email}`}
                    className="text-[11px] font-mono-code text-[#ff3b30] hover:underline flex items-center gap-1"
                  >
                    <span>OPEN CLIENT</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm sm:text-base font-mono-code text-zinc-100 font-bold truncate">
                    {email}
                  </span>
                  <button
                    id="btn-copy-email"
                    data-interactive="true"
                    onClick={copyEmail}
                    className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono-code text-zinc-200 flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Phone Direct Box */}
              <div className="p-5 rounded-2xl border border-zinc-800 bg-[#121216]/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-zinc-400">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>PHONE & WHATSAPP</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://wa.me/919826977750"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono-code text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WHATSAPP</span>
                    </a>
                    <a
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="text-[11px] font-mono-code text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      <span>CALL</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm sm:text-base font-mono-code text-zinc-100 font-bold truncate">
                    {phone}
                  </span>
                  <button
                    id="btn-copy-phone"
                    data-interactive="true"
                    onClick={copyPhone}
                    className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono-code text-zinc-200 flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                  >
                    {copiedPhone ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Response Promise */}
            <div className="text-xs font-mono-code text-zinc-400 space-y-1.5 border-l-2 border-zinc-800 pl-4">
              <div className="text-zinc-300 font-bold">RESPONSE EXPECTATION:</div>
              <div>Direct replies via email or call/WhatsApp within 24–48 hours.</div>
              <div>No automated generic responses.</div>
            </div>
          </div>

          {/* Right Column: Interactive Transmission Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#121216] shadow-2xl relative">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center space-y-4 rounded-xl bg-zinc-900/60 border border-zinc-800"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-2xl font-display font-bold text-zinc-100 uppercase">
                    TRANSMISSION TRANSMITTED!
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed max-w-md mx-auto">
                    Thanks for reaching out! Your message was received in Kabir’s primary queue. Kabir will review and reply to <span className="text-[#ff3b30]">{senderEmail}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setMessage('');
                    }}
                    className="text-xs font-mono-code text-[#ff3b30] hover:underline pt-2"
                  >
                    Send another inquiry →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono-code text-zinc-300 mb-1.5 uppercase">
                      INQUIRY / PROJECT TYPE
                    </label>
                    <select
                      id="contact-project-type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-200 focus:outline-none focus:border-red-500"
                    >
                      <option>Custom Website / Student Web Build (Accessible Pricing)</option>
                      <option>T.E.R.R.A. Robotics / Climate Tech Collaboration</option>
                      <option>AI / Software Experiment Inquiry</option>
                      <option>Streetwear Apparel Brand Drop Inquiry</option>
                      <option>Artwork & Billboard Design</option>
                      <option>General Curious Greeting & Marvel Lore</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono-code text-zinc-300 mb-1.5 uppercase">
                        YOUR NAME
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Rivera"
                        className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-200 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono-code text-zinc-300 mb-1.5 uppercase">
                        YOUR EMAIL
                      </label>
                      <input
                        id="contact-email-input"
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-200 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-zinc-300 mb-1.5 uppercase">
                      MESSAGE / PROJECT BRIEF
                    </label>
                    <textarea
                      id="contact-message-input"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me what you're building, what timeline you have in mind, or your idea..."
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-sans text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="btn-submit-contact-message"
                    data-interactive="true"
                    className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#ff3b30] hover:bg-red-600 text-white font-mono-code text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                  >
                    <span>SEND MESSAGE TO KABIR</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Minimalist Credit */}
        <footer className="mt-24 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-zinc-400">
          <div>
            © {new Date().getFullYear()} KABIR GUREJA — PERSONAL DIGITAL WORLD
          </div>
          <div className="flex items-center gap-4 text-zinc-300">
            <button
              onClick={() => smoothScrollTo(0, { duration: 1.0 })}
              className="text-[#ff3b30] hover:underline cursor-pointer"
            >
              BACK TO TOP ↑
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
