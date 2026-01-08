function About() {
	const achievements = [{ year: '2025', description: 'Основание поискового отряда' }]

	const teamMembers = [
		{ name: 'Куликова Наталья Николаевна', role: 'Заместитель директора по воспитательной работе' },
		{
			name: 'Варсоба Сергей Олегович',
			role: 'Учитель по военно патриотическому воспитанию',
		},
	]

	return (
		<div className='about-page'>
			{/* Герой-секция */}
			<section className='about-hero'>
				<div className='about-hero-overlay'>
					<div className='container'>
						<h1 className='about-hero-title'>О нашем отряде</h1>
						<p className='about-hero-subtitle'>"Мы этой памяти верны"</p>
						<p className='about-hero-text'>
							Поисковый отряд школы №30 города Минска, посвятивший себя сохранению памяти о героях
							Великой Отечественной войны
						</p>
					</div>
				</div>
			</section>

			{/* Основное содержание */}
			<main className='about-content'>
				{/* Достижения */}
				<section className='achievements-section'>
					<div className='container'>
						<div className='section-header'>
							<h2>Наша история</h2>
						</div>

						<div className='achievements-timeline'>
							{achievements.map((achievement, index) => (
								<div key={index} className='timeline-item'>
									<div className='timeline-year'>{achievement.year}</div>
									<div className='timeline-content'>
										<div className='timeline-dot'></div>
										<p>{achievement.description}</p>
									</div>
								</div>
							))}
						</div>

						<div className='achievements-stats'>
							<div className='achievement-stat'>
								<div className='stat-number'>3</div>
								<div className='stat-label'>участников</div>
							</div>

							<div className='achievement-stat'>
								<div className='stat-number'>10</div>
								<div className='stat-label'>установленных имен</div>
							</div>
						</div>
					</div>
				</section>

				{/* Команда */}
				<section className='team-section'>
					<div className='container'>
						<div className='section-header'>
							<h2>Наша команда</h2>
							<p className='section-subtitle'>Профессионалы, которые ведут за собой</p>
						</div>

						<div className='team-grid'>
							{teamMembers.map((member, index) => (
								<div key={index} className='team-member'>
									<div className='member-photo'>
										<div className='photo-placeholder'>👤</div>
									</div>
									<div className='member-info'>
										<h3>{member.name}</h3>
										<p className='member-role'>{member.role}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Цели и задачи */}
				<section className='goals-section'>
					<div className='container'>
						<div className='section-header'>
							<h2>Наши цели и задачи</h2>
						</div>

						<div className='goals-grid'>
							<div className='goal-card'>
								<div className='goal-icon'>🎯</div>
								<h3>Основная цель</h3>
								<p>
									Сохранение исторической памяти о событиях Великой Отечественной войны через
									практическую поисковую работу и патриотическое воспитание молодежи.
								</p>
							</div>

							<div className='goal-card'>
								<div className='goal-icon'>📋</div>
								<h3>Задачи отряда</h3>
								<ul>
									<li>Поиск и эксгумация останков воинов</li>
									<li>Установление имен павших солдат</li>
									<li>Сохранение и реставрация находок</li>
									<li>Патриотическое воспитание учащихся</li>
									<li>Сотрудничество с поисковыми организациями</li>
								</ul>
							</div>

							<div className='goal-card'>
								<div className='goal-icon'>🤝</div>
								<h3>Принципы работы</h3>
								<ul>
									<li>Уважение к памяти павших</li>
									<li>Научный подход к поиску</li>
									<li>Безопасность участников</li>
									<li>Легальность всех действий</li>
									<li>Открытость и прозрачность</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* Контактная информация */}
				<section className='contact-section'>
					<div className='container'>
						<div className='section-header'>
							<h2>Контактная информация</h2>
						</div>

						<div className='contact-grid'>
							<div className='contact-info'>
								<h3>Где нас найти</h3>
								<div className='contact-details'>
									<p>
										<strong>Адрес школы:</strong> г. Минск, ул. Жуковского, 11
									</p>
									<p>
										<strong>Кабинет отряда:</strong> 334 a
									</p>
									<p>
										<strong>Время работы:</strong> Понедельник-Пятница
									</p>
									<p>
										<strong>Email:</strong> school30pamyat@gmail.com
									</p>
								</div>
							</div>

							<div className='map-placeholder'>
								<div className='map-content'>
									<p>📍 Средняя школа №30</p>
									<p>г. Минск, ул. Жуковского, 11</p>
									<div className='map-image'>
										<iframe
											src='https://yandex.ru/map-widget/v1/?um=constructor%3Ae9cdabd87e70c176196bba136de083c56a23c7678b402870ff23937c9538e85c&amp;source=constructor'
											width='100%'
											height='394'
											frameBorder='0'
											title='Карта расположения школы'
										></iframe>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}

export default About
