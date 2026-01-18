import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const PropertyOwnerSection = () => {
	return (
		<section className="py-16 md:py-24 bg-slate-50 dark:bg-[#0b1220]">
			<div className="container-custom">
				<div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
					{/* LEFT : VIDEO */}
					<div className="flex justify-center">
						<div className="w-full max-w-[480px] sm:max-w-[380px]">
							<video
								src="/videos/property-owner.mp4"
								autoPlay
								loop
								muted
								playsInline
								className="
                  w-full
                  h-auto
                  object-contain
                  rounded-3xl
                  shadow-lg
                "
							/>
						</div>
					</div>

					{/* RIGHT : CONTENT */}
					<div>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
							Are You a Property Owner?
						</h2>

						<p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-6">
							InstaMakaan helps you transform your property into a hassle-free,
							high-earning asset. Get predictable income, guaranteed.
						</p>

						<h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-6">
							Unlock Your Property&apos;s Full Potential
						</h3>

						<ul className="space-y-3 mb-8">
							{[
								'Guaranteed rental income every month',
								'Professional property management',
								'Verified & reliable tenants',
								'Zero hassle maintenance',
							].map((item) => (
								<li key={item} className="flex items-start gap-3">
									<CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
									<span className="text-slate-700 dark:text-slate-300">
										{item}
									</span>
								</li>
							))}
						</ul>

						<div className="flex flex-col sm:flex-row gap-4">
							<Button variant="teal" size="lg" asChild>
								<Link to="/contact">
									Contact Us Now
									<ArrowRight className="w-5 h-5 ml-2" />
								</Link>
							</Button>

							<Button variant="ghost" size="lg" asChild>
								<Link to="/partner">Download FREE Owner&apos;s Brochure</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
