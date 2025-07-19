'use client';

import { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    message: '',
    botField: '', // 👈 honeypot field
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [emailValid, setEmailValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'email') {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setEmailValid(isValid);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({
          name: '',
          email: '',
          phone: '',
          countryCode: '+91',
          message: '',
          botField: '',
        });
        setStatus('success');
      } else throw new Error();
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section className="min-h-screen px-6 md:px-20 py-24 bg-zinc-950 text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>
          <p className="text-center text-zinc-400 mb-10">
            Want to work together or just say hello? Fill the form or connect with me below.
          </p>

          <div className="flex justify-center gap-4 mb-10">
            <a href="https://github.com/AK-0017" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border border-zinc-700 hover:border-blue-500 text-white px-4 py-2 rounded-full transition">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/atharva-kulkarni-5321b2328/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border border-zinc-700 hover:border-blue-500 text-white px-4 py-2 rounded-full transition">
              <FaLinkedin /> LinkedIn
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field (invisible to users) */}
            <input
              type="text"
              name="botField"
              value={form.botField}
              onChange={handleChange}
              className="hidden"
              autoComplete="off"
              tabIndex={-1}
            />

            <div>
              <label className="block text-sm mb-1">Your Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Your Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className={`w-full bg-zinc-800 border px-4 py-2 rounded-lg text-sm focus:outline-none ${
                  emailValid ? 'border-zinc-700 focus:border-blue-500' : 'border-red-500'
                }`}
              />
              {!emailValid && (
                <p className="text-red-400 text-xs mt-1">Please enter a valid email address.</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Phone Number</label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleChange}
                  className="bg-zinc-800 border border-zinc-700 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{7,15}"
                  className="flex-1 bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || !emailValid}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-green-500 text-sm mt-2">✅ Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-sm mt-2">❌ Something went wrong. Try again.</p>
            )}
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
