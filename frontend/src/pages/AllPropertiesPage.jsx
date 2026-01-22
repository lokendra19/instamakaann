import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import api from '@/lib/api';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Filter } from 'lucide-react';

const AllPropertiesPage = () => {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	/* ================= FILTER STATES ================= */
	const [propertyTypes, setPropertyTypes] = useState([]);
	const [beds, setBeds] = useState([]);
	const [furnishing, setFurnishing] = useState([]);
	const [managedOnly, setManagedOnly] = useState(false);

	const [priceRange, setPriceRange] = useState([0, 50000]);
	const [showFilters, setShowFilters] = useState(false);

	/* ================= FETCH PROPERTIES ================= */
	useEffect(() => {
		const fetchProperties = async () => {
			try {
				const res = await api.get('/properties/');
				setProperties(res.data);
			} catch (err) {
				setError('Failed to load properties');
			} finally {
				setLoading(false);
			}
		};

		fetchProperties();
	}, []);

	/* ================= PRICE RANGE CALC ================= */
	const maxRent = useMemo(() => {
		const rents = properties
			.map((p) => p.monthly_rent_amount)
			.filter(Boolean);
		return rents.length ? Math.max(...rents) : 50000;
	}, [properties]);

	useEffect(() => {
		setPriceRange([0, maxRent]);
	}, [maxRent]);

	/* ================= FILTER LOGIC ================= */
	const filteredProperties = useMemo(() => {
		return properties.filter((p) => {
			// Property Type
			if (propertyTypes.length && !propertyTypes.includes(p.property_type))
				return false;

			// Beds
			if (beds.length && !beds.includes(p.beds)) return false;

			// Furnishing
			if (furnishing.length && !furnishing.includes(p.furnishing))
				return false;

			// Managed
			if (managedOnly && !p.is_managed) return false;

			// Price (ONLY RENT / PRE-OCCUPIED)
			if (p.property_type !== 'buy' && p.monthly_rent_amount) {
				if (
					p.monthly_rent_amount < priceRange[0] ||
					p.monthly_rent_amount > priceRange[1]
				)
					return false;
			}

			return true;
		});
	}, [properties, propertyTypes, beds, furnishing, managedOnly, priceRange]);

	/* ================= HELPERS ================= */
	const toggleArray = (value, setFn) => {
		setFn((prev) =>
			prev.includes(value)
				? prev.filter((v) => v !== value)
				: [...prev, value],
		);
	};

	return (
		<Layout>
			<div className="container-custom py-10">
				{/* HEADER */}
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-semibold">All Properties</h1>

					<Button
						variant="outline"
						className="lg:hidden"
						onClick={() => setShowFilters(true)}
					>
						<Filter className="w-4 h-4 mr-2" />
						Filters
					</Button>
				</div>

				<div className="grid lg:grid-cols-[280px_1fr] gap-8">
					{/* ================= FILTER SIDEBAR ================= */}
					<aside
						className={cn(
							'bg-white dark:bg-[#0b1220] rounded-2xl p-6 shadow-sm space-y-8',
							'scrollbar-hide',
							showFilters
								? 'fixed inset-0 z-50 overflow-y-auto lg:static'
								: 'hidden lg:block',
						)}
					>
						{/* MOBILE CLOSE */}
						<div className="flex justify-between lg:hidden mb-4">
							<h3 className="font-semibold">Filters</h3>
							<button onClick={() => setShowFilters(false)}>✕</button>
						</div>

						{/* PROPERTY TYPE */}
						<div>
							<h4 className="font-medium mb-3">Property Type</h4>
							{['rent', 'pre-occupied', 'buy'].map((type) => (
								<label key={type} className="flex items-center gap-3 mb-2">
									<Checkbox
										checked={propertyTypes.includes(type)}
										onCheckedChange={() =>
											toggleArray(type, setPropertyTypes)
										}
									/>
									<span className="capitalize">{type}</span>
								</label>
							))}
						</div>

						{/* PRICE SLIDER */}
						<div>
							<h4 className="font-medium mb-3">Monthly Rent</h4>
							<Slider
								min={0}
								max={maxRent}
								step={1000}
								value={priceRange}
								onValueChange={setPriceRange}
							/>
							<p className="text-sm mt-2 text-muted-foreground">
								₹{priceRange[0]} – ₹{priceRange[1]}
							</p>
						</div>

						{/* BEDS */}
						<div>
							<h4 className="font-medium mb-3">BHK</h4>
							{[1, 2, 3, 4].map((b) => (
								<label key={b} className="flex items-center gap-3 mb-2">
									<Checkbox
										checked={beds.includes(b)}
										onCheckedChange={() => toggleArray(b, setBeds)}
									/>
									<span>{b}+ BHK</span>
								</label>
							))}
						</div>

						{/* FURNISHING */}
						<div>
							<h4 className="font-medium mb-3">Furnishing</h4>
							{['furnished', 'semi-furnished', 'unfurnished'].map((f) => (
								<label key={f} className="flex items-center gap-3 mb-2">
									<Checkbox
										checked={furnishing.includes(f)}
										onCheckedChange={() => toggleArray(f, setFurnishing)}
									/>
									<span className="capitalize">{f}</span>
								</label>
							))}
						</div>

						{/* MANAGED */}
						<div>
							<label className="flex items-center gap-3">
								<Checkbox
									checked={managedOnly}
									onCheckedChange={() => setManagedOnly((p) => !p)}
								/>
								<span>Managed Properties Only</span>
							</label>
						</div>
					</aside>

					{/* ================= PROPERTIES GRID ================= */}
					<div>
						{loading && <p>Loading properties...</p>}
						{error && <p className="text-red-500">{error}</p>}

						{!loading && filteredProperties.length === 0 && (
							<p className="text-muted-foreground">
								No properties match your filters.
							</p>
						)}

						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredProperties.map((property) => (
								<PropertyCard key={property.id} property={property} />
							))}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default AllPropertiesPage;