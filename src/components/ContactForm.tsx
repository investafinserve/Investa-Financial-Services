"use client";

import { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        query: "",
        enquiryType: "Mutual Fund",
    });

    // UI States
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [validationErrors, setValidationErrors] = useState({ name: "", email: "", query: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Clear errors as user types
        setValidationErrors(prev => ({ ...prev, [name]: "" }));
        setStatus("idle");
        setMessage("");

        // Enforce max lengths during typing
        if (name === "name" && value.length > 50) return;
        if (name === "query" && value.length > 300) return;

        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { name: "", email: "", query: "" };

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        } else if (formData.name.length > 50) {
            newErrors.name = "Name must not exceed 50 characters";
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        if (!formData.query.trim()) {
            newErrors.query = "Query is required";
            isValid = false;
        } else if (formData.query.length > 300) {
            newErrors.query = "Query must not exceed 300 characters";
            isValid = false;
        }

        setValidationErrors(newErrors);
        return isValid;
    };

    const handlePreviewRequest = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setShowPreview(true);
        }
    };

    const handleFinalSubmit = async () => {
        setStatus("loading");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setMessage("Thank you! Your enquiry has been sent successfully.");
                setFormData({ name: "", email: "", query: "", enquiryType: "Mutual Fund" });
                setShowPreview(false);
            } else {
                setStatus("error");
                setMessage(data.message || "Failed to send message. Please try again later.");
                setShowPreview(false);
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus("error");
            setMessage("An unexpected error occurred. Please try again later.");
            setShowPreview(false);
        }
    };

    return (
        <section id="contact" className="relative mx-auto max-w-3xl px-4 py-12 md:py-16">
            <div className="glass p-8 md:p-12 rounded-3xl shadow-xl border border-white/60 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

                <div className="relative z-10 text-center space-y-4 mb-8">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-800">
                        Get in <span className="text-gradient from-blue-600 to-indigo-600">Touch</span>
                    </h2>
                    <p className="text-sm md:text-base text-slate-500 font-medium max-w-xl mx-auto">
                        Have questions about your investment journey? Fill out the form below and we'll get back to you shortly.
                    </p>
                </div>

                <form onSubmit={handlePreviewRequest} className="relative z-10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label htmlFor="name" className="text-xs font-bold text-slate-700 tracking-wider uppercase ml-1">Your Name</label>
                                <span className={`text-[10px] font-bold ${formData.name.length >= 50 ? 'text-red-500' : 'text-slate-400'}`}>{formData.name.length}/50</span>
                            </div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-white/70 border ${validationErrors.name ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:ring-indigo-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all outline-none font-medium placeholder:text-slate-400`}
                                placeholder="John Doe"
                            />
                            {validationErrors.name && <p className="text-xs text-red-500 font-bold ml-1">{validationErrors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-xs font-bold text-slate-700 tracking-wider uppercase ml-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 bg-white/70 border ${validationErrors.email ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:ring-indigo-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all outline-none font-medium placeholder:text-slate-400`}
                                placeholder="john@example.com"
                            />
                            {validationErrors.email && <p className="text-xs text-red-500 font-bold ml-1">{validationErrors.email}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="enquiryType" className="text-xs font-bold text-slate-700 tracking-wider uppercase ml-1">Wants to Enquire For</label>
                        <div className="relative">
                            <select
                                id="enquiryType"
                                name="enquiryType"
                                value={formData.enquiryType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 pr-12 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none font-medium text-slate-700 appearance-none cursor-pointer"
                            >
                                <option value="Mutual Fund">Mutual Fund</option>
                                <option value="Debt">Debt</option>
                                <option value="Gold">Gold</option>
                                <option value="Others">Others</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label htmlFor="query" className="text-xs font-bold text-slate-700 tracking-wider uppercase ml-1">Your Query</label>
                            <span className={`text-[10px] font-bold ${formData.query.length >= 300 ? 'text-red-500' : 'text-slate-400'}`}>{formData.query.length}/300</span>
                        </div>
                        <textarea
                            id="query"
                            name="query"
                            rows={4}
                            value={formData.query}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-white/70 border ${validationErrors.query ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:ring-indigo-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all outline-none font-medium placeholder:text-slate-400 resize-none`}
                            placeholder="How can we help you today?"
                        ></textarea>
                        {validationErrors.query && <p className="text-xs text-red-500 font-bold ml-1">{validationErrors.query}</p>}
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group"
                        >
                            Preview Submit
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>

                    {message && !showPreview && (
                        <div className={`p-4 rounded-xl text-center font-medium ${status === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>

            {/* Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-slide-up">
                        <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 p-6 text-center">
                            <h3 className="text-white font-black text-xl md:text-2xl tracking-tight">Confirm Enquiry</h3>
                            <p className="text-blue-200 text-xs md:text-sm font-medium mt-1">Please review your details before sending.</p>
                        </div>

                        <div className="p-6 md:p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</p>
                                    <p className="font-semibold text-slate-800 text-sm md:text-base truncate">{formData.name}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                                    <p className="font-semibold text-indigo-600 text-sm md:text-base truncate">{formData.email}</p>
                                </div>
                            </div>

                            <div className="border-b border-slate-100 pb-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enquiring For</p>
                                <span className="inline-block mt-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">{formData.enquiryType}</span>
                            </div>

                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Message</p>
                                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm text-slate-700 font-medium whitespace-pre-wrap max-h-40 overflow-y-auto custom-scrollbar">
                                    {formData.query}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 md:p-6 bg-slate-50 flex flex-col md:flex-row gap-3 border-t border-slate-200">
                            <button
                                onClick={() => setShowPreview(false)}
                                disabled={status === "loading"}
                                className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-100 hover:text-slate-800 transition-colors disabled:opacity-50"
                            >
                                Edit Details
                            </button>
                            <button
                                onClick={handleFinalSubmit}
                                disabled={status === "loading"}
                                className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20 transition-all flex justify-center items-center disabled:opacity-70"
                            >
                                {status === "loading" ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    "Confirm & Send"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
