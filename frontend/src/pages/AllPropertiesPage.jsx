import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import api from '@/lib/api';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
	Filter,
	LayoutGrid,
	List,
	X,
	ChevronDown,
	ArrowUpDown,
	RotateCcw,
} from 'lucide-react';

const headlines = [
	'24/7 Service. 100% Verified. Total Sukoon.',
	'Your Home, Your Vibe, Our Responsibility.',
	'Welcome to a Managed Home. Renting, Redefined.',
];

const AllPropertiesPage = () => {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// Filters
	const [propertyTypes, setPropertyTypes] = useState([]);
	const [beds, setBeds] = useState([]);
	const [furnishing, setFurnishing] = useState([]);
	const [managedOnly, setManagedOnly] = useState(false);
	const [priceRange, setPriceRange] = useState([0, 50000]);
	const [showFilters, setShowFilters] = useState(false);

	// ✅ Filter Tab like NoBroker
	const [filterTab, setFilterTab] = useState('filters'); // filters | premium

	// UI
	const [headlineIndex, setHeadlineIndex] = useState(0);
	const [view, setView] = useState('grid');

	// Sorting
	const [sortBy, setSortBy] = useState('');
	const [openSort, setOpenSort] = useState(false);

	// ✅ get rent safely
	const getRent = (p) => {
		const val =
			p?.monthly_rent_amount ?? p?.monthly_rent ?? p?.rent ?? p?.price ?? 0;
		const num = Number(val);
		return Number.isFinite(num) ? num : 0;
	};

	useEffect(() => {
		api
			.get('/properties/')
			.then((res) => setProperties(res.data))
			.catch(() => setError('Failed to load properties'))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		const i = setInterval(
			() => setHeadlineIndex((p) => (p + 1) % headlines.length),
			3000,
		);
		return () => clearInterval(i);
	}, []);

	// ✅ max rent
	const maxRent = useMemo(() => {
		const rents = properties.map(getRent).filter((n) => n > 0);
		return rents.length ? Math.max(...rents) : 50000;
	}, [properties]);

	useEffect(() => {
		setPriceRange([0, maxRent]);
	}, [maxRent]);

	const toggleArray = (value, setFn) => {
		setFn((prev) =>
			prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
		);
	};

	const clearFilters = () => {
		setPropertyTypes([]);
		setBeds([]);
		setFurnishing([]);
		setManagedOnly(false);
		setPriceRange([0, maxRent]);
	};

	// FILTERED
	const filteredProperties = useMemo(() => {
		return properties.filter((p) => {
			if (propertyTypes.length && !propertyTypes.includes(p.property_type))
				return false;

			if (beds.length) {
				const bedValue = String(p.beds ?? '');
				if (!beds.map(String).includes(bedValue)) return false;
			}

			if (furnishing.length) {
				const f = String(p.furnishing ?? '').toLowerCase();
				if (!furnishing.map((x) => x.toLowerCase()).includes(f)) return false;
			}

			if (managedOnly && !p.is_managed) return false;

			if (p.property_type !== 'buy') {
				const rent = getRent(p);
				if (rent > 0) {
					if (rent < priceRange[0] || rent > priceRange[1]) return false;
				}
			}

			return true;
		});
	}, [properties, propertyTypes, beds, furnishing, managedOnly, priceRange]);

	// SORTED FINAL LIST
	const finalProperties = useMemo(() => {
		const list = [...filteredProperties];

		if (sortBy === 'price_low') list.sort((a, b) => getRent(a) - getRent(b));
		if (sortBy === 'price_high') list.sort((a, b) => getRent(b) - getRent(a));

		return list;
	}, [filteredProperties, sortBy]);

	// ✅ Chip Button component (NoBroker style)
	const Chip = ({ active, onClick, children }) => (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'px-3 py-2 rounded-lg border text-xs font-semibold transition',
				active
					? 'bg-teal-600 text-white border-teal-600 shadow-sm'
					: 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700',
			)}
		>
			{children}
		</button>
	);

	// ✅ Filter Panel (Reusable for Desktop + Mobile)
	const FiltersPanel = ({ isMobile = false }) => (
		<div className={cn('w-full', isMobile && 'pb-24')}>
			{/* Top Tabs like NoBroker */}
			<div className="flex items-center justify-between gap-2">
				<div className="flex w-full rounded-lg bg-slate-100 p-1">
					<button
						onClick={() => setFilterTab('filters')}
						className={cn(
							'flex-1 text-xs font-semibold py-2 rounded-md transition',
							filterTab === 'filters'
								? 'bg-white shadow text-teal-700'
								: 'text-slate-600',
						)}
					>
						Filters
					</button>

					<button
						onClick={() => setFilterTab('premium')}
						className={cn(
							'flex-1 text-xs font-semibold py-2 rounded-md transition',
							filterTab === 'premium'
								? 'bg-white shadow text-teal-700'
								: 'text-slate-600',
						)}
					>
						Premium Filters
					</button>
				</div>

				<button
					onClick={clearFilters}
					className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
				>
					<RotateCcw className="w-4 h-4" />
					Reset
				</button>
			</div>

			{/* ✅ CONTENT SWITCH */}
			{filterTab === 'filters' ? (
				/* ========================= NORMAL FILTERS ========================= */
				<div className="mt-5 space-y-6">
					{/* ✅ BHK TYPE */}
					<div className="space-y-3">
						<h4 className="text-sm font-bold text-slate-900">BHK Type</h4>
						<div className="grid grid-cols-3 gap-2">
							{['1', '2', '3', '4', '5+'].map((b) => (
								<button
									key={b}
									type="button"
									onClick={() => toggleArray(b, setBeds)}
									className={cn(
										'px-3 py-2 rounded-lg border text-xs font-semibold transition',
										beds.includes(b)
											? 'bg-teal-600 text-white border-teal-600 shadow-sm'
											: 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700',
									)}
								>
									{b === '5+' ? '4+ BHK' : `${b} BHK`}
								</button>
							))}
						</div>
					</div>

					{/* ✅ RENT RANGE */}
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<h4 className="text-sm font-bold text-slate-900">Rent Range</h4>
							<span className="text-[11px] font-semibold text-slate-600">
								₹{priceRange[0].toLocaleString()} - ₹
								{priceRange[1].toLocaleString()}
							</span>
						</div>

						<div className="bg-white border border-slate-200 rounded-xl px-4 py-4">
							<Slider
								min={0}
								max={maxRent}
								step={500}
								value={priceRange}
								onValueChange={setPriceRange}
							/>
						</div>
					</div>

					{/* ✅ PROPERTY TYPE */}
					<div className="space-y-3">
						<h4 className="text-sm font-bold text-slate-900">Property Type</h4>

						<div className="space-y-2">
							{['rent', 'pre-occupied', 'buy'].map((type) => (
								<label
									key={type}
									className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-50 transition cursor-pointer"
								>
									<Checkbox
										checked={propertyTypes.includes(type)}
										onCheckedChange={() => toggleArray(type, setPropertyTypes)}
									/>
									<span className="capitalize text-sm font-medium text-slate-700">
										{type}
									</span>
								</label>
							))}
						</div>
					</div>

					{/* ✅ Furnishing */}
					<div className="space-y-3">
						<h4 className="text-sm font-bold text-slate-900">Furnishing</h4>
						<div className="space-y-2">
							{['Furnished', 'Semi-Furnished', 'Unfurnished'].map((f) => (
								<label
									key={f}
									className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-50 transition cursor-pointer"
								>
									<Checkbox
										checked={furnishing.includes(f)}
										onCheckedChange={() => toggleArray(f, setFurnishing)}
									/>
									<span className="text-sm font-medium text-slate-700">
										{f}
									</span>
								</label>
							))}
						</div>
					</div>

					{/* ✅ Managed */}
					<div className="space-y-3">
						<h4 className="text-sm font-bold text-slate-900">Show Only</h4>
						<label className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-50 transition cursor-pointer">
							<Checkbox
								checked={managedOnly}
								onCheckedChange={() => setManagedOnly((p) => !p)}
							/>
							<span className="text-sm font-medium text-slate-700">
								Managed Homes Only
							</span>
						</label>
					</div>

					{/* ✅ Mobile buttons */}
					{isMobile && (
						<div className="flex gap-3 pt-2">
							<Button
								variant="outline"
								className="w-full rounded-xl"
								onClick={clearFilters}
							>
								Clear
							</Button>
							<Button
								variant="teal"
								className="w-full rounded-xl"
								onClick={() => setShowFilters(false)}
							>
								Apply
							</Button>
						</div>
					)}
				</div>
			) : (
				/* ========================= PREMIUM FILTERS (NO BROKER STYLE UI) ========================= */
				<div className="mt-5 space-y-6">
					{/* Built Up Area */}
					<div className="space-y-3">
						<h4 className="text-sm font-bold text-slate-900">
							Built Up Area (sq.ft.)
						</h4>
						<div className="bg-white border border-slate-200 rounded-xl px-4 py-4">
							<Slider min={0} max={10000} step={100} value={[0, 10000]} />
							<div className="mt-4 flex gap-3">
								<input
									className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
									placeholder="0"
								/>
								<input
									className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
									placeholder="10,000"
								/>
							</div>
						</div>
					</div>

					{/* Property Age */}
					<div className="space-y-3">
						<h4 className="text-sm font-bold text-slate-900">Property Age</h4>
						<div className="grid grid-cols-2 gap-2">
							{['< 1 year', '< 3 years', '< 5 years', '< 10 years'].map((t) => (
								<button
									key={t}
									type="button"
									className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
								>
									{t}
								</button>
							))}
						</div>
					</div>

					{/* Show Only */}
					<div className="space-y-3">
						<h4 className="text-sm font-bold text-slate-900">Show Only</h4>
						<div className="grid grid-cols-2 gap-2">
							{['Gated Societies', 'Non Veg Allowed', 'With Photos', 'Gym'].map(
								(t) => (
									<button
										key={t}
										type="button"
										className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
									>
										{t}
									</button>
								),
							)}
						</div>
					</div>

					{/* Bathroom */}
					<div className="space-y-3">
						<h4 className="text-sm font-bold text-slate-900">Bathroom</h4>
						<div className="flex flex-wrap gap-2">
							{['1 or more', '2 or more', '3 or more'].map((t) => (
								<button
									key={t}
									type="button"
									className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
								>
									{t}
								</button>
							))}
						</div>
					</div>

					{/* Floors */}
					<div className="space-y-3">
						<h4 className="text-sm font-bold text-slate-900">Floors</h4>
						<div className="grid grid-cols-3 gap-2">
							{[
								'Ground',
								'1 to 3',
								'4 to 6',
								'7 to 9',
								'10 & above',
								'Custom',
							].map((t) => (
								<button
									key={t}
									type="button"
									className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
								>
									{t}
								</button>
							))}
						</div>
					</div>

					{/* ✅ Mobile buttons */}
					{isMobile && (
						<div className="flex gap-3 pt-2">
							<Button
								variant="outline"
								className="w-full rounded-xl"
								onClick={() => setShowFilters(false)}
							>
								Close
							</Button>
							<Button
								variant="teal"
								className="w-full rounded-xl"
								onClick={() => setShowFilters(false)}
							>
								Apply
							</Button>
						</div>
					)}
				</div>
			)}
		</div>
	);

	return (
		<Layout>
			{/* HERO */}
			<div className="w-full bg-gradient-to-b from-blue-100 via-white to-white -mt-24 pt-24">
				<div className="container-custom py-20 text-center min-h-[140px] flex flex-col justify-center">
					<h1
						key={headlineIndex}
						className="text-3xl md:text-5xl font-semibold text-[#42949c] transition-all duration-700 ease-in-out leading-tight md:leading-snug tracking-tight"
					>
						{headlines[headlineIndex]}
					</h1>

					<p className="text-lg text-muted-foreground mt-2">
						Showing {finalProperties.length} properties
					</p>

					<div className="flex justify-center gap-2 mt-4">
						{headlines.map((_, i) => (
							<span
								key={i}
								className={cn(
									'h-2 rounded-full transition-all',
									i === headlineIndex ? 'w-6 bg-[#42949c]' : 'w-2 bg-blue-300',
								)}
							/>
						))}
					</div>
				</div>
			</div>

			{/* CONTENT */}
			<div className="container-custom pb-10 pt-0">
				{/* TOP BAR */}
				<div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
					{/* view */}
					<div className="flex gap-2">
						<button
							onClick={() => setView('grid')}
							className={cn(
								'p-2 rounded-xl border bg-white shadow-sm hover:shadow-md transition',
								view === 'grid' && 'bg-blue-600 text-white border-blue-600',
							)}
						>
							<LayoutGrid size={18} />
						</button>

						<button
							onClick={() => setView('list')}
							className={cn(
								'p-2 rounded-xl border bg-white shadow-sm hover:shadow-md transition',
								view === 'list' && 'bg-blue-600 text-white border-blue-600',
							)}
						>
							<List size={18} />
						</button>
					</div>

					{/* sort (NoBroker style dropdown) */}
					<div className="relative">
						<button
							onClick={() => setOpenSort((p) => !p)}
							className="px-4 py-2 rounded-lg border bg-white shadow-sm hover:shadow-md transition text-sm flex items-center gap-2"
						>
							<ArrowUpDown className="w-4 h-4 text-slate-500" />
							Sort By
							<ChevronDown
								className={cn('w-4 h-4 transition', openSort && 'rotate-180')}
							/>
						</button>

						{openSort && (
							<div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">
								<button
									onClick={() => {
										setSortBy('price_low');
										setOpenSort(false);
									}}
									className={cn(
										'w-full text-left px-4 py-3 hover:bg-slate-50 text-sm',
										sortBy === 'price_low' && 'bg-slate-50 font-semibold',
									)}
								>
									Rent (Low to High)
								</button>

								<button
									onClick={() => {
										setSortBy('price_high');
										setOpenSort(false);
									}}
									className={cn(
										'w-full text-left px-4 py-3 hover:bg-slate-50 text-sm',
										sortBy === 'price_high' && 'bg-slate-50 font-semibold',
									)}
								>
									Rent (High to Low)
								</button>

								<button
									onClick={() => {
										setSortBy('');
										setOpenSort(false);
									}}
									className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm text-slate-600"
								>
									Clear Sort
								</button>
							</div>
						)}
					</div>

					{/* mobile filter */}
					<Button
						variant="outline"
						className="lg:hidden rounded-lg"
						onClick={() => setShowFilters(true)}
					>
						<Filter className="w-4 h-4 mr-2" /> Filters
					</Button>
				</div>

				<div className="grid lg:grid-cols-[320px_1fr] gap-8">
					{/* ✅ DESKTOP FILTERS (NoBroker style) */}
					<aside className="hidden lg:block">
						<div className="bg-white rounded-xl border border-slate-200 shadow-sm sticky top-24">
							<div className="p-4 border-b border-slate-200">
								<h3 className="text-sm font-bold text-slate-900">Filters</h3>
							</div>
							<div className="p-4">
								<FiltersPanel />
							</div>
						</div>
					</aside>

					{/* ✅ MOBILE FILTER DRAWER */}
					{showFilters && (
						<div className="fixed inset-0 z-[9999] lg:hidden">
							{/* overlay */}
							<div
								className="absolute inset-0 bg-black/40"
								onClick={() => setShowFilters(false)}
							/>
							{/* sheet */}
							<div className="absolute left-0 top-0 bottom-0 w-[92%] max-w-[360px] bg-white shadow-2xl">
								<div className="p-4 border-b flex items-center justify-between">
									<h3 className="text-base font-bold">Filters</h3>
									<button
										onClick={() => setShowFilters(false)}
										className="p-2 rounded-lg border bg-white"
									>
										<X className="w-4 h-4" />
									</button>
								</div>

								<div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
									<FiltersPanel isMobile />
								</div>
							</div>
						</div>
					)}

					{/* PROPERTIES */}
					<div>
						{loading && <p>Loading...</p>}
						{error && <p className="text-red-500">{error}</p>}

						<div
							className={cn(
								view === 'grid'
									? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
									: 'space-y-6',
							)}
						>
							{finalProperties.map((property, i) => (
								<div
									key={property.id ?? i}
									className="animate-slideUp"
									style={{ animationDelay: `${i * 80}ms` }}
								>
									<PropertyCard property={property} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`}</style>
		</Layout>
	);
};

export default AllPropertiesPage;
