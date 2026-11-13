import React, { useState } from 'react';
import { studioConfig } from '../data/studioData';
import {
  Film,
  Camera,
  Layers,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
} from 'lucide-react';

const PROJECT_TYPES = [
  'Film Production',
  'Photography',
  'Commercial Film',
  'Brand Films',
  'Fashion & Editorial',
  'Event Coverage',
  'Social Media Content',
  'Post Production',
  'Other',
];

const TIMELINES = [
  'ASAP',
  'Within 1â€“2 Weeks',
  'Within a Month',
  '1â€“3 Months',
  'Flexible',
];

const BUDGET_RANGES_INR = [
  'Under â‚¹50,000',
  'â‚¹50,000 â€“ â‚¹1,50,000',
  'â‚¹1,50,000 â€“ â‚¹3,50,000',
  'â‚¹3,50,000 â€“ â‚¹7,50,000',
  'â‚¹7,50,000 â€“ â‚¹15,00,000',
  'â‚¹15,00,000+',
];

const SERVICES_LIST = [
  {
    id: 'film',
    title: 'Film Production',
    subtitle: 'Commercials, Brand Films & Short Films',
    icon: Film,
    typeValue: 'Film Production',
  },
  {
    id: 'photo',
    title: 'Photography',
    subtitle: 'Products, Events & Creative Shoots',
    icon: Camera,
    typeValue: 'Photography',
  },
  {
    id: 'post',
    title: 'Post Production',
    subtitle: 'Editing, Color Grading & Visual Enhancement',
    icon: Layers,
    typeValue: 'Post Production',
  },
];

