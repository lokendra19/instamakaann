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
	/* ================= GSAP ================= */
	useLayoutEffect(() => {
		gsap.set('.owner-text-anim', { opacity: 1, y: 0 });

		gsap.from('.owner-text-anim', {
			scrollTrigger: {
				trigger: '.owner-text-anim',
				start: 'top 85%',
				toggleActions: 'play none none none',
			},
			opacity: 0,
			y: 50,
			duration: 0.9,
			ease: 'power3.out',
		});
	}, []);

	return (
		<section className="py-20 md:py-28 bg-slate-50 dark:bg-[#0b1220]">
			<SectionAnimations />

			{/* ✅ ONLY CHANGE: owner-wide added */}
			<div className="container-custom owner-wide">
				<div className="flex flex-col lg:flex-row items-center gap-10">
					{/* ================= LEFT — PHONE ================= */}
					<div className="relative flex justify-center lg:justify-start w-full lg:w-[38%]">
						<div
							className="absolute w-[360px] h-[440px] bg-gradient-to-br 
              from-teal-400/40 via-cyan-300/30 to-yellow-300/30 
              rounded-full blur-3xl animate-glow"
						/>

						<svg
							className="absolute w-[500px] opacity-40 animate-wave"
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

						<span
							className="absolute text-3xl font-bold text-teal-500 animate-icon"
							style={{ top: '-20px', left: '78%' }}
						>
							₹
						</span>

						<span
							className="absolute text-3xl font-bold text-teal-500 animate-icon"
							style={{ top: '85%', left: '-18px' }}
						>
							✓
						</span>

						<div
							className="
    relative z-10
    w-[230px] sm:w-[260px] md:w-[300px]
    aspect-[9/19]
    rounded-[38px]
    bg-neutral-900
    shadow-2xl
    animate-phone
    overflow-hidden
    border-[4px] border-neutral-700
  "
						>
							<video
								src="/videos/property-owner.mp4"
								autoPlay
								muted
								loop
								playsInline
								className="w-full h-full object-cover"
							/>
							<div className="absolute top-2 left-1/2 -translate-x-1/2 w-[92px] h-[26px] bg-black rounded-full" />
							<div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
						</div>
					</div>

					{/* ================= RIGHT — TEXT ================= */}
					<div className="relative owner-text-anim w-full lg:w-[62%] px-12 pt-6 pb-10 rounded-3xl">
						<div
							className="absolute inset-0 -z-10 bg-gradient-to-br 
              from-teal-50 via-white to-yellow-50
              dark:from-[#0f1f2e] dark:via-[#0b1220] dark:to-[#1a1405]"
						/>

						<span className="absolute top-6 left-6 w-3 h-3 bg-teal-400 rounded-full animate-icon" />
						<span className="absolute bottom-10 right-10 w-3 h-3 bg-yellow-400 rounded-full animate-icon" />

						<h2
							className="text-[60px] leading-[1.05] sm:text-[70px] md:text-[78px] lg:text-[50px]
              font-extrabold text-slate-900 dark:text-white mb-6 whitespace-nowrap"
						>
							Are You a Property Owner?
						</h2>

						{/* ✅ FULL WIDTH SUB-HEADING */}
						<p
							className="text-lg sm:text-xl md:text-[22px] text-slate-700 dark:text-slate-300
              leading-relaxed mb-8 w-full max-w-none"
						>
							InstaMakaan helps you convert your property into a predictable,
							high-earning asset with guaranteed monthly income.
						</p>

						{/* ✅ GROUPED LOWER CONTENT */}
						<div className="mt-6">
							<div className="space-y-4 mb-10">
								{[
									'Guaranteed rental income every month',
									'Professional property management',
									'Verified & reliable tenants',
									'Zero-hassle maintenance',
								].map((point, i) => (
									<div key={i} className="flex items-start gap-4">
										<CheckCircle2 className="text-teal-500 w-6 h-6 mt-[2px]" />
										<span className="text-lg md:text-[20px] text-slate-700 dark:text-slate-300">
											{point}
										</span>
									</div>
								))}
							</div>

							<Button
								variant="teal"
								size="xlg"
								className="text-lg px-30 py-5 rounded-xl"
							>
								<Link to="/contact" className="flex items-center gap-2">
									Contact Us Now
									<ArrowRight className="w-5 h-5" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
