import React, { useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const CommunityAnimations = () => (
	<style>{`
    @keyframes phoneFloat {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }
    @keyframes glowAnim {
      0%,100% { opacity:.35; }
      50% { opacity:.7; }
    }
    @keyframes waveMove {
      0%,100% { transform: translateX(0); }
      50% { transform: translateX(35px); }
    }
    @keyframes iconFloat {
      0%,100% { opacity:.5; transform: translateY(0); }
      50% { opacity:1; transform: translateY(-10px); }
    }

    .animate-phone { animation: phoneFloat 4s ease-in-out infinite; }
    .animate-glow { animation: glowAnim 6s ease-in-out infinite; }
    .animate-wave { animation: waveMove 10s linear infinite; }
    .animate-icon { animation: iconFloat 4s ease-in-out infinite; }
  `}</style>
);

export const CommunitySection = () => {
	useLayoutEffect(() => {
  gsap.set(".comm-text-anim", { opacity: 1 });

  gsap.from(".comm-text-anim", {
    scrollTrigger: {
      trigger: ".comm-text-anim",
      start: "top 90%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power3.out",
  });
}, []);


	return (
		<section className="py-16 sm:py-20 bg-white dark:bg-[#0b1220]">
			<CommunityAnimations />

			<div className="max-w-7xl mx-auto px-6 lg:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* ================= LEFT — PREMIUM PHONE ANIMATION ================= */}
					<div className="relative flex justify-center">
						{/* Glow BG */}
						<div
							className="absolute w-[300px] h-[360px] bg-gradient-to-br 
                from-teal-400/40 via-cyan-300/30 to-yellow-300/30 
                rounded-full blur-3xl animate-glow"
						/>

						{/* Wave */}
						<svg
							className="absolute w-[460px] opacity-40 animate-wave"
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
						<span
							className="absolute text-3xl font-bold text-teal-500 animate-icon"
							style={{ top: '-20px', left: '78%' }}
						>
							★
						</span>

						<span
							className="absolute text-3xl font-bold text-yellow-500 animate-icon"
							style={{ bottom: '-10px', left: '-10px' }}
						>
							✓
						</span>

						{/* Phone Frame */}
						<div
							className="relative z-10 w-[200px] sm:w-[240px] md:w-[260px]
                aspect-[9/18] bg-neutral-900 rounded-[34px] shadow-2xl 
                overflow-hidden border-[4px] border-neutral-700 animate-phone"
						>
							<video
								className="w-full h-full object-cover"
								autoPlay
								loop
								muted
								playsInline
							>
								<source src="/videos/community.mp4" type="video/mp4" />
							</video>

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

					{/* ================= RIGHT — TEXT BLOCK ================= */}
					<div
						className="relative comm-text-anim p-6 md:p-8 rounded-3xl 
              bg-gradient-to-br from-teal-50 via-white to-yellow-50
              dark:from-[#0f1f2e] dark:via-[#0b1220] dark:to-[#1a1405]
              shadow-xl"
					>
						{/* Floating dots */}
						<span className="absolute top-6 left-6 w-3 h-3 bg-teal-400 rounded-full animate-icon" />
						<span className="absolute bottom-10 right-10 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-icon" />

						<h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
							Get the Insider Advantage
						</h3>

						<p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-7 max-w-xl">
							Be the first to know. Get early alerts on properties, deals, and
							market shifts.
						</p>

						<div className="space-y-7">
							<div>
								<Button variant="teal" size="lg" className="w-full sm:w-auto">
									<Users className="mr-2" />
									Click to Join Buying Community
								</Button>
								<p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
									Get market insights & investment deals.
								</p>
							</div>

							<div>
								<Button variant="yellow" size="lg" className="w-full sm:w-auto">
									<Zap className="mr-2" />
									Click to Join Tenant Community
								</Button>
								<p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
									Get new rental alerts & local offers.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