export default function ContactSection({ preselectedService }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: preselectedService || 'Film Production',
    timeline: 'Within a Month',
    budget: 'â‚¹1,50,000 â€“ â‚¹3,50,000',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingReference, setTrackingReference] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name or company.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 8) {
      errs.message = 'Please provide details about your project or vision.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const refId = `WK-INR-${Math.floor(Math.random() * 90000 + 10000)}`;
    setTrackingReference(refId);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      projectType: 'Film Production',
      timeline: 'Within a Month',
      budget: 'â‚¹1,50,000 â€“ â‚¹3,50,000',
      message: '',
    });
    setErrors({});
  };

  const handleServiceSelect = (serviceType) => {
    setFormData((prev) => ({ ...prev, projectType: serviceType }));
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 relative scroll-mt-20"
      aria-label="Contact and Project Brief"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Narrative & Service Cards                    */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              {/* Small Label */}
              <div className="inline-flex items-center gap-2 font-editorial text-xs uppercase tracking-[0.25em] text-[#B69A73] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B69A73]" />
                <span>LET&apos;S CREATE TOGETHER</span>
              </div>

              {/* Main Heading with Highlighted "Mind?" */}
              <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] mb-5">
                Have a Story
                <br />
                in <span className="text-[#B69A73]">Mind?</span>
              </h2>

              {/* Supporting Description */}
              <p className="font-ui text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
                Share your idea with us, and we&apos;ll bring it to life through powerful visuals and
                storytelling.
              </p>
            </div>

            {/* Three Professional Service Cards */}
            <div className="space-y-3.5">
              {SERVICES_LIST.map((srv) => {
                const IconComponent = srv.icon;
                const isSelected = formData.projectType === srv.typeValue;

                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => handleServiceSelect(srv.typeValue)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.08] border-[#B69A73] shadow-[0_10px_30px_rgba(182,154,115,0.18)]'
                        : 'bg-white/[0.03] border-white/[0.08] hover:border-[#B69A73]/50 hover:bg-white/[0.05]'
                    }`}
                    style={{
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Gold Outline Icon */}
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#B69A73] text-[#111111]'
                            : 'bg-white/[0.04] text-[#B69A73] border border-[#B69A73]/30 group-hover:border-[#B69A73]'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="flex flex-col">
                        <span className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#B69A73] transition-colors leading-snug">
                          {srv.title}
                        </span>
                        <span className="font-editorial text-xs text-[#94A3B8] leading-tight mt-0.5">
                          {srv.subtitle}
                        </span>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 text-slate-500 transition-all ${
                        isSelected
                          ? 'text-[#B69A73] translate-x-1'
                          : 'group-hover:text-[#B69A73] group-hover:translate-x-1'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Bottom Metadata Badges */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 font-ui text-xs text-[#94A3B8]">
              <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] px-3.5 py-2 rounded-xl backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-[#B69A73]" />
                <span>{studioConfig.location}</span>
              </div>

              <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] px-3.5 py-2 rounded-xl backdrop-blur-sm">
                <Clock className="w-3.5 h-3.5 text-[#B69A73]" />
                <span>Fast Response Â· Within 24 Hours</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Transparent Glassmorphism Enquiry Form     */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <div
              className="p-7 sm:p-10 rounded-[24px] border transition-all duration-300"
              style={{
                background: 'rgba(10, 15, 22, 0.52)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(182, 154, 115, 0.28)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.55)',
              }}
            >
              {isSubmitted ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-14 h-14 rounded-full bg-[#B69A73]/20 border border-[#B69A73]/40 text-[#B69A73] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    Brief Received.
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Our
                    production team has received your brief and will review feasibility within 24
                    business hours.
                  </p>

                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] max-w-xs mx-auto font-mono text-xs text-left">
                    <span className="text-[#94A3B8] block text-[10px] uppercase">
                      Tracking Reference
                    </span>
                    <span className="text-[#B69A73] font-bold text-sm tracking-wider">
                      {trackingReference}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-4 px-6 py-2.5 rounded-xl border border-white/15 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white hover:border-[#B69A73] transition-colors cursor-pointer"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Form Header */}
                  <div className="border-b border-white/[0.08] pb-4">
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                      Project Enquiry
                    </h3>
                    <p className="text-xs sm:text-sm font-ui text-slate-300 mt-1">
                      Tell us about your project, and we&apos;ll get back to you soon.
                    </p>
                  </div>

                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="enquiry-name"
                        className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        id="enquiry-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white font-ui text-sm focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-rose-500'
                            : 'border-white/[0.12] focus:border-[#B69A73]'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-400 font-ui flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-email"
                        className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        id="enquiry-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@brand.in"
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white font-ui text-sm focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-rose-500'
                            : 'border-white/[0.12] focus:border-[#B69A73]'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-400 font-ui flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Project Type (Full Width) */}
                  <div>
                    <label
                      htmlFor="enquiry-type"
                      className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Project Type
                    </label>
                    <select
                      id="enquiry-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white font-sans text-sm focus:outline-none focus:border-[#B69A73] transition-colors cursor-pointer"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-[#0c0e14] text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 3: Target Timeline & Budget Range (INR exclusively) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="enquiry-timeline"
                        className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2"
                      >
                        Target Timeline
                      </label>
                      <select
                        id="enquiry-timeline"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white font-sans text-sm focus:outline-none focus:border-[#B69A73] transition-colors cursor-pointer"
                      >
                        {TIMELINES.map((t) => (
                          <option key={t} value={t} className="bg-[#0c0e14] text-white">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-budget"
                        className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2"
                      >
                        Budget Range (Optional)
                      </label>
                      <select
                        id="enquiry-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white font-sans text-sm focus:outline-none focus:border-[#B69A73] transition-colors cursor-pointer"
                      >
                        {BUDGET_RANGES_INR.map((b) => (
                          <option key={b} value={b} className="bg-[#0c0e14] text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Project Details (Multiline Textarea) */}
                  <div>
                    <label
                      htmlFor="enquiry-message"
                      className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2"
                    >
                      Project Details *
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your idea, objectives, or any specific requirements..."
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white font-ui text-sm focus:outline-none transition-colors ${
                        errors.message
                          ? 'border-rose-500'
                          : 'border-white/[0.12] focus:border-[#B69A73]'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-400 font-ui flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Full-Width Champagne-Gold Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#B69A73] hover:bg-[#A88B63] text-[#111111] font-ui text-xs sm:text-sm uppercase tracking-[0.16em] font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_10px_30px_rgba(182,154,115,0.35)] cursor-pointer active:scale-98"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING BRIEF...</span>
                    ) : (
                      <>
                        <span>SUBMIT PROJECT ENQUIRY</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

