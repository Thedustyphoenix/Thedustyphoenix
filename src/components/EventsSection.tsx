import { motion } from 'motion/react';

export default function EventsSection() {
  return (
    <section id="products" className="relative py-6 bg-purple-50/10 overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-purple-150/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-6">
          <div className="text-left">
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-purple-950 leading-tight">
              Events
            </h2>
          </div>
        </div>

        <div className="bg-white border border-purple-100/80 rounded-3xl py-4 sm:py-6 px-6 sm:px-12 text-center max-w-2xl mx-auto shadow-sm backdrop-blur-[2px]">
          <h4 className="font-display text-xl font-bold text-purple-950">No Scheduled Events</h4>
        </div>
      </div>
    </section>
  );
}
