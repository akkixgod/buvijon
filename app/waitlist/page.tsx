"use client";

import { useState } from "react";
import Link from "next/link";

// Uzbekistan cities data
const UZBEK_CITIES = [
  "Toshkent",
  "Samarqand",
  "Namangan",
  "Andijon",
  "Farg'ona",
  "Jizzax",
  "Sirdaryo",
  "Qashqadaryo",
  "Navoiy",
  "Buxoro",
  "Xiva",
  "Guliston",
  "Termiz",
  "Jizzax",
  "Qo'qon",
  "Qorqonpori",
  "Nukus",
  "Samarqand",
];

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    telegramUsername: "",
    gmail: "",
    city: "",
    agreed: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Save to localStorage
  const saveToLocalStorage = () => {
    const existingWaitlist = JSON.parse(localStorage.getItem('buvijon_waitlist') || '[]');
    existingWaitlist.push({
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem('buvijon_waitlist', JSON.stringify(existingWaitlist));
  };

  // Check if already registered
  const checkAlreadyRegistered = () => {
    const existing = JSON.parse(localStorage.getItem('buvijon_waitlist') || '[]');
    return existing.some((item: any) =>
      item.gmail === formData.gmail || item.telegramUsername === formData.telegramUsername
    );
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.telegramUsername.trim()) newErrors.telegramUsername = "Telegram username is required";
    if (!formData.gmail.trim() || !formData.gmail.includes("@gmail.com")) {
      newErrors.gmail = "Please enter a valid Gmail address";
    }
    if (!formData.city) newErrors.city = "Please select your city";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if already registered
    if (checkAlreadyRegistered()) {
      newErrors.gmail = "This email or Telegram username is already registered";
      setErrors(newErrors);
      return;
    }

    // Save to localStorage
    saveToLocalStorage();

    // Reset form
    setFormData({ fullName: "", telegramUsername: "", gmail: "", city: "", agreed: false });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blossom-pink to-pink-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-xl text-foreground">Buvijon</span>
          </Link>
          <Link
            href="/family"
            className="bg-blossom-pink text-white px-6 py-2.5 rounded-full font-medium hover:bg-blossom-pink-light transition-colors"
          >
            Family Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-b from-blossom-pink-pale/30 via-transparent to-blossom-pink-pale/50">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blossom-pink/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-blooming/5 rounded-full blur-3xl animate-float-reverse" />
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-warning/5 rounded-full blur-3xl animate-float-slow" />
        </div>

        <div className="relative z-10 w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-blossom-pink/10 border border-blossom-pink/20">
              <span className="text-sm font-medium text-blossom-pink">🌸 Join the Waitlist</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Be the First to Grow Together
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Join our waitlist for early access to Buvijon. App launches on{" "}
              <span className="font-semibold text-blossom-pink">May 15th at 12:00 PM</span>
            </p>
          </div>

          {/* Registration Form */}
          <div className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                    errors.fullName
                      ? "border-wilting focus:border-wilting"
                      : "border-border focus:border-blossom-pink"
                  } bg-surface`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-wilting">{errors.fullName}</p>
                )}
              </div>

              {/* Telegram Username */}
              <div>
                <label htmlFor="telegramUsername" className="block text-sm font-medium mb-2 text-foreground">
                  Telegram Username
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    @
                  </div>
                  <input
                    type="text"
                    id="telegramUsername"
                    value={formData.telegramUsername}
                    onChange={(e) => setFormData({ ...formData, telegramUsername: e.target.value })}
                    placeholder="username"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${
                      errors.telegramUsername
                        ? "border-wilting focus:border-wilting"
                        : "border-border focus:border-blossom-pink"
                    } bg-surface`}
                  />
                </div>
                {errors.telegramUsername && (
                  <p className="mt-1 text-sm text-wilting">{errors.telegramUsername}</p>
                )}
              </div>

              {/* Gmail */}
              <div>
                <label htmlFor="gmail" className="block text-sm font-medium mb-2 text-foreground">
                  Gmail Address
                </label>
                <input
                  type="email"
                  id="gmail"
                  value={formData.gmail}
                  onChange={(e) => setFormData({ ...formData, gmail: e.target.value })}
                  placeholder="yourname@gmail.com"
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                    errors.gmail
                      ? "border-wilting focus:border-wilting"
                      : "border-border focus:border-blossom-pink"
                  } bg-surface`}
                />
                {errors.gmail && <p className="mt-1 text-sm text-wilting">{errors.gmail}</p>}
              </div>

              {/* City Selection - Uzbekistan */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2 text-foreground">
                  City (Uzbekistan)
                </label>
                <select
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all bg-surface cursor-pointer ${
                    errors.city
                      ? "border-wilting focus:border-wilting"
                      : "border-border focus:border-blossom-pink"
                  }`}
                >
                  <option value="">Select your city</option>
                  {UZBEK_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="mt-1 text-sm text-wilting">{errors.city}</p>}
              </div>

              {/* Agreement Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreed"
                  checked={formData.agreed}
                  onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded border-border accent-blossom-pink cursor-pointer"
                />
                <label htmlFor="agreed" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  I agree to receive updates about Buvijon's launch and can change my mind anytime.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.agreed}
                className="premium-button w-full bg-blossom-pink text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formData.agreed ? "Join Waitlist 🌸" : "Please agree to continue"}
              </button>
            </form>

            {/* Back to Home */}
            <div className="text-center mt-6">
              <Link href="/" className="text-sm text-muted-foreground hover:text-blossom-pink transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Buvijon. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ for families in Uzbekistan</p>
        </footer>
      </main>
    </div>
  );
}
