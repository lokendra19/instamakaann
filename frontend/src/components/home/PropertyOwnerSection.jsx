import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/* ================= INLINE ANIMATIONS ================= */
const SectionAnimations = () => (
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
      50% { transform: translateX(28px); }
    }

    .animate-phone { animation: phoneFloat 4s ease-in-out infinite; }
    .animate-icon { animation: iconFloat 3.8s ease-in-out infinite; }
    .animate-glow { animation: glowAnim 6s ease-in-out infinite; }
    .animate-wave { animation: waveMove 10s ease-in-out infinite; }
  `}</style>
);

export const PropertyOwnerSection = () => {
	/* TEXT ANIMATION FIXED */
	useLayoutEffect(() => {
		gsap.set('.owner-text-anim', { opacity: 1 });

		gsap.from('.owner-text-anim', {
			scrollTrigger: {
				trigger: '.owner-text-anim',
				start: 'top 85%',
			},
			opacity: 0,
			y: 40,
			duration: 0.8,
			ease: 'power3.out',
		});
	}, []);

	return (
		<section className="py-16 md:py-24 bg-slate-50 dark:bg-[#0b1220]">
			<SectionAnimations />

			<div className="container-custom">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					{/* ================= LEFT — PHONE WITH PREMIUM ANIMATION ================= */}
					<div className="relative flex justify-center items-center">
						{/* GLOW BACKGROUND */}
						<div
							className="absolute w-[320px] h-[380px] bg-gradient-to-br 
              from-teal-400/40 via-cyan-300/30 to-yellow-300/30 
              rounded-full blur-3xl animate-glow"
						/>

						{/* WAVE */}
						<svg
							className="absolute w-[420px] opacity-40 animate-wave"
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

						{/* FLOAT ICON 1 */}
						<span
							className="absolute text-3xl font-bold text-teal-500 animate-icon"
							style={{ top: '-18px', left: '75%' }}
						>
							₹
						</span>

						{/* FLOAT ICON 2 */}
						<span
							className="absolute text-3xl font-bold text-teal-500 animate-icon"
							style={{ top: '82%', left: '-14px' }}
						>
							✓
						</span>

						{/* PHONE FRAME */}
						<div
							className="relative z-10 w-[200px] sm:w-[220px] md:w-[250px]
                aspect-[9/19] rounded-[34px] bg-neutral-900 shadow-2xl 
                animate-phone overflow-hidden border-[4px] border-neutral-700"
						>
							<video
								src="/videos/property-owner.mp4"
								autoPlay
								muted
								loop
								playsInline
								className="w-full h-full object-cover"
							/>

							<div
								className="absolute top-2 left-1/2 -translate-x-1/2 
                w-[90px] h-[24px] bg-black rounded-full"
							/>

							<div
								className="absolute bottom-2 left-1/2 -translate-x-1/2 
                w-20 h-1 bg-white/30 rounded-full"
							/>
						</div>
					</div>

					{/* ================= RIGHT — PREMIUM TEXT BLOCK ================= */}
					<div className="relative owner-text-anim overflow-hidden p-6 rounded-3xl z-[5] min-h-[380px]">
						{/* BACKGROUND GRADIENT */}
						<div
							className="absolute inset-0 -z-10 bg-gradient-to-br 
              from-teal-50 via-white to-yellow-50
              dark:from-[#0f1f2e] dark:via-[#0b1220] dark:to-[#1a1405]"
						/>

						{/* FLOATING DOT 1 */}
						<span className="absolute top-6 left-6 w-3 h-3 bg-teal-400 rounded-full animate-icon" />

						{/* FLOATING DOT 2 */}
						<span className="absolute bottom-10 right-10 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-icon" />

						{/* WAVE LINE */}
						<svg
							className="absolute bottom-0 right-0 w-[300px] opacity-30 animate-wave"
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

						<h2 className="text-3xl md:text-4xl font-bold mb-5">
							Are You a Property Owner?
						</h2>

						<p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
							InstaMakaan helps you convert your property into a predictable,
							high-earning asset with guaranteed monthly income.
						</p>

						<ul className="space-y-3 mb-6">
							{[
								'Guaranteed rental income every month',
								'Professional property management',
								'Verified & reliable tenants',
								'Zero-hassle maintenance',
							].map((f, i) => (
								<li key={i} className="flex gap-3">
									<CheckCircle2 className="text-teal-500 mt-1" />
									<span>{f}</span>
								</li>
							))}
						</ul>

						<Button variant="teal" size="lg" asChild>
							<Link to="/contact">
								Contact Us Now
								<ArrowRight className="ml-2 w-4 h-4" />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};
