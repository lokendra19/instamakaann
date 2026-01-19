import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Zap } from 'lucide-react';

export const CommunitySection = () => {
	return (
		<section className="py-16 sm:py-20 bg-white dark:bg-slate-900">
			<div className="max-w-7xl mx-auto pl-6 pr-4 sm:pl-10 sm:pr-6 lg:pl-16 lg:pr-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* LEFT : VIDEO CARD (UNCHANGED UI) */}
					<div className="flex justify-center lg:justify-start lg:pl-8">
						<div className="relative w-[280px] sm:w-[320px] md:w-[360px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-black">
							<video
								className="w-full h-full object-cover"
								autoPlay
								loop
								muted
								playsInline
							>
								<source src="/videos/community.mp4" type="video/mp4" />
							</video>

							<div className="absolute inset-0 bg-black/20"></div>
						</div>
					</div>

					{/* RIGHT : CONTENT */}
					<div className="text-center lg:text-left">
						<h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
							Get the Insider Advantage
						</h3>

						<p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
							Be the first to know. Get early alerts on properties, deals, and
							market shifts.
						</p>

						<div className="space-y-6">
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
