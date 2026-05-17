"use client";
import { motion } from "framer-motion";
import { experiences } from "@/app/data";
import { Skeleton } from "@/components/ui/Skeleton";

export function ExperienceSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 w-full">
      <div className="sm:w-32 flex-shrink-0 pt-1">
        <Skeleton className="h-4 w-20 bg-white/5" />
      </div>
      <div className="flex-1 w-full">
        <Skeleton className="h-6 w-48 mb-3 bg-white/10" />
        <Skeleton className="h-4 w-32 mb-6 bg-white/5" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full bg-white/5" />
          <Skeleton className="h-4 w-11/12 bg-white/5" />
          <Skeleton className="h-4 w-4/5 bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection({ isLoading }: { isLoading?: boolean }) {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-32 border-t border-white/5"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="text-4xl font-extrabold text-white tracking-tighter">
            Timeline.
          </h2>
        </div>
        <div className="md:col-span-8 flex flex-col gap-12">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ExperienceSkeleton />
              </motion.div>
            ))
          ) : (
            experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-12 group"
              >
                <div className="sm:w-32 flex-shrink-0 text-zinc-500 text-sm pt-1">
                  {exp.period}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1 group-hover:text-zinc-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-4">{exp.company}</p>
                  <p className="text-zinc-500 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.section>
  );
}
