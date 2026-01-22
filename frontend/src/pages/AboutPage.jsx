import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCheck, Building2 } from "lucide-react";
import gsap from "gsap";

const teamMembers = [
  {
    name: "Vikram Singh",
    role: "Founder & CEO",
    bio: "Passionate about transforming the rental experience in India.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop",
  },
  {
    name: "Priya Kapoor",
    role: "Head of Operations",
    bio: "Ensuring seamless property management for all our clients.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
  },
  {
    name: "Rahul Mehta",
    role: "Tech Lead",
    bio: "Building the technology that powers InstaMakaan.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
  },
  {
    name: "Anita Sharma",
    role: "Customer Success",
    bio: "Dedicated to making every customer experience exceptional.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
  },
];

const tabContent = {
  who: {
    icon: Users,
    title: "We are the Architects of Rental Peace of Mind.",
    desc: "InstaMakaan is a team of experts dedicated to providing reliable rental experiences with transparency, efficiency, and care.",
  },
  what: {
    icon: Building2,
    title: "We Deliver Hassle-Free Rental Experiences.",
    desc: "We manage everything — tenants, maintenance, rent collection, inspections — allowing owners to enjoy stress-free income.",
  },
  how: {
    icon: UserCheck,
    title: "Technology Meets Human Touch.",
    desc: "We blend digital tools with personal support, ensuring reliability and transparency for every owner and tenant.",
  },
};

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("who");
  const content = tabContent[activeTab];

  useEffect(() => {
    gsap.from(".fade", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [activeTab]);

  return (
    <Layout>
    {/* HERO SECTION */}
    <div className="-mt-8 md:-mt-13"></div>
<section className="relative overflow-hidden pt-4 pb-20 md:pt-16 
bg-white dark:bg-[#07101d]
">
  {/* Floating Gradient Blob Left */}
  <div className="absolute -top-10 -left-20 w-72 h-72 bg-primary/25 dark:bg-primary/20 
    blur-3xl rounded-full animate-slowFloat"></div>

  {/* Floating Gradient Blob Right */}
  <div className="absolute top-10 -right-24 w-80 h-80 bg-accent/30 dark:bg-accent/25 
    blur-3xl rounded-full animate-slowFloatReverse"></div>

  {/* Subtle Particles */}
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <span
        key={i}
        className="absolute w-2 h-2 bg-white/40 dark:bg-white/10 rounded-full animate-particle"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${3 + Math.random() * 4}s`,
        }}
      />
    ))}
  </div>

  {/* Left Star */}
  <div className="absolute top-8 left-8 text-primary animate-rotateStar opacity-90">
    ⭐
  </div>

  {/* Right Star */}
  <div className="absolute top-14 right-10 text-accent animate-rotateStar opacity-80">
    ⭐
  </div>

  {/* Content */}
  <div className="container-custom relative text-center animate-heroFade">
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 
      bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
      About InstaMakaan
    </h1>

    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed fade-delayed">
      Our journey to redefine rentals and deliver real Sukoon.
    </p>

    {/* Glowing Bottom Bar Decoration */}
    <div className="mx-auto mt-8 w-40 h-1 rounded-full 
      bg-gradient-to-r from-primary to-accent opacity-70 animate-glowLine"></div>
  </div>
</section>

{/* HERO ANIMATIONS */}
<style>
{`
  @keyframes slowFloat {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    50% { transform: translateY(-20px) translateX(15px); }
  }
  .animate-slowFloat { animation: slowFloat 10s ease-in-out infinite; }

  @keyframes slowFloatReverse {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    50% { transform: translateY(20px) translateX(-15px); }
  }
  .animate-slowFloatReverse { animation: slowFloatReverse 11s ease-in-out infinite; }

  @keyframes particleMove {
    0% { transform: translateY(0) scale(1); opacity: 0.5; }
    50% { transform: translateY(-20px) scale(1.3); opacity: 0.9; }
    100% { transform: translateY(0) scale(1); opacity: 0.5; }
  }
  .animate-particle { animation: particleMove linear infinite; }

  @keyframes heroFade {
    from { opacity: 0; transform: translateY(25px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-heroFade { animation: heroFade 0.8s ease-out forwards; }

  @keyframes fadeDelayed {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-delayed { animation: fadeDelayed 1s ease-out forwards; animation-delay: 0.25s; }

  @keyframes rotateStar {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(12deg) scale(1.2); }
    100% { transform: rotate(0deg) scale(1); }
  }
  .animate-rotateStar { animation: rotateStar 4s ease-in-out infinite; }

  @keyframes glowLine {
    0%, 100% { opacity: 0.4; transform: scaleX(1); }
    50% { opacity: 1; transform: scaleX(1.2); }
  }
  .animate-glowLine { animation: glowLine 3s ease-in-out infinite; }
`}
</style>

      {/* TABS */}
      {/* TABS + CONTENT PREMIUM SECTION */}
<section className="py-20 relative bg-white dark:bg-[#07101d]">
  <div className="container-custom">

    {/* Tabs */}
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList
  className="w-full flex justify-center gap-4 
  bg-transparent border-none shadow-none p-0"
>

        <TabsTrigger
          value="who"
          className="px-6 py-3 rounded-xl font-semibold 
          data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 
          data-[state=active]:text-white shadow-md"
        >
          Who We Are
        </TabsTrigger>

        <TabsTrigger
          value="what"
          className="px-6 py-3 rounded-xl font-semibold 
          data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 
          data-[state=active]:text-white shadow-md"
        >
          What We Do
        </TabsTrigger>

        <TabsTrigger
          value="how"
          className="px-6 py-3 rounded-xl font-semibold 
          data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 
          data-[state=active]:text-white shadow-md"
        >
          How We Do It
        </TabsTrigger>

      </TabsList>
    </Tabs>

    {/* PREMIUM CONTENT */}
    <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">

      {/* LEFT VIDEO (Premium look like partner page) */}
      <div className="relative flex justify-center">

        {/* Glow BG */}
        <div className="absolute w-[360px] h-[420px] bg-gradient-to-br 
          from-teal-400/40 via-cyan-300/30 to-yellow-300/30 
          rounded-full blur-3xl animate-glow"></div>

        {/* Wave Line */}
        <svg
          className="absolute w-[500px] opacity-40 animate-wave"
          viewBox="0 0 400 200"
          fill="none"
        >
          <path
            d="M0 120 C80 30 160 210 240 120 320 30 400 150 400 150"
            stroke="#f9c31f"
            strokeWidth="22"
            strokeLinecap="round"
          />
        </svg>

        {/* Video */}
        <video
          key={activeTab}
          src={
            activeTab === "who"
              ? "/videos/Who.we.are.mp4"
              : activeTab === "what"
              ? "/videos/What.we.do.mp4"
              : "/videos/How.we.do.it.mp4"
          }
          autoPlay
          muted
          loop
          playsInline
          className="relative z-10 w-full max-w-xs rounded-2xl shadow-2xl"
        />
      </div>
      

      {/* RIGHT TEXT BLOCK */}
      <div
        className="relative p-6 rounded-2xl fade
        bg-gradient-to-br from-teal-50 via-white to-yellow-50
        dark:from-[#0f1f2e] dark:via-[#0b1220] dark:to-[#1a1405]
        shadow-xl"
      >
        {/* Floating Dots */}
        <span className="absolute top-6 left-6 w-3 h-3 bg-teal-400 rounded-full animate-icon"></span>
        <span className="absolute bottom-10 right-10 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-icon"></span>

        {/* Wave Line */}
        <svg
          className="absolute bottom-0 right-0 w-[300px] opacity-30 animate-wave"
          viewBox="0 0 400 200"
          fill="none"
        >
          <path
            d="M0 140 C120 60 240 220 400 120"
            stroke="#e4de29"
            strokeWidth="18"
            strokeLinecap="round"
          />
        </svg>

        {/* Icon */}
        <content.icon className="w-14 h-14 text-teal-500 mb-4" />

        <h2 className="text-2xl font-bold mb-4">{content.title}</h2>

        <p className="text-muted-foreground leading-relaxed text-lg">
          {content.desc}
        </p>
      </div>
    </div>

  </div>
</section>

{/* Animations */}
<style>
{`
@keyframes glowAnim { 
  0%,100% { opacity:.35; }
  50% { opacity:.7; }
}
.animate-glow { animation: glowAnim 6s ease-in-out infinite; }

@keyframes waveMove {
  0%,100% { transform: translateX(0); }
  50% { transform: translateX(30px); }
}
.animate-wave { animation: waveMove 10s ease-in-out infinite; }

@keyframes iconFloat {
  0%,100% { opacity:.6; transform: translateY(0); }
  50% { opacity:1; transform: translateY(-8px); }
}
.animate-icon { animation: iconFloat 4s ease-in-out infinite; }
`}
</style>

      {/* TEAM SECTION */}
      <section className="py-20 bg-slate-50 dark:bg-[#07101d]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 fade">
            Meet the InstaMakaan Family
          </h2>
          <p className="text-center text-muted-foreground mb-12 fade">
            The team bringing reliability, transparency, and Sukoon to rentals.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 fade">
            {teamMembers.map((member) => (
              <Card
                key={member.name}
                className="text-center shadow-lg border-0 bg-white dark:bg-[#0f172a] card-elevated"
              >
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      className="w-full h-full object-cover"
                      alt={member.name}
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;