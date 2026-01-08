import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

function Home() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [currentSlideTitle, setCurrentSlideTitle] = useState('')
	const [isTitleChanging, setIsTitleChanging] = useState(false)
	const navigate = useNavigate()
	const prevTitleRef = useRef('')

	// Реальные тематические изображения для поискового отряда
	const heroImages = [
		'url("https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Brest_Brest_Fortress_Kholm_Gate_9209_2150.jpg/1920px-Brest_Brest_Fortress_Kholm_Gate_9209_2150.jpg")',
		'url("https://avatars.mds.yandex.net/get-altay/1608507/2a00000168a85cad22cdfedf3f417ddb6885/XXL_height")',
		'url("/img/narodnoe-vozlozhenie_6_09.05.2025.jpg")',
		'url("/img/докумнтыпоиски.jpg")',
		'url("/img/30поиски.jpg")',
		'url("/img/hatyn-54075.jpg")',
	]

	const slideTitles = [
		'Брестская крепость - символ мужества',
		'Вечный огонь - память поколений',
		'Участие в военных парадах',
		'Поисковые работы - восстановление имён',
		'Поисковые работы - восстановление имён',
		'Хатынь - память о трагедии',
	]

	// Инициализация текущего заголовка
	useEffect(() => {
		setCurrentSlideTitle(slideTitles[0])
		prevTitleRef.current = slideTitles[0]
	}, [])

	const nextSlide = useCallback(() => {
		const nextIndex = currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1
		const currentTitle = slideTitles[currentImageIndex]
		const nextTitle = slideTitles[nextIndex]

		// Если заголовки совпадают - просто меняем фото
		if (currentTitle === nextTitle) {
			setCurrentImageIndex(nextIndex)
		} else {
			// Если заголовки разные - анимируем смену
			setIsTitleChanging(true)
			setTimeout(() => {
				setCurrentSlideTitle(nextTitle)
				setCurrentImageIndex(nextIndex)
				prevTitleRef.current = nextTitle
				setTimeout(() => setIsTitleChanging(false), 10)
			}, 300)
		}
	}, [currentImageIndex, heroImages.length])

	const prevSlide = useCallback(() => {
		const prevIndex = currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1
		const currentTitle = slideTitles[currentImageIndex]
		const prevTitle = slideTitles[prevIndex]

		// Если заголовки совпадают - просто меняем фото
		if (currentTitle === prevTitle) {
			setCurrentImageIndex(prevIndex)
		} else {
			// Если заголовки разные - анимируем смену
			setIsTitleChanging(true)
			setTimeout(() => {
				setCurrentSlideTitle(prevTitle)
				setCurrentImageIndex(prevIndex)
				prevTitleRef.current = prevTitle
				setTimeout(() => setIsTitleChanging(false), 10)
			}, 300)
		}
	}, [currentImageIndex, heroImages.length])

	const goToSlide = useCallback(
		index => {
			const currentTitle = slideTitles[currentImageIndex]
			const newTitle = slideTitles[index]

			// Если заголовки совпадают - просто меняем фото
			if (currentTitle === newTitle) {
				setCurrentImageIndex(index)
			} else {
				// Если заголовки разные - анимируем смену
				setIsTitleChanging(true)
				setTimeout(() => {
					setCurrentSlideTitle(newTitle)
					setCurrentImageIndex(index)
					prevTitleRef.current = newTitle
					setTimeout(() => setIsTitleChanging(false), 10)
				}, 300)
			}
		},
		[currentImageIndex]
	)

	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide()
		}, 6000)
		return () => clearInterval(interval)
	}, [nextSlide])

	return (
		<div className='home-page'>
			{/* Герой-секция с улучшенным слайдером */}
			<section className='hero-section'>
				<div
					className='hero-background'
					style={{ backgroundImage: heroImages[currentImageIndex] }}
				></div>

				<div className='hero-overlay'>
					<div className='hero-content'>
						<div className='hero-title-wrapper'>
							<h1 className='hero-title'>
								<span>Поисковый отряд</span>
								<span>"Мы этой памяти верны"</span>
							</h1>
							<p className='hero-subtitle'>Средняя школа №30 г. Минска</p>
							<div className='slide-title'>
								<h2 className={isTitleChanging ? 'title-fade-out' : 'title-fade-in'}>
									{currentSlideTitle}
								</h2>
							</div>
						</div>

						<div className='hero-quote'>
							<p>"Никто не забыт, ничто не забыто"</p>
						</div>
					</div>

					{/* Элементы управления слайдером */}
					<button className='slider-btn prev-btn' onClick={prevSlide}>
						<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
							<path
								d='M15 18L9 12L15 6'
								stroke='white'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
					<button className='slider-btn next-btn' onClick={nextSlide}>
						<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
							<path
								d='M9 18L15 12L9 6'
								stroke='white'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>

					{/* Индикаторы слайдов */}
					<div className='slider-indicators'>
						{heroImages.map((_, index) => (
							<button
								key={index}
								className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
								onClick={() => goToSlide(index)}
								aria-label={`Перейти к слайду ${index + 1}`}
							/>
						))}
					</div>
				</div>

				<div className='scroll-indicator'>
					<span>↓</span>
				</div>
			</section>

			{/* Основное содержание */}
			<main className='main-content'>
				{/* Миссия отряда */}
				<section className='mission-section'>
					<div className='container'>
						<h2>Наша Миссия</h2>
						<div className='mission-cards'>
							<div className='mission-card'>
								<div className='icon'>🔍</div>
								<h3>Поиск</h3>
								<p>Восстановление имён и судеб павших защитников Отечества</p>
							</div>
							<div className='mission-card'>
								<div className='icon'>🎓</div>
								<h3>Образование</h3>
								<p>Патриотическое воспитание молодого поколения</p>
							</div>
							<div className='mission-card'>
								<div className='icon'>🤝</div>
								<h3>Память</h3>
								<p>Сохранение исторической памяти о Великой Отечественной войне</p>
							</div>
						</div>
					</div>
				</section>

				{/* Ветераны - новая секция */}
				<section className='veterans-section'>
					<div className='container'>
						<div className='section-header'>
							<h2>Восстановленные истории</h2>
						</div>

						<div className='veterans-stats'>
							<div className='veteran-stat-card'>
								<div className='stat-icon'>🎖️</div>
								<div className='stat-content'>
									<div className='stat-number'>10</div>
									<div className='stat-label'>установленных имён</div>
									<p className='stat-description'>Полностью восстановлены биографии солдат</p>
								</div>
							</div>
						</div>

						<div className='veterans-featured'>
							<div className='featured-veteran'>
								<div className='veteran-photo'>
									<div className='photo-placeholder'>🎖️</div>
								</div>
								<div className='veteran-info'>
									<h3>Москалев Дмитрий Яковлевич</h3>
									<p className='veteran-rank'>Рядовой</p>
									<p className='veteran-story'>
										Из благодарности: " пулемётчика пулемётные роты гв. красноармейца Москалева
										Дмитрия Яковлевича за проявленную смелость и отвагу в бою Работая пулемётчиком в
										1624 Зенитном Артиллерийском полку обеспечил сбитие одного самолёта противника"
										в РККА с 03.09.1943 года
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Статистика */}
				<section className='stats-section'>
					<div className='container'>
						<h2>Наша статистика за 2025 год</h2>
						<div className='stats-grid'>
							<div className='stat-item'>
								<div className='stat-icon'>🎖️</div>
								<div className='stat-number'>10</div>
								<div className='stat-label'>установленных имён</div>
							</div>
						</div>
					</div>
				</section>

				{/* Цитата */}
				<section className='quote-section'>
					<div className='container'>
						<blockquote>
							<p>
								"Каждый найденный солдат, каждое установленное имя — это победа над забвением, это
								возвращение долга перед теми, кто подарил нам мирное небо."
							</p>
						</blockquote>
					</div>
				</section>

				{/* Призыв к действию */}
				<section className='cta-section'>
					<div className='container'>
						<h2>Хочешь стать частью отряда?</h2>
						<p>Присоединяйся к нам и помоги восстановить историческую справедливость</p>
						<div className='cta-buttons'>
							<button className='btn-primary' onClick={() => navigate('/join')}>
								Вступить в отряд
							</button>
							<button className='btn-secondary' onClick={() => navigate('/about')}>
								Узнать больше
							</button>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}

export default Home
