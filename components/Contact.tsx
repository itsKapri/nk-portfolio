import React, { useState } from 'react';
import { Mail, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import portfolioData from '../src/data/details.json';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { personal } = portfolioData;
  
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'NAME IS REQUIRED';
    if (!formData.email.trim()) newErrors.email = 'EMAIL IS REQUIRED';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'INVALID EMAIL FORMAT';
    if (!formData.message.trim()) newErrors.message = 'MESSAGE CANNOT BE EMPTY';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    
    // Reset status after a delay
    setTimeout(() => {
      setStatus('idle');
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" ref={ref} className="grid grid-cols-1 lg:grid-cols-12 border-b-4 border-black">
      <div className={`lg:col-span-5 p-8 md:p-16 border-r-0 lg:border-r-4 border-black bg-primary flex flex-col justify-between min-h-[400px] reveal-hidden ${isInView ? 'reveal-visible' : ''}`}>
        <div>
          <h2 className="text-6xl font-black text-white uppercase leading-none mb-8 tracking-tighter italic">
            Let's<br />Connect
          </h2>
          <p className="text-2xl font-bold text-white uppercase mb-12 leading-tight">
            Open for collaborations and architectural consulting.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-white group cursor-pointer">
            <Mail size={32} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
            <span className="font-black text-xl tracking-wide group-hover:underline decoration-4 decoration-white/30 underline-offset-4">{personal.email}</span>
          </div>
          <div className="flex items-center gap-4 text-white group cursor-pointer">
            <MapPin size={32} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
            <span className="font-black text-xl tracking-wide group-hover:underline decoration-4 decoration-white/30 underline-offset-4">{personal.location}</span>
          </div>
        </div>
      </div>
      <div className={`lg:col-span-7 p-8 md:p-16 bg-white reveal-hidden stagger-1 ${isInView ? 'reveal-visible' : ''}`}>
        {status === 'success' ? (
          <div className="h-full flex flex-col justify-center items-center text-center py-20 animate-fade-in-up">
            <CheckCircle2 size={80} className="text-black mb-6" strokeWidth={2.5} />
            <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter">Message Received</h3>
            <p className="text-xl font-bold text-primary uppercase max-w-md">
              Thanks for reaching out. I'll get back to you shortly.
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 px-8 py-3 bg-primary text-white font-black uppercase border-4 border-black brutalist-shadow"
            >
              Send Another
            </button>
          </div>
        ) : (
          <form className="space-y-8" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="name" className="font-black text-black uppercase text-sm tracking-widest">Full Name</label>
                  {errors.name && <span className="text-error font-bold text-xs uppercase animate-fade-in">{errors.name}</span>}
                </div>
                <input 
                  id="name"
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  disabled={status === 'submitting'}
                  className={`bg-transparent border-4 p-4 text-black font-bold brutalist-input placeholder:text-gray-400 ${errors.name ? 'error' : 'border-black'}`}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="email" className="font-black text-black uppercase text-sm tracking-widest">Email Address</label>
                  {errors.email && <span className="text-error font-bold text-xs uppercase animate-fade-in">{errors.email}</span>}
                </div>
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com" 
                  disabled={status === 'submitting'}
                  className={`bg-transparent border-4 p-4 text-black font-bold brutalist-input placeholder:text-gray-400 ${errors.email ? 'error' : 'border-black'}`}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline">
                <label htmlFor="message" className="font-black text-black uppercase text-sm tracking-widest">Project Details</label>
                {errors.message && <span className="text-error font-bold text-xs uppercase animate-fade-in">{errors.message}</span>}
              </div>
              <textarea 
                id="message"
                name="message"
                rows={5} 
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..." 
                disabled={status === 'submitting'}
                className={`bg-transparent border-4 p-4 text-black font-bold brutalist-input resize-none placeholder:text-gray-400 ${errors.message ? 'error' : 'border-black'}`}
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full py-6 bg-primary text-white text-2xl font-black uppercase border-4 border-black brutalist-shadow hover:bg-black transition-all flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;