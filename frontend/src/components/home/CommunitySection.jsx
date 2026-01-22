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
		gsap.set('.comm-text-anim', { opacity: 1, y: 0 });

		gsap.from('.comm-text-anim', {
			scrollTrigger: {
				trigger: '.comm-text-anim',
				start: 'top 90%',
			},
			opacity: 0,
			y: 40,
			duration: 0.8,
			ease: 'power3.out',
		});
	}, []);

	return (
		<section className="relative w-screen min-h-screen bg-white dark:bg-[#0b1220] overflow-visible">
			<CommunityAnimations />

			{/* FREE CANVAS */}
			<div className="relative w-full h-full">
				{/* ================= TEXT BOX — NOW LEFT ================= */}
				<div
					className="
            absolute comm-text-anim
            left-[120px] top-[160px]
            w-[920px]
            pt-12 pb-14 px-14
            rounded-3xl
            bg-gradient-to-br from-teal-50 via-white to-yellow-50
            dark:from-[#0f1f2e] dark:via-[#0b1220] dark:to-[#1a1405]
            shadow-xl
          "
				>
					<span className="absolute top-6 left-6 w-3 h-3 bg-teal-400 rounded-full animate-icon" />
					<span className="absolute bottom-10 right-10 w-3 h-3 bg-yellow-400 rounded-full animate-icon" />

					<h3 className="text-[64px] font-extrabold text-black-900 dark:text-white whitespace-nowrap mb-6 -ml-12">
						Get the Insider Advantage
					</h3>

					<p className="text-[22px] text-slate-600 dark:text-slate-300 mb-12 -ml-10 whitespace-nowrap">
						Be the first to know. Get early alerts on properties, deals, and
						market shifts.
					</p>

					<div className="space-y-10">
						<div>
							<Button
								variant="teal"
								className="text-[18px] px-8 py-8 translate-x-[155px] overflow-visible"
							>
								Click to Join Buying Community
							</Button>
							<p className="text-sm text-slate-500 mt-2 translate-x-[190px] overflow-visible">
								Get market insights & investment deals.
							</p>
						</div>

						<div>
							<Button
								variant="yellow"
								className="text-[18px] px-8 py-8 translate-x-[140px] overflow-visible"
							>
								<Zap className="mr-2" />
								Click to Join Tenant Community
							</Button>
							<p className="text-sm text-slate-500 mt-2 translate-x-[200px] overflow-visible">
								Get new rental alerts & local offers.
							</p>
						</div>
					</div>
				</div>

				{/* ================= PHONE — NOW RIGHT ================= */}
				<div
					className="
            absolute
            right-[120px] top-[120px]
        "
				>
					<div
						className="absolute w-[420px] h-[4px] bg-gradient-to-br 
            from-teal-400/40 via-cyan-300/30 to-yellow-300/30 
            rounded-full blur-3xl animate-glow"
					/>

					<svg
						className="absolute w-[520px] opacity-40 animate-wave"
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
							className="w-full h-full object-cover"
							autoPlay
							loop
							muted
							playsInline
						>
							<source src="/videos/community.mp4" type="video/mp4" />
						</video>

						<div className="absolute top-2 left-1/2 -translate-x-1/2 w-[92px] h-[26px] bg-black rounded-full" />
						<div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
					</div>
				</div>
			</div>
		</section>
	);
};
