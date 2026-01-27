import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserCheck, Building2 } from 'lucide-react';
import gsap from 'gsap';

const teamMembers = [
	{
		name: 'Vikram Singh',
		role: 'Founder & CEO',
		bio: 'Passionate about transforming the rental experience in India.',
		image:
			'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
	},
	{
		name: 'Priya Kapoor',
		role: 'Head of Operations',
		bio: 'Ensuring seamless property management for all our clients.',
		image:
			'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
	},
	{
		name: 'Rahul Mehta',
		role: 'Tech Lead',
		bio: 'Building the technology that powers InstaMakaan.',
		image:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
	},
	{
		name: 'Anita Sharma',
		role: 'Customer Success',
		bio: 'Dedicated to making every customer experience exceptional.',
		image:
			'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
	},
];

const tabContent = {
	who: {
		icon: Users,
		title: 'We are the Architects of Rental Peace of Mind.',
		desc: 'InstaMakaan is more than a managed rental company; we are a team of dedicated professionals passionate about bringing transparency, efficiency, and genuine Sukoon to the real estate market. Born from a frustration with traditional complexities, we built a service centered on your needs.',
	},
	what: {
		icon: Building2,
		title: 'We Deliver Hassle-Free Rental Experiences.',
		desc: 'We provide comprehensive property management solutions - from listing your property to finding verified tenants, managing rent collection, and handling maintenance. Our platform brings property owners and tenants together through transparency, trust, and technology-driven efficiency.',
	},
	how: {
		icon: UserCheck,
		title: 'Technology Meets Human Touch.',
		desc: 'We leverage cutting-edge technology - AI-powered matching, automated rent tracking, digital documentation - combined with personalized service from our expert team. Our platform provides real-time analytics, transparent reporting, and 24/7 support to ensure your property management experience is smooth and stress-free.',
	},
};

