import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/* ================= HERO SLIDES ================= */
const heroSlides = [
	{
		headline: 'End the Renting Headaches. Discover True Rental Sukoon.',
		image: '/images/owner-1.jpg',
	},
	{
		headline: 'Predictable Income, Guaranteed Peace of Mind.',
		image: '/images/owner-2.jpg',
	},
	{
		headline: 'We Handle It All, You Enjoy the Returns.',
		image: '/images/owner-3.jpg',
	},
	{
		headline: "Unlock Your Property's Full Potential.",
		image: '/images/owner-4.jpg',
	},
];

/* ================= SERVICES ================= */
const services = [
	{
		id: 'payment',
		headline: 'Never Chase Rent Again, Ever .',
		video: '/videos/rent.mp4',
		features: [
			'Automated reminders & follow-ups.',
			'Guaranteed monthly payouts.',
			'No rent delays.',
			'Transparent statements.',
		],
		cta: 'Learn More About Rent Collection',
		floatIcons: ['₹', '✓'],
	},
	{
		id: 'tenant',
		headline: 'The Right Tenant, Every Time.',
		video: '/videos/tenant.mp4',
		features: [
			'Rigorous KYC & background checks.',
			'Behavioral screening.',
			'Fast tenant placement.',
			'Wide verified network.',
		],
		cta: 'Contact Us for Tenant Screening',
		floatIcons: ['✓', '✓'],
	},
	{
		id: 'income',
		headline: 'Maximize Your Earning Potential.',
		video: '/videos/income.mp4',
		features: [
			'Full occupancy promise.',
			'Optimized rental pricing.',
			'Asset protection.',
			'100% transparency.',
		],
		cta: 'Get Your Personalized Plan',
		floatIcons: ['₹', '₹'],
	},
];

/* ================= INLINE ANIMATIONS ================= */
const PageAnimations = () => (
	<style>{`
    @keyframes phoneFloat {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }
    @keyframes iconFloat {
      0%,100% { opacity:.6; transform: translateY(0); }
      50% { opacity:1; transform: translateY(-10px); }
    }
    @keyframes glowAnim {
      0%,100% { opacity:.35; }
      50% { opacity:.7; }
    }
    @keyframes waveMove {
      0%,100% { transform: translateX(0); }
      50% { transform: translateX(30px); }
    }

    .animate-phone { animation: phoneFloat 4s ease-in-out infinite; }
    .animate-icon { animation: iconFloat 4s ease-in-out infinite; }
    .animate-glow { animation: glowAnim 6s ease-in-out infinite; }
    .animate-wave { animation: waveMove 10s ease-in-out infinite; }
  `}</style>
);

