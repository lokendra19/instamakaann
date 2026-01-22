import React from 'react';
import { Button } from '@/components/ui/button';
import { Instagram, Play } from 'lucide-react';

const instagramPosts = [
	{
		id: 1,
		postUrl: 'https://www.instagram.com/',
		thumbnail:
			'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
		hasVideo: true,
	},
	{
		id: 2,
		postUrl: 'https://www.instagram.com/',
		thumbnail:
			'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600',
		hasVideo: false,
	},
	{
		id: 3,
		postUrl: 'https://www.instagram.com/',
		thumbnail:
			'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600',
		hasVideo: true,
	},
	{
		id: 4,
		postUrl: 'https://www.instagram.com/',
		thumbnail:
			'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
		hasVideo: false,
	},
];

export const InstagramSection = () => {
	return (
		<section className="relative w-full min-h-screen bg-white dark:bg-neutral-950">
			{/* 🔓 FREE WRAPPER — NO CONTAINER */}
			<div className="relative w-full px-20 pt-20">
				{/* ================= HEADING ================= */}
				<div className="relative text-center mb-16">
					<h2 className="text-[55px] font-bold text-teal-900 dark:text-white">
						VISIT OUR INSTAGRAM
					</h2>

					<p className="text-[20px] text-gray-600 dark:text-gray-400 mt-4">
						Follow our journey, see behind-the-scenes content, and explore our
						latest properties.
					</p>
				</div>

				{/* ================= POSTS ================= */}
				<div className="relative flex gap-10 flex-center flex-wrap justify-center">
					{instagramPosts.map((post) => (
						<a
							key={post.id}
							href={post.postUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="
                relative
                w-[300px] h-[300px]
                rounded-xl
                overflow-hidden
                shadow-lg
                hover:scale-105
                transition
              "
						>
							<img
								src={post.thumbnail}
								alt="Instagram post"
								className="w-full h-full object-cover"
							/>

							{/* Overlay */}
							<div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition flex items-center justify-center">
								<Instagram className="w-8 h-8 text-white" />
							</div>

							{/* Video icon */}
							{post.hasVideo && (
								<div className="absolute top-3 right-3 bg-black/70 p-2 rounded-md">
									<Play className="w-4 h-4 text-white" />
								</div>
							)}
						</a>
					))}
				</div>

				{/* ================= BUTTON ================= */}
				<div className="relative mt-20 text-center">
					<Button variant="yellow" size="lg" className="text-[18px] px-10 py-6">
						<Instagram className="w-5 h-5 mr-2" />
						Follow us on Instagram @InstaMakaan
					</Button>
				</div>
			</div>
		</section>
	);
};
