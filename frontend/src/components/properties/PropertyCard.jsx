import React from 'react';
import { Link } from 'react-router-dom';
import { BedDouble, Bath, Ruler, MapPin } from 'lucide-react';

export const PropertyCard = ({ property }) => {
	const image =
		Array.isArray(property.images) && property.images.length > 0
			? property.images[0]
			: null;

	return (
		<div
			className="
				group relative
				bg-white dark:bg-neutral-900
				rounded-2xl overflow-hidden
				border border-gray-200 dark:border-white/10
				shadow-sm
				transition-all duration-300 ease-out
				hover:-translate-y-1 hover:shadow-xl
			"
		>
			{/* IMAGE */}
			<div className="relative h-48 overflow-hidden">
				{image ? (
					<img
						src={image}
						alt={property.title}
						className="
							w-full h-full object-cover
							transition-transform duration-500
							group-hover:scale-105
						"
					/>
				) : (
					<div className="w-full h-full bg-gray-200 dark:bg-neutral-800" />
				)}

				{/* SOFT OVERLAY */}
				<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

				{/* BUY / RENT BADGE */}
				<span
					className="
						absolute top-3 left-3
						bg-white/90 dark:bg-black/60
						text-gray-900 dark:text-white
						text-xs px-3 py-1 rounded-full
						backdrop-blur
					"
				>
					{property.property_type?.toUpperCase()}
				</span>
			</div>

			{/* CONTENT */}
			<div className="p-4">
				<h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
					{property.title}
				</h3>

				<p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
					<MapPin className="w-4 h-4 text-teal-500" />
					<span className="line-clamp-1">{property.location}</span>
				</p>

				<div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-3">
					<span className="flex items-center gap-1">
						<BedDouble className="w-4 h-4" /> {property.beds} Beds
					</span>
					<span className="flex items-center gap-1">
						<Bath className="w-4 h-4" /> {property.baths} Baths
					</span>
					<span className="flex items-center gap-1">
						<Ruler className="w-4 h-4" /> {property.area} sqft
					</span>
				</div>

				<div className="flex justify-between items-center mt-4">
					<p className="text-lg font-semibold text-gray-900 dark:text-white">
						₹ {property.price}
					</p>

					<Link to={`/property/${property.id}`}>
						<button
							className="
								bg-teal-600 hover:bg-teal-700
								text-white px-4 py-2
								rounded-lg text-sm
								transition-colors
							"
						>
							View Details
						</button>
					</Link>
				</div>
			</div>

			{/* GLOW EFFECT */}
			<div
				className="
					pointer-events-none absolute inset-0
					opacity-0 group-hover:opacity-100
					transition-opacity duration-300
					bg-gradient-to-br from-teal-400/10 via-transparent to-yellow-400/10
				"
			/>
		</div>
	);
};
