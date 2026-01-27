import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Zap } from 'lucide-react';

/* ================= SIMPLE ANIMATIONS (CSS ONLY) ================= */
const CommunityAnimations = () => (
	<style>{`
    @keyframes phoneFloat {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes glowAnim {
      0%,100% { opacity:.3; }
      50% { opacity:.6; }
    }
    .animate-phone { animation: phoneFloat 4s ease-in-out infinite; }
    .animate-glow { animation: glowAnim 6s ease-in-out infinite; }
  `}</style>
);

export const CommunitySection = () => {
	return (
		<section className="py-16 sm:py-20 md:py-28 bg-white dark:bg-[#0b1220] overflow-hidden">
			<CommunityAnimations />

			<div className="container-custom">
				{/* ✅ MOBILE VERSION (Heading -> Video -> Text/Buttons) */}
				<div className="block lg:hidden px-4">
					{/* ✅ Heading FIRST */}
					<h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 whitespace-nowrap">
						Get the Insider Advantage
					</h3>

					{/* ✅ Video SECOND (Small like PropertyOwner style) */}
					<div className="relative flex justify-center mb-6">
						<div className="absolute w-[280px] h-[340px] bg-gradient-to-br from-teal-400/40 via-cyan-300/30 to-yellow-300/30 rounded-full blur-3xl animate-glow" />

						<div className="relative z-10 w-[220px] aspect-[9/19] rounded-[38px] bg-neutral-900 shadow-2xl overflow-hidden">
							<video
								className="w-full h-full object-cover rounded-[38px]"
								autoPlay
								loop
								muted
								playsInline
								src="/videos/community.mp4"
							/>
						</div>
					</div>

					{/* ✅ Text + Buttons THIRD */}
					<p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
						Be the first to know. Get early alerts on properties, deals, and
						market shifts.
					</p>

					<div className="space-y-5">
						<div>
							<Button
								variant="teal"
								className="w-full justify-center py-5 rounded-2xl"
							>
								<Users className="mr-2 w-5 h-5" />
								Join Buying Community
							</Button>
							<p className="text-xs sm:text-sm text-slate-500 mt-2">
								Get market insights & investment deals.
							</p>
						</div>

						<div>
							<Button
								variant="yellow"
								className="w-full justify-center py-5 rounded-2xl"
							>
								<Zap className="mr-2 w-5 h-5" />
								Join Tenant Community
							</Button>
							<p className="text-xs sm:text-sm text-slate-500 mt-2">
								Get new rental alerts & local offers.
							</p>
						</div>
					</div>
				</div>

				{/* ✅ DESKTOP VERSION (Original Layout) */}
				<div className="hidden lg:flex flex-col lg:flex-row items-center gap-14">
					{/* ================= TEXT ================= */}
					<div
						className="w-full lg:w-[62%]
            px-6 sm:px-10 md:px-12 py-10 md:py-12
            rounded-3xl bg-gradient-to-br from-teal-50 via-white to-yellow-50
            dark:from-[#0f1f2e] dark:via-[#0b1220] dark:to-[#1a1405]
            shadow-xl"
					>
						<h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
							Get the Insider Advantage
						</h3>

						<p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-xl">
							Be the first to know. Get early alerts on properties, deals, and
							market shifts.
						</p>

						<div className="space-y-6">
							<div>
								<Button
									variant="teal"
									className="text-base sm:text-lg px-6 py-5"
								>
									<Users className="mr-2" />
									Join Buying Community
								</Button>
								<p className="text-sm text-slate-500 mt-2">
									Get market insights & investment deals.
								</p>
							</div>

							<div>
								<Button
									variant="yellow"
									className="text-base sm:text-lg px-6 py-5"
								>
									<Zap className="mr-2" />
									Join Tenant Community
								</Button>
								<p className="text-sm text-slate-500 mt-2">
									Get new rental alerts & local offers.
								</p>
							</div>
						</div>
					</div>

					{/* ================= PHONE ================= */}
					<div className="relative flex justify-center lg:justify-end w-full lg:w-[38%] mt-12 lg:mt-0">
						<div className="absolute w-[300px] h-[360px] bg-gradient-to-br from-teal-400/40 via-cyan-300/30 to-yellow-300/30 rounded-full blur-3xl animate-glow" />

						<div
							className="relative z-10 w-[220px] sm:w-[260px] md:w-[300px]
              aspect-[9/19] rounded-[38px] bg-neutral-900 shadow-2xl overflow-hidden"
						>
							<video
								className="w-full h-full object-cover rounded-[38px]"
								autoPlay
								loop
								muted
								playsInline
								src="/videos/community.mp4"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
