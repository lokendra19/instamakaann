import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
	ChevronLeft,
	ChevronRight,
	Play,
	Building2,
	User,
	Quote,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
	{
		id: 1,
		headline: 'Hassle-Free Income & Total Peace of Mind',
		quote:
			'InstaMakaan changed everything. My property is professionally managed, the rent is always on time, and I never worry about anything.',
		name: 'Mr. Rajesh Kumar',
		role: 'Property Owner',
		location: 'Sector 137 Noida',
		type: 'owner',
		videoThumbnail:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
	},
	{
		id: 2,
		headline: 'Found My Dream Home in Days',
		quote:
			'No fake listings, no stress. InstaMakaan made finding a home simple and reliable.',
		name: 'Priya Sharma',
		role: 'Tenant',
		location: 'Sector 62 Noida',
		type: 'tenant',
		videoThumbnail:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
	},
	{
		id: 3,
		headline: 'Professional Service, Every Time',
		quote:
			'Managing multiple properties is easy now. InstaMakaan handles everything.',
		name: 'Amit Verma',
		role: 'Property Investor',
		location: 'Greater Noida',
		type: 'owner',
		videoThumbnail:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
	},
];

export const TestimonialsSection = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const intervalRef = useRef(null);

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setCurrentIndex((p) => (p + 1) % testimonials.length);
		}, 8000);

		return () => clearInterval(intervalRef.current);
	}, []);

	const t = testimonials[currentIndex];

	return (
		<section className="relative w-screen min-h-screen bg-white dark:bg-[#0b1220] overflow-visible">
			{/* FREE CANVAS */}
			<div className="relative w-full h-full px-0">
				{/* HEADER (FREE MOVE) */}
				<div className="absolute top-[60px] left-1/2 -translate-x-1/2 text-center">
					<h2 className="text-5xl font-extrabold text-dark-900 dark:text-white mb-3">
						What Our Customers Say
					</h2>
					<p className="text-[16px] md:text-[25px] text-dark-600 dark:text-slate-400 max-w-3xl mx-auto mt-4">
						Real stories from owners & tenants who trust InstaMakaan.
					</p>
				</div>

				{/* CARD WRAPPER (FREE POSITION) */}
				<div className="absolute left-[120px] top-[180px] w-[90vw]">
					{/* NAV */}
					<button
						onClick={() =>
							setCurrentIndex(
								(p) => (p - 1 + testimonials.length) % testimonials.length,
							)
						}
						className="absolute -left-[30px] top-1/2 -translate-y-1/2 z-10 
            w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 
            hover:bg-teal-500 text-white transition flex items-center justify-center"
					>
						<ChevronLeft />
					</button>

					<button
						onClick={() =>
							setCurrentIndex((p) => (p + 1) % testimonials.length)
						}
						className="absolute -right-[30px] top-1/2 -translate-y-1/2 z-10 
            w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 
            hover:bg-teal-500 text-white transition flex items-center justify-center"
					>
						<ChevronRight />
					</button>

					<Card className="bg-white dark:bg-[#0f172a] border border-black/10 dark:border-white/10 rounded-3xl shadow-xl">
						<CardContent className="p-0">
							{/* 🔓 CUSTOM GRID (NOT 50–50) */}
							<div className="grid md:grid-cols-[45%_55%] min-h-[420px]">
								{/* IMAGE SIDE */}
								<div className="relative overflow-visible">
									<img
										src={t.videoThumbnail}
										alt={t.name}
										className="w-full h-full object-cover object-center"
									/>
									<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
										<div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center shadow-lg">
											<Play className="ml-1" />
										</div>
									</div>
								</div>

								{/* TEXT SIDE */}
								<div className="relative p-12 flex flex-col justify-center overflow-visible">
									{/* GLOW */}
									<div
										className="absolute inset-0 bg-gradient-to-br 
                    from-teal-300/20 via-transparent to-yellow-300/20 
                    blur-2xl pointer-events-none"
									/>

									<Quote className="w-12 h-12 text-teal-500 mb-4" />

									<h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-4">
										{t.headline}
									</h3>

									<p className="text-slate-600 dark:text-slate-300 italic mb-8 leading-relaxed">
										“{t.quote}”
									</p>

									<div className="flex items-center gap-4">
										<div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center">
											{t.type === 'owner' ? (
												<Building2 className="text-teal-500" />
											) : (
												<User className="text-teal-500" />
											)}
										</div>

										<div>
											<p className="text-slate-900 dark:text-white font-semibold">
												{t.name}
											</p>
											<p className="text-sm text-slate-500 dark:text-slate-400">
												{t.role}, {t.location}
											</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* DOTS */}
					<div className="flex justify-center gap-2 mt-6">
						{testimonials.map((_, i) => (
							<span
								key={i}
								className={cn(
									'h-2 rounded-full transition-all',
									i === currentIndex
										? 'w-8 bg-teal-500'
										: 'w-2 bg-slate-400 dark:bg-slate-600',
								)}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
