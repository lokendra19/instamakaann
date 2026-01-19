import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CustomIcon from '@/components/CustomIcon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, Sun, Moon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
	{ name: 'Home', path: '/' },
	{ name: 'Partner With Us', path: '/partner' },
	{ name: 'FAQ', path: '/faq' },
];

const moreLinks = [
	{ name: 'Blog', path: '/blog' },
	{ name: 'About Us', path: '/about' },
	{ name: 'Refer & Earn', path: '/refer' },
];

export const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [theme, setTheme] = useState('light');
	const [openMore, setOpenMore] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 8);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') || 'light';
		setTheme(savedTheme);
		document.documentElement.classList.toggle('dark', savedTheme === 'dark');
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		document.documentElement.classList.toggle('dark', newTheme === 'dark');
	};

	const isActive = (path) => location.pathname === path;

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
				isScrolled
					? 'bg-white/90 dark:bg-[#0b1220]/85 backdrop-blur-xl shadow-sm'
					: 'bg-white/80 dark:bg-[#0b1220]/70 backdrop-blur-lg',
			)}
		>
			<div className="container-custom">
				{/* <div className="flex items-center h-14"> */}
				<div className="flex items-center h-14 max-w-7xl mx-auto px-4">
					{/* LOGO */}
					<Link to="/" className="flex items-center gap-2">
						<CustomIcon src="/images/orglogo.png" className="h-8 w-8" />
						<div className="leading-tight">
							<div className="text-sm font-bold text-slate-900 dark:text-teal-400">
								Insta
							</div>
							<div className="text-sm font-bold text-slate-900 dark:text-yellow-400 -mt-1">
								Makaan
							</div>
						</div>
					</Link>

					{/* <div className="ml-auto flex items-center gap-7"> */}
					<div className="flex items-center gap-7 ml-10">
						{/* NAV */}
						<nav className="hidden lg:flex items-center gap-10">
							{navLinks.map((link) => (
								<Link
									key={link.path}
									to={link.path}
									className={cn(
										'text-sm font-medium transition-colors',
										isActive(link.path)
											? 'text-teal-600 dark:text-teal-400'
											: 'text-slate-700 dark:text-slate-300 hover:text-teal-600',
									)}
								>
									{link.name}
								</Link>
							))}

							{/* MORE DROPDOWN */}
							<div className="relative" onMouseLeave={() => setOpenMore(false)}>
								<button
									onMouseEnter={() => setOpenMore(true)}
									className="flex items-center gap-1 text-sm text-slate-700 dark:text-slate-300 hover:text-teal-600"
								>
									More
									<ChevronDown className="w-4 h-4" />
								</button>

								{openMore && (
									<div className="absolute top-full mt-2 w-40 rounded-xl bg-white dark:bg-[#0b1220] border shadow-lg overflow-hidden">
										{moreLinks.map((l) => (
											<Link
												key={l.path}
												to={l.path}
												className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10"
											>
												{l.name}
											</Link>
										))}
									</div>
								)}
							</div>
						</nav>

						{/* ACTIONS */}
						<div className="hidden lg:flex items-center gap-4">
							<Button variant="yellow" size="sm" asChild>
								<Link to="/partner">Get Owners</Link>
							</Button>

							<Button variant="teal" size="sm" asChild>
								<Link to="/contact">Contact Us</Link>
							</Button>

							<button
								onClick={toggleTheme}
								className="w-9 h-9 flex items-center justify-center rounded-full border"
							>
								{theme === 'light' ? (
									<Moon className="w-4 h-4" />
								) : (
									<Sun className="w-4 h-4" />
								)}
							</button>

							<Link
								to="/auth/login"
								className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border"
							>
								<User className="w-4 h-4" />
								Login
							</Link>
						</div>
					</div>

					{/* MOBILE MENU */}
					<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
						<SheetTrigger asChild className="lg:hidden ml-auto">
							<Button variant="ghost" size="icon">
								<Menu className="w-5 h-5" />
							</Button>
						</SheetTrigger>

						<SheetContent side="right" className="w-[300px] p-4">
							<nav className="space-y-2">
								{[...navLinks, ...moreLinks].map((link) => (
									<Link
										key={link.path}
										to={link.path}
										onClick={() => setIsMobileMenuOpen(false)}
										className="block px-4 py-2 rounded-lg"
									>
										{link.name}
									</Link>
								))}

								<Link
									to="/contact"
									className="block mt-3 px-4 py-2 rounded-lg border text-center"
								>
									Contact Us
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
};
