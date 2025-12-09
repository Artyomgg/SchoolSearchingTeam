import { useEffect, useState } from 'react'
import '../css/home.css'

function Home() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	// Примерные изображения для слайдера (замените на реальные фото отряда)
	const heroImages = [
		'url("https://www.belarus.by/dadvimages/001574_536944.jpghttps://upload.wikimedia.org/wikipedia/commons/5/51/Brest_Brest_Fortress_Kholm_Gate_9209_2150.jpg")', // Свечи, памятник
		'url("https://avatars.mds.yandex.net/get-altay/1608507/2a00000168a85cad22cdfedf3f417ddb6885/L_height")', // Поле, рассвет
		'url("https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")', // Вечный огонь
	]

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex(prevIndex => (prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1))
		}, 5000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className='home-page'>
			{/* Герой-секция с параллаксом */}
			<section className='hero-section' style={{ backgroundImage: heroImages[currentImageIndex] }}>
				<div className='hero-overlay'>
					<div className='hero-content'>
						<h1 className='hero-title'>
							<span>Поисковый отряд</span>
							<span>"Мы этой памяти верны"</span>
						</h1>
						<p className='hero-subtitle'>Средняя школа №30 г. Минска</p>
						<div className='hero-quote'>
							<p>"Никто не забыт, ничто не забыто"</p>
						</div>
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

				{/* Последние мероприятия */}
				<section className='events-section'>
					<div className='container'>
						<h2>Последние мероприятия</h2>
						<div className='events-grid'>
							<article className='event-card'>
								<div className='event-date'>
									<span className='day'>15</span>
									<span className='month'>Окт</span>
								</div>
								<div className='event-content'>
									<h3>Экспедиция "Осень-2024"</h3>
									<p>Поисковые работы в Мядельском районе</p>
									<span className='event-tag'>Завершено</span>
								</div>
							</article>
							<article className='event-card'>
								<div className='event-date'>
									<span className='day'>03</span>
									<span className='month'>Нояб</span>
								</div>
								<div className='event-content'>
									<h3>Встреча с ветеранами</h3>
									<p>Торжественное мероприятие в школьном музее</p>
									<span className='event-tag'>Завершено</span>
								</div>
							</article>
							<article className='event-card'>
								<div className='event-date'>
									<span className='day'>20</span>
									<span className='month'>Дек</span>
								</div>
								<div className='event-content'>
									<h3>Подготовка к зимней экспедиции</h3>
									<p>Сбор и проверка снаряжения</p>
									<span className='event-tag'>Планируется</span>
								</div>
							</article>
						</div>
					</div>
				</section>

				{/* Статистика */}
				<section className='stats-section'>
					<div className='container'>
						<div className='stats-grid'>
							<div className='stat-item'>
								<div className='stat-number'>15+</div>
								<div className='stat-label'>проведённых экспедиций</div>
							</div>
							<div className='stat-item'>
								<div className='stat-number'>50+</div>
								<div className='stat-label'>найденных артефактов</div>
							</div>
							<div className='stat-item'>
								<div className='stat-number'>12</div>
								<div className='stat-label'>установленных имён</div>
							</div>
							<div className='stat-item'>
								<div className='stat-number'>30+</div>
								<div className='stat-label'>активных участников</div>
							</div>
						</div>
					</div>
				</section>

				{/* Цитата */}
				<section className='quote-section'>
					<div className='container'>
						<blockquote>
							<p>
								"Память о прошлом — это не просто свойство человеческого сознания. Это способность
								сохранять следы минувшего, без которой невозможно движение вперёд."
							</p>
							<footer>— Из хроник поискового отряда</footer>
						</blockquote>
					</div>
				</section>

				{/* Призыв к действию */}
				<section className='cta-section'>
					<div className='container'>
						<h2>Хочешь стать частью отряда?</h2>
						<p>Присоединяйся к нам и помоги сохранить память о героях</p>
						<div className='cta-buttons'>
							<button className='btn-primary'>Вступить в отряд</button>
							<button className='btn-secondary'>Узнать больше</button>
						</div>
					</div>
				</section>
			</main>

			{/* Футер */}
			<footer className='main-footer'>
				<div className='container'>
					<div className='footer-content'>
						<div className='footer-info'>
							<h3>Поисковый отряд "Мы этой памяти верны"</h3>
							<p>ГУО "Средняя школа №30 г. Минска"</p>
							<p>г. Минск, ул. Жуковского, 11</p>
						</div>
						<div className='footer-contact'>
							<p>Руководитель: </p>
							<p>Email: search.team@school30.by</p>
							<p>Телефон: +375 (17) XXX-XX-XX</p>
						</div>
					</div>
					<div className='footer-bottom'>
						<p>
							© {new Date().getFullYear()} Поисковый отряд "Мы этой памяти верны". Все права
							защищены.
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Home
