import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Key, Handshake, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ===================== STATS ===================== */
const stats = [
	{
		icon: Building2,
		value: 100,
		suffix: '+',
		label: 'Owner Properties Managed',
	},
	{
		icon: Key,
		value: 500,
		suffix: '+',
		label: 'Seamless Tenant Move-ins',
	},
	{
		icon: Handshake,
		value: 50,
		suffix: '+',
		label: 'Trusted Broker Partners',
	},
	{
		icon: Users,
		value: 5000,
		suffix: '+',
		label: 'Strong InstaMakaan Community',
	},
];

/* ===================== COUNT UP ===================== */
const CountUp = ({ end, duration = 2000, suffix = '' }) => {
	const [count, setCount] = useState(0);
	const ref = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setIsVisible(true);
			},
			{ threshold: 0.2 },
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!isVisible) return;
		let startTime;

		const animate = (currentTime) => {
			if (!startTime) startTime = currentTime;
			const progress = Math.min((currentTime - startTime) / duration, 1);
			setCount(Math.floor(progress * end));

			if (progress < 1) requestAnimationFrame(animate);
		};

		requestAnimationFrame(animate);
	}, [isVisible, end, duration]);

	return (
		<span ref={ref}>
			{count.toLocaleString()}
			{suffix}
		</span>
	);
};

/* ===================== MAIN SECTION ===================== */
export const ImpactSection = () => {
	return (
		<section className="py-16 md:py-24 bg-white dark:bg-[#0b1220]">
			<div className="container-custom">
				{/* HEADER */}
				<div className="text-center mb-12 md:mb-16">
					<h2 className="text-3xl md:text-6xl font-extrabold text-black-900 dark:text-white">
						We Create Real Impact
					</h2>

					<p className="text-lg md:text-xl text-black-600 dark:text-white-400 max-w-xl mx-auto mt-3 font-medium">
						Our Numbers, Your Peace of Mind
					</p>
				</div>

				{/* GRID */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-14 md px-4">
					{stats.map((stat, index) => (
						<Card
							key={stat.label}
							className={cn(
								'bg-white dark:bg-[#101826] rounded-2xl shadow-xl border-0',
								'transition-all duration-500 hover:scale-[1.04] hover:-translate-y-1 hover:shadow-2xl',
								'relative overflow-hidden cursor-pointer select-none group',
							)}
							style={{
								animation: `fadeUp 0.9s ease-out ${index * 0.12}s both`,
							}}
						>
							{/* Background Glow */}
							<div className="absolute inset-0 bg-gradient-to-br from-teal-300/10 via-transparent to-yellow-300/10 opacity-0 group-hover:opacity-100 transition duration-500" />

							<CardContent className="p-6 md:p-8 text-center relative z-10">
								{/* ICON */}
								<div
									className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-teal-500/10 
                    flex items-center justify-center mx-auto mb-4 
                    transition-colors duration-300 group-hover:bg-teal-500/20"
								>
									<stat.icon
										className="w-7 h-7 md:w-8 md:h-8 text-teal-500 
                      transition-colors duration-300 group-hover:text-teal-600"
									/>
								</div>

								{/* NUMBER */}
								<div
									className="text-3xl md:text-4xl font-bold 
                    text-slate-900 dark:text-white mb-2 
                    transition-colors duration-300 group-hover:text-yellow-600"
								>
									<CountUp end={stat.value} suffix={stat.suffix} />
								</div>

								{/* LABEL */}
								<p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
									{stat.label}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Fade Up Keyframes */}
			<style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
		</section>
	);
};
