import React, { useState } from 'react';
import ContactPopup from './ContactPopup';

const FloatingContactButton = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* FLOATING BUTTON */}
			<button
				onClick={() => setOpen(true)}
				className="
					fixed bottom-4 right-4
					md:bottom-6 md:right-6
					z-50
					flex items-center gap-2
					bg-[#2f7f7b] hover:bg-[#256c69]
					text-white
					px-4 py-2.5
					md:px-6 md:py-3
					rounded-full
					shadow-xl
					transition-all
					text-sm md:text-base
				"
			>
				<img
					src="/images/support.png"
					alt="Support"
					className="w-4 h-4 md:w-5 md:h-5 object-contain"
				/>
				<span className="font-medium">Find Your Perfect Home</span>
			</button>

			{/* POPUP */}
			<ContactPopup open={open} onClose={() => setOpen(false)} />
		</>
	);
};

export default FloatingContactButton;
