"use client"
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Jane Doe", role: "CEO & Founder", image: "/team1.jpg" },
  { name: "John Smith", role: "Lead Developer", image: "/team2.jpg" },
  { name: "Lisa Ray", role: "Marketing Head", image: "/team3.jpg" },
];

const milestones = [
  { year: "2021", description: "We launched with a mission to humanize tech." },
  { year: "2022", description: "Grew our team and worked with 10+ brands." },
  { year: "2023", description: "Hit 1M users and expanded globally." },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className=" py-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center px-6"
        >
          <h1 className="text-5xl font-extrabold mb-4">We Build with Purpose</h1>
          <p className="text-xl opacity-90">
            Passionate people creating digital experiences that connect and inspire.
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }}
          className="max-w-4xl mx-auto prose prose-indigo text-center"
        >
          <h2 className="text-2xl font-extrabold mb-4">Our Story</h2>
          <p className="text-lg">
            What started as a tiny collective of builders in 2021 has become a global design and
            development company. We’ve helped ideas bloom into thriving startups, and scaled with
            companies that dare to dream bigger.
          </p>
        </motion.div>
      </section>

      {/* Milestones Timeline */}
      <section className="bg-gray-100 py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-10 text-center">Our Journey</h2>
          <ol className="relative border-l-4 border-[#0095D9] space-y-10 pl-6">
            {milestones.map((item, idx) => (
              <li key={idx}>
                <div className="absolute -left-3 w-6 h-6 bg-[#0095D9] rounded-full border-4 border-white"></div>
                <span className="text-[#0095D9] font-semibold text-xl">{item.year}</span>
                <p className="text-[#0095D9]/70 text-lg">{item.description}</p>
              </li>
            ))}
          </ol>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-10 sm:grid-cols-2">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#0095D9] text-white py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Let’s Work Together</h2>
          <p className="mb-8 text-lg">
            Ready to collaborate or have a question? We’d love to hear from you.
          </p>
          <Link
            href="mailto:contact@yourcompany.com"
            className="bg-white text-[#0095D9] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            contact@yourcompany.com
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