const PartnerPage = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	/* HERO AUTO SLIDER */
	useEffect(() => {
		const i = setInterval(
			() => setCurrentSlide((p) => (p + 1) % heroSlides.length),
			4500,
		);
		return () => clearInterval(i);
	}, []);

	/* GSAP – TEXT ONLY */
	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.utils.toArray('.text-anim').forEach((el) => {
				gsap.from(el, {
					scrollTrigger: {
						trigger: el,
						start: 'top 80%',
					},
					opacity: 0,
					y: 50,
					scale: 0.97,
					duration: 0.9,
					ease: 'power3.out',
				});
			});
		});
		return () => ctx.revert();
	}, []);

	return (
		<Layout>
			<PageAnimations />

			{/* ================= HERO ================= */}
			<section className="relative min-h-screen overflow-hidden -mt-14">
				<div
					className="absolute inset-0 bg-cover bg-center scale-110 "
					style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90 dark:from-[#0b1220]/90 dark:via-[#0b1220]/85 dark:to-[#0b1220]/95 " />

				<div className="relative z-10 min-h-screen flex items-center justify-center text-center px-4 sm:px-6">
					<div className="max-w-5xl">
						<h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-teal-500 dark:text-white whitespace-normal sm:whitespace-nowrap leading-tight">
							Are You a Property{' '}
							<span className="text-yellow-500 dark:text-teal-400 font-bold ml-2">
								Owner?
							</span>
						</h1>

						<h2 className="text-2xl sm:text-2xl md:text-3xl mb-4 mt-6 text-gray-700">
							{heroSlides[currentSlide].headline}
						</h2>

						<p className="text-lg text-muted-foreground mb-8">
							{heroSlides[currentSlide].description}
						</p>

						<Button variant="yellow" size="lg" asChild>
							<Link to="/contact">Partner With Us</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* ================= SERVICES ================= */}
			{services.map((service) => (
				<section
					key={service.id}
					className="py-14 md:py-20 bg-slate-50 dark:bg-[#0f172a]"
				>
					<div className="container-custom">
						<Card className="relative rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-[#0b1220]">
							<CardContent className="grid md:grid-cols-2 gap-8 md:gap-10 items-center p-4 sm:p-6 md:p-10">
								{/* ================= MOBILE ONLY ORDER (Heading -> Video -> Text) ================= */}
								<div className="md:hidden space-y-5">
									{/* ✅ HEADING FIRST */}
									<h3 className="text-[18px] text-center font-extrabold whitespace-nowrap text-slate-900 dark:text-white">
										{service.headline}
									</h3>

									{/* ✅ VIDEO SECOND */}
									<div className="relative flex justify-center items-center w-full py-2">
										{/* Glow */}
										<div className="absolute w-[240px] h-[280px] bg-gradient-to-br from-teal-400/40 via-cyan-300/30 to-yellow-300/30 rounded-full blur-3xl animate-glow" />

										{/* Wave */}
										<svg
											className="absolute w-[320px] opacity-40 animate-wave"
											viewBox="0 0 400 200"
											fill="none"
										>
											<path
												d="M0 120 C80 30 160 210 240 120 320 30 400 150 400 150"
												stroke="#32d1c0"
												strokeWidth="22"
												strokeLinecap="round"
											/>
										</svg>

										{/* Floating Icons */}
										{service.floatIcons.map((ic, i) => (
											<span
												key={i}
												className="absolute text-2xl font-bold text-teal-500 animate-icon"
												style={{
													top: i === 0 ? '-10px' : '82%',
													left: i === 0 ? '75%' : '-8px',
												}}
											>
												{ic}
											</span>
										))}

										{/* Phone */}
										<div className="relative z-10 w-[210px] aspect-[9/19] rounded-[38px] shadow-2xl overflow-hidden animate-phone">
											<video
												src={service.video}
												autoPlay
												muted
												loop
												playsInline
												className="w-full h-full object-cover"
											/>
										</div>
									</div>

									{/* ✅ TEXT LAST */}
									<div className="relative text-anim overflow-hidden rounded-3xl p-5 w-full">
										<div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-50 via-white to-yellow-50 dark:from-[#0f1f2e] dark:via-[#0b1220] dark:to-[#1a1405]" />

										<span className="absolute top-6 left-6 w-3 h-3 bg-teal-400 rounded-full animate-icon" />
										<span className="absolute bottom-10 right-10 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-icon" />

										<svg
											className="absolute -z-10 bottom-0 right-0 w-[260px] opacity-30 animate-wave"
											viewBox="0 0 400 200"
											fill="none"
										>
											<path
												d="M0 140 C120 60 240 220 400 120"
												stroke="#2dd4bf"
												strokeWidth="18"
												strokeLinecap="round"
											/>
										</svg>

										<ul className="space-y-3 mb-6">
											{service.features.map((f, i) => (
												<li key={i} className="flex gap-3">
													<CheckCircle2 className="text-teal-500 mt-1" />
													<span>{f}</span>
												</li>
											))}
										</ul>

										<Button variant="teal" asChild className="w-full">
											<Link to="/contact" className="justify-center">
												{service.cta}
												<ArrowRight className="ml-2 w-4 h-4" />
											</Link>
										</Button>
									</div>
								</div>

								{/* ================= DESKTOP ONLY (Old UI SAME) ================= */}
								<>
									{/* PHONE / VIDEO */}
									<div className="hidden md:flex relative justify-center items-center">
										<div className="absolute w-[260px] h-[320px] sm:w-[360px] sm:h-[440px] bg-gradient-to-br from-teal-400/40 via-cyan-300/30 to-yellow-300/30 rounded-full blur-3xl animate-glow" />

										<svg
											className="absolute w-[360px] sm:w-[500px] opacity-40 animate-wave"
											viewBox="0 0 400 200"
											fill="none"
										>
											<path
												d="M0 120 C80 30 160 210 240 120 320 30 400 150 400 150"
												stroke="#32d1c0"
												strokeWidth="22"
												strokeLinecap="round"
											/>
										</svg>

										{service.floatIcons.map((ic, i) => (
											<span
												key={i}
												className="absolute text-3xl font-bold text-teal-500 animate-icon"
												style={{
													top: i === 0 ? '-18px' : '82%',
													left: i === 0 ? '75%' : '-14px',
												}}
											>
												{ic}
											</span>
										))}

										<div className="relative z-10 w-[210px] xs:w-[230px] sm:w-[260px] md:w-[300px] aspect-[9/19] rounded-[40px] sm:rounded-[45px] shadow-2xl animate-phone overflow-hidden">
											<video
												src={service.video}
												autoPlay
												muted
												loop
												playsInline
												className="w-full h-full object-cover"
											/>
										</div>
									</div>

									{/* TEXT */}
									<div className="hidden md:block relative text-anim overflow-hidden rounded-3xl p-5 w-full max-w-none">
										<div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-50-50 via-white to-yellow-50 dark:from-[#0f1f2e] dark:via-[#0b1220] dark:to-[#1a1405]" />

										<span className="absolute top-6 left-6 w-3 h-3 bg-teal-400 rounded-full animate-icon" />
										<span className="absolute bottom-10 right-10 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-icon" />

										<svg
											className="absolute -z-10 bottom-0 right-0 w-[320px] opacity-30 animate-wave"
											viewBox="0 0 400 200"
											fill="none"
										>
											<path
												d="M0 140 C120 60 240 220 400 120"
												stroke="#2dd4bf"
												strokeWidth="18"
												strokeLinecap="round"
											/>
										</svg>

										<h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-5 sm:mb-6 whitespace-normal">
											{service.headline}
										</h3>

										<ul className="space-y-3 mb-6">
											{service.features.map((f, i) => (
												<li key={i} className="flex gap-3">
													<CheckCircle2 className="text-teal-500 mt-1" />
													<span>{f}</span>
												</li>
											))}
										</ul>

										<Button variant="teal" asChild>
											<Link to="/contact">
												{service.cta}
												<ArrowRight className="ml-2 w-4 h-4" />
											</Link>
										</Button>
									</div>
								</>
							</CardContent>
						</Card>
					</div>
				</section>
			))}

			{/* ================= PARTNER TESTIMONIALS ================= */}
			<section className="py-16 sm:py-20 bg-white dark:bg-[#0b1220]">
				<div className="container-custom">
					<div className="text-center mb-10 sm:mb-14">
						<h2 className="text-3xl sm:text-4xl font-extrabold text-teal-600 dark:text-teal-400">
							What Our Partners Say
						</h2>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						<Card className="rounded-3xl border-0 shadow-card bg-white dark:bg-[#0f172a]">
							<CardContent className="p-6">
								<div className="flex gap-1 mb-4">
									<span className="text-yellow-400">★</span>
									<span className="text-yellow-400">★</span>
									<span className="text-yellow-400">★</span>
									<span className="text-yellow-400">★</span>
									<span className="text-yellow-400">★</span>
								</div>

								<p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
									"InstaMakaan has transformed how I do business. The verified
									leads are genuine and the commission structure is crystal
									clear."
								</p>

								<div className="mt-6">
									<p className="font-semibold text-slate-900 dark:text-white">
										Rajesh Kumar
									</p>
									<p className="text-sm text-slate-500 dark:text-slate-400">
										Property Agent, Noida
									</p>
								</div>
							</CardContent>
						</Card>

						<Card className="rounded-3xl border-0 shadow-card bg-white dark:bg-[#0f172a]">
							<CardContent className="p-6">
								<div className="flex gap-1 mb-4">
									<span className="text-yellow-400">★</span>
									<span className="text-yellow-400">★</span>
									<span className="text-yellow-400">★</span>
									<span className="text-yellow-400">★</span>
									<span className="text-yellow-400">★</span>
								</div>

								<p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
									"The dashboard is incredibly easy to use and I love how
									professional the entire process is. Highly recommend!"
								</p>

								<div className="mt-6">
									<p className="font-semibold text-slate-900 dark:text-white">
										Priya Sharma
									</p>
									<p className="text-sm text-slate-500 dark:text-slate-400">
										Real Estate Broker, Gurgaon
									</p>
								</div>
							</CardContent>
						</Card>

						<Card className="rounded-3xl border-0 shadow-card bg-white dark:bg-[#0f172a]">
							<CardContent className="p-6">
								<div className="flex gap-1 mb-4">
									<span className="text-yellow-400">★</span>
									<span className="text-yellow-400">★</span>
									<span className="text-yellow-400">★</span>
									<span className="text-yellow-400">★</span>
									<span className="text-yellow-400">★</span>
								</div>

								<p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
									"Best decision for our business. The support team is amazing
									and we have seen 3x growth in our listings."
								</p>

								<div className="mt-6">
									<p className="font-semibold text-slate-900 dark:text-white">
										Amit Verma
									</p>
									<p className="text-sm text-slate-500 dark:text-slate-400">
										Developer Partner, Greater Noida
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default PartnerPage;
