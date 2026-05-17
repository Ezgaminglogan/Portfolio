"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";
import { sqliteImages } from "@/app/data";
import { Skeleton } from "@/components/ui/Skeleton";

export default function SqlitePortableSection({ isLoading }: { isLoading?: boolean }) {
  if (isLoading) {
    return (
      <section className="py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center mb-16 flex flex-col items-center">
          <Skeleton className="w-16 h-16 mb-6 rounded-full bg-white/10" />
          <Skeleton className="h-10 w-64 mb-4 bg-white/10" />
          <Skeleton className="h-5 w-full max-w-lg mb-2 bg-white/5" />
          <Skeleton className="h-5 w-4/5 max-w-md mb-8 bg-white/5" />
          <Skeleton className="h-14 w-40 rounded-full bg-white/10" />
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="sqlite-portable"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-32 border-t border-white/5"
    >
      <div className="max-w-3xl mx-auto text-center mb-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 mx-auto mb-6 relative"
        >
          <Image
            src="/image/sqlite-portables/SQLite-Portable.png"
            alt="SQLite Portable"
            fill
            className="object-contain"
          />
        </motion.div>
        <h2 className="text-4xl font-extrabold text-white tracking-tighter mb-4">
          SQLite Portable.
        </h2>
        <p className="text-zinc-400 text-lg mb-8">
          A lightweight SQLite database management desktop application
          featuring multiple language integrations and schema design tools.
        </p>
        <a
          href="https://www.mediafire.com/file/2pu0bqxgr979uam/SQLitePortableSetup.zip/file"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Download Now
        </a>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="overflow-hidden bg-zinc-950 shadow-2xl"
      >
        <ImageCarousel images={sqliteImages} autoplayInterval={5000} />
      </motion.div>
    </motion.section>
  );
}
