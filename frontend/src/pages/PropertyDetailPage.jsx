import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import {
	MapPin,
	ChevronLeft,
	ChevronRight,
	IndianRupee,
	Wallet,
	BadgeCheck,
	CalendarDays,
	CheckCircle,
	Home,
	Sofa,
	Bed,
	Lightbulb,
	Fan,
	Wifi,
	ShieldCheck,
	Car,
	ChefHat,
	Plug,
} from 'lucide-react';

/* ---------------- ICON MAP (NO EMOJIS) ---------------- */
const iconMap = {
	Lift: <Home size={14} />,
	Parking: <Car size={14} />,
	'24x7 Security': <ShieldCheck size={14} />,
	Security: <ShieldCheck size={14} />,
	Wifi: <Wifi size={14} />,
	Light: <Lightbulb size={14} />,
	Fan: <Fan size={14} />,
	Sofa: <Sofa size={14} />,
	Bed: <Bed size={14} />,
	Fridge: <ChefHat size={14} />,
	Microwave: <ChefHat size={14} />,
	'RO Water Purifier': <ChefHat size={14} />,
	'Gas Pipeline': <Plug size={14} />,
	AC: <Plug size={14} />,
	TV: <Plug size={14} />,
};

/* ---------------- AMENITY COLOR MAP ---------------- */
const amenityBgMap = {
	House: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
	'Living Room':
		'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
	Kitchen:
		'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
	Bedroom:
		'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
};

/* ---------------- PARSER (FIXED – GROUP WISE) ---------------- */
const parseAmenities = (amenitiesArray = []) => {
	const base = {
		House: [],
		'Living Room': [],
		Kitchen: [],
		Bedroom: [],
	};

	amenitiesArray.forEach((item) => {
		// Case 1: "House:Lift"
		if (typeof item === 'string' && item.includes(':')) {
			const [section, value] = item.split(':');
			if (base[section]) base[section].push(value);
		}

		// Case 2: { House: ["Lift", "Power Backup"] }
		if (typeof item === 'object' && item !== null) {
			Object.entries(item).forEach(([section, values]) => {
				if (base[section] && Array.isArray(values)) {
					base[section].push(...values);
				}
			});
		}
	});

	return base;
};

/* ---------------- COMPONENT ---------------- */
const PropertyDetailPage = () => {
	const { id } = useParams();
	const [property, setProperty] = useState(null);
	const [related, setRelated] = useState([]);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const load = async () => {
			const res = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/api/properties/${id}`,
			);
			const data = await res.json();
			setProperty(data);

			const listRes = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/api/properties`,
			);
			const list = await listRes.json();
			setRelated(list.filter((p) => p.id !== data.id).slice(0, 2));
		};
		load();
	}, [id]);

	if (!property) {
		return (
			<Layout>
				<div className="min-h-[60vh] flex items-center justify-center">
					Loading...
				</div>
			</Layout>
		);
	}

	const images =
		Array.isArray(property.images) && property.images.length > 0
			? property.images
			: ['https://via.placeholder.com/1200x600'];

	const amenities = parseAmenities(property.amenities);

	return (
		<Layout>
			<div className="container-custom py-10 grid lg:grid-cols-3 gap-10">
				{/* LEFT */}
				<div className="lg:col-span-2 space-y-10">
					{/* TITLE */}
					<div>
						<h1 className="text-3xl font-bold">{property.title}</h1>
						<p className="flex items-center mt-1 text-gray-500 dark:text-gray-400">
							<MapPin className="w-4 h-4 mr-1 text-teal-600" />
							{property.location}
						</p>
					</div>

					{/* GALLERY */}
					<div className="relative h-[420px] rounded-2xl overflow-hidden shadow">
						<img
							src={images[index]}
							className="w-full h-full object-cover"
							alt=""
						/>
						<button
							onClick={() =>
								setIndex(index === 0 ? images.length - 1 : index - 1)
							}
							className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-neutral-800 p-2 rounded-full"
						>
							<ChevronLeft />
						</button>
						<button
							onClick={() => setIndex((index + 1) % images.length)}
							className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-neutral-800 p-2 rounded-full"
						>
							<ChevronRight />
						</button>
					</div>

					{/* PRICE */}
					<div className="grid sm:grid-cols-3 gap-4">
						<div className="bg-white dark:bg-neutral-900 p-4 rounded-xl shadow">
							<IndianRupee className="text-teal-600" />
							<p className="font-bold">{property.price}</p>
						</div>
						<div className="bg-white dark:bg-neutral-900 p-4 rounded-xl shadow">
							<Wallet className="text-teal-600" />
							<p className="font-bold">{property.deposit || 'N/A'}</p>
						</div>
						<div className="bg-white dark:bg-neutral-900 p-4 rounded-xl shadow">
							<BadgeCheck className="text-teal-600" />
							<p className="font-bold">
								{property.brokerage || 'No Brokerage'}
							</p>
						</div>
					</div>

					{/* AMENITIES */}
					<h2 className="text-2xl font-bold">Amenities</h2>

					<div className="grid md:grid-cols-2 gap-6">
						{Object.entries(amenities).map(([section, items]) => (
							<div
								key={section}
								className={`rounded-xl p-5 border ${amenityBgMap[section]}`}
							>
								<h3 className="font-semibold mb-4">{section}</h3>

								{items.length === 0 ? (
									<p className="text-sm text-gray-400">No amenities added</p>
								) : (
									<div className="grid grid-cols-2 gap-3 text-sm">
										{items.map((item, i) => (
											<div key={i} className="flex items-center gap-2">
												<span>
													{iconMap[item] || <CheckCircle size={14} />}
												</span>
												{item}
											</div>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* RIGHT SIDEBAR */}
				<div className="sticky top-24 self-start h-fit">
					<div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg overflow-hidden">
						<div className="p-6 border-b border-gray-200 dark:border-neutral-700">
							<h3 className="font-semibold mb-4 flex items-center gap-2">
								<CalendarDays className="text-teal-600" />
								Schedule Visit
							</h3>

							<input
								className="w-full mb-3 p-2 border rounded bg-white dark:bg-neutral-800 dark:border-neutral-700"
								placeholder="Name"
							/>
							<input
								className="w-full mb-4 p-2 border rounded bg-white dark:bg-neutral-800 dark:border-neutral-700"
								placeholder="Phone"
							/>
							<button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded">
								Contact Owner
							</button>
						</div>

						<div className="p-6">
							<h4 className="font-semibold mb-4">People also searched</h4>

							{related.map((p) => (
								<Link
									key={p.id}
									to={`/property/${p.id}`}
									className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
								>
									<p className="font-medium">{p.title}</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{p.location}
									</p>
									<p className="text-teal-600 font-semibold">₹ {p.price}</p>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default PropertyDetailPage;