const AboutPage = () => {
	const [activeTab, setActiveTab] = useState('who');
	const content = tabContent[activeTab];

	return (
		<Layout>
			{/* ===================== HERO SECTION ===================== */}
			<section className="relative overflow-hidden min-h-[45vh] sm:min-h-[55vh] md:min-h-[70vh] flex items-center pt-16 sm:pt-20 pb-10 sm:pb-12 -mt-14 bg-white dark:bg-[#07101d]">
				{/* Background Image (NO CROP) */}
				<div
					className="absolute inset-0 bg-cover bg-[center_top] opacity-30 dark:opacity-20 scale-105"
					style={{ backgroundImage: "url('/images/about-hero.jpg')" }}
				></div>

				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/70 dark:from-[#07101d]/80 dark:via-[#07101d]/60 dark:to-[#07101d]/85"></div>

				{/* Content */}
				<div className="relative container-custom text-center px-4">
					<h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
						<span className="text-slate-900 dark:text-white">About </span>
						<span className="text-teal-500">Insta</span>
						<span className="text-yellow-500">Makaan</span>
					</h1>

					<p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
						Redefining how India experiences rental living — with trust,
						transparency, and real Sukoon.
					</p>

					<div className="mx-auto mt-6 w-28 sm:w-40 h-1 bg-gradient-to-r from-teal-500 to-yellow-400 rounded-full animate-glowLine"></div>
				</div>

				{/* Animations */}
				<style>{`
          @keyframes iconFloat {
            0%,100% { opacity:.6; transform: translateY(0); }
            50% { opacity:1; transform: translateY(-10px); }
          }
          .animate-icon { animation: iconFloat 4s ease-in-out infinite; }

          @keyframes waveMove {
            0%,100% { transform: translateX(0); }
            50% { transform: translateX(30px); }
          }
          .animate-wave { animation: waveMove 10s ease-in-out infinite; }

          @keyframes glowLine {
            0%,100% { opacity:.4; transform: scaleX(1); }
            50% { opacity:1; transform: scaleX(1.2); }
          }
          .animate-glowLine { animation: glowLine 3s ease-in-out infinite; }
        `}</style>
			</section>

			{/* ===================== TABS SECTION ===================== */}
			<section className="py-14 sm:py-16 md:py-20 relative bg-white dark:bg-[#07101d]">
				<div className="container-custom px-4">
					<Tabs value={activeTab} onValueChange={setActiveTab}>
						{/* ✅ MOBILE: ONE LINE SCROLLABLE (3 buttons in single row) */}
						<div className="sm:hidden w-full overflow-x-auto no-scrollbar hide-scroll-hint px-1">
							<TabsList
								className="
                  w-max min-w-full
                  flex items-center justify-start gap-2
                  bg-transparent border-none shadow-none p-0
                "
							>
								<TabsTrigger
									value="who"
									className="
                    h-9 px-4
                    rounded-full
                    font-semibold text-[12px]
                    whitespace-nowrap
                    border border-slate-200/70 dark:border-white/10
                    bg-white/95 dark:bg-white/5
                    text-slate-700 dark:text-slate-200
                    shadow-sm transition-all
                    focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
                    data-[state=active]:bg-teal-600
                    data-[state=active]:text-white
                    data-[state=active]:border-teal-600
                    data-[state=active]:shadow-md
                  "
								>
									Who We Are
								</TabsTrigger>

								<TabsTrigger
									value="what"
									className="
                    h-9 px-4
                    rounded-full
                    font-semibold text-[12px]
                    whitespace-nowrap
                    border border-slate-200/70 dark:border-white/10
                    bg-white/95 dark:bg-white/5
                    text-slate-700 dark:text-slate-200
                    shadow-sm transition-all
                    focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
                    data-[state=active]:bg-teal-600
                    data-[state=active]:text-white
                    data-[state=active]:border-teal-600
                    data-[state=active]:shadow-md
                  "
								>
									What We Do
								</TabsTrigger>

								<TabsTrigger
									value="how"
									className="
                    h-9 px-4
                    rounded-full
                    font-semibold text-[12px]
                    whitespace-nowrap
                    border border-slate-200/70 dark:border-white/10
                    bg-white/95 dark:bg-white/5
                    text-slate-700 dark:text-slate-200
                    shadow-sm transition-all
                    focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
                    data-[state=active]:bg-teal-600
                    data-[state=active]:text-white
                    data-[state=active]:border-teal-600
                    data-[state=active]:shadow-md
                  "
								>
									How We Do It
								</TabsTrigger>
							</TabsList>
						</div>

						{/* ✅ DESKTOP */}
						<div className="hidden sm:flex justify-center">
							<TabsList className="flex items-center justify-center gap-3 sm:gap-4 bg-transparent border-none shadow-none p-0">
								<TabsTrigger
									value="who"
									className="
                    h-11 sm:h-12 px-5 sm:px-7 rounded-full
                    font-semibold text-sm sm:text-base whitespace-nowrap
                    border border-slate-200/70 dark:border-white/10
                    bg-white/95 dark:bg-white/5
                    text-slate-700 dark:text-slate-200
                    shadow-sm transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
                    data-[state=active]:bg-teal-600
                    data-[state=active]:text-white
                    data-[state=active]:border-teal-600
                    data-[state=active]:shadow-md
                  "
								>
									Who We Are
								</TabsTrigger>

								<TabsTrigger
									value="what"
									className="
                    h-11 sm:h-12 px-5 sm:px-7 rounded-full
                    font-semibold text-sm sm:text-base whitespace-nowrap
                    border border-slate-200/70 dark:border-white/10
                    bg-white/95 dark:bg-white/5
                    text-slate-700 dark:text-slate-200
                    shadow-sm transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
                    data-[state=active]:bg-teal-600
                    data-[state=active]:text-white
                    data-[state=active]:border-teal-600
                    data-[state=active]:shadow-md
                  "
								>
									What We Do
								</TabsTrigger>

								<TabsTrigger
									value="how"
									className="
                    h-11 sm:h-12 px-5 sm:px-7 rounded-full
                    font-semibold text-sm sm:text-base whitespace-nowrap
                    border border-slate-200/70 dark:border-white/10
                    bg-white/95 dark:bg-white/5
                    text-slate-700 dark:text-slate-200
                    shadow-sm transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
                    data-[state=active]:bg-teal-600
                    data-[state=active]:text-white
                    data-[state=active]:border-teal-600
                    data-[state=active]:shadow-md
                  "
								>
									How We Do It
								</TabsTrigger>
							</TabsList>
						</div>
					</Tabs>

					{/* ✅ CONTENT ORDER FIX:
              Mobile: Heading -> Video -> Text
              Desktop: Video -> Text (as it was)
          */}
					<div className="mt-10 sm:mt-12 grid lg:grid-cols-2 gap-8 md:gap-10 items-center pb-24 sm:pb-10">
						{/* ✅ MOBILE HEADING FIRST */}
						<div className="block lg:hidden text-center">
							<h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
								{content.title}
							</h2>
						</div>

						{/* LEFT VIDEO */}
						<div className="relative flex justify-center order-2 lg:order-1">
							<div className="relative w-full max-w-[240px] sm:max-w-[320px] md:max-w-[380px]">
								<div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-teal-400/45 via-cyan-300/20 to-yellow-400/45 blur-2xl opacity-80" />

								<video
									key={activeTab}
									src={
										activeTab === 'who'
											? '/videos/Who.we.are.mp4'
											: activeTab === 'what'
												? '/videos/What.we.do.mp4'
												: '/videos/How.we.do.it.mp4'
									}
									autoPlay
									muted
									loop
									playsInline
									className="relative z-10 w-full rounded-3xl shadow-xl"
								/>
							</div>
						</div>

						{/* RIGHT TEXT */}
						<div
							className="relative p-5 sm:p-6 rounded-2xl fade
                bg-gradient-to-br from-teal-50 via-white to-yellow-50
                dark:from-[#0f1f2e] dark:via-[#0b1220] dark:to-[#1a1405]
                shadow-xl overflow-hidden order-3 lg:order-2"
						>
							<span className="absolute top-6 left-6 w-3 h-3 bg-teal-400 rounded-full animate-icon"></span>
							<span className="absolute bottom-10 right-10 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-icon"></span>

							<svg
								className="absolute bottom-0 right-0 w-[240px] sm:w-[300px] opacity-30 animate-wave"
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

							<content.icon className="w-12 h-12 sm:w-14 sm:h-14 text-teal-500 mb-4" />

							{/* ✅ DESKTOP ONLY HEADING HERE */}
							<h2 className="hidden lg:block text-2xl sm:text-3xl font-bold mb-4 leading-tight">
								{content.title}
							</h2>

							<p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
								{content.desc}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ===================== TEAM SECTION ===================== */}
			<section className="py-14 sm:py-16 md:py-20 bg-slate-50 dark:bg-[#07101d]">
				<div className="container-custom px-4">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 fade">
						Meet the InstaMakaan Family
					</h2>
					<p className="text-center text-muted-foreground mb-10 sm:mb-12 fade">
						The team bringing reliability, transparency, and Sukoon to rentals.
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 fade">
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

			{/* ✅ EXTRA CSS (ONLY for mobile tabs scroll line remove) */}
			<style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* ✅ stops the scroll hint / weird line under tabs on mobile */
        .hide-scroll-hint {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-x: contain;
          scrollbar-gutter: stable both-edges;
        }
      `}</style>
		</Layout>
	);
};

export default AboutPage;
