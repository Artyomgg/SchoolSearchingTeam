import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import '../css/header.css'

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const location = useLocation()

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const closeMenu = () => {
		setIsMenuOpen(false)
	}

	// Обработчик скролла
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Закрытие меню при изменении роута
	useEffect(() => {
		closeMenu()
	}, [location.pathname])

	return (
		<header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
			<nav className='navigation'>
				<div className='nav-container'>
					{/* Логотип */}
					<NavLink
						to='/'
						className={({ isActive }) => (isActive ? 'nav-logo active' : 'nav-logo')}
						onClick={closeMenu}
					>
						<div className='logo-icon'>
							<img src='/img/медаль1.png' alt='Логотип поискового отряда' />
						</div>
						<div className='logo-text'>
							<span className='logo-title'>"Мы этой памяти верны"</span>
							<span className='logo-subtitle'>Поисковый отряд школы №30</span>
						</div>
					</NavLink>

					{/* Мобильное меню кнопка */}
					<button
						className='mobile-menu-btn'
						onClick={toggleMenu}
						aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
						aria-expanded={isMenuOpen}
					>
						<span className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
							<span></span>
							<span></span>
							<span></span>
						</span>
					</button>

					{/* Навигация */}
					<div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
						<NavLink
							to='/'
							className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
							onClick={closeMenu}
							end
						>
							<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
								<path
									d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
									stroke='currentColor'
									strokeWidth='2'
								/>
								<polyline points='9 22 9 12 15 12 15 22' stroke='currentColor' strokeWidth='2' />
							</svg>
							Главная
						</NavLink>
						<NavLink
							to='/about'
							className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
							onClick={closeMenu}
						>
							<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
								<circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
								<path
									d='M12 16v-4M12 8h.01'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
								/>
							</svg>
							О нас
						</NavLink>
						<NavLink
							to='/join'
							className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
							onClick={closeMenu}
						>
							<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
								<path
									d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'
									stroke='currentColor'
									strokeWidth='2'
								/>
								<circle cx='8.5' cy='7' r='4' stroke='currentColor' strokeWidth='2' />
								<path d='M20 8v6M23 11h-6' stroke='currentColor' strokeWidth='2' />
							</svg>
							Вступить
						</NavLink>
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Header
