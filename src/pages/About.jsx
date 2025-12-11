import '../css/about.css'

function About() {
	const achievements = [
		{ year: '2024', description: 'Установлено 12 имён павших солдат' },
		{ year: '2023', description: 'Проведено 8 поисковых экспедиций' },
		{ year: '2022', description: 'Создан школьный музей боевой славы' },
		{ year: '2021', description: 'Найдены родственники 5 воинов' },
		{ year: '2020', description: 'Основание поискового отряда' },
	]

	const teamMembers = [
		{ name: '[ФИО]', role: 'Руководитель отряда', experience: '15 лет поисковой работы' },
		{ name: '[ФИО]', role: 'Педагог-организатор', experience: 'Историк, куратор музея' },
		{ name: '[ФИО]', role: 'Инструктор по туризму', experience: 'Специалист по выживанию' },
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
				{/* История отряда */}
				<section className='history-section'>
					<div className='container'>
						<div className='section-header'>
							<h2>Наша история</h2>
							<p className='section-subtitle'>Путь длиною в пять лет поиска и памяти</p>
						</div>

						<div className='history-content'>
							<div className='history-text'>
								<p>
									Поисковый отряд "Мы этой памяти верны" был основан в 2020 году на базе средней
									школы №30 города Минска. Инициатором создания отряда выступили учителя истории
									совместно с активными учащимися, которые осознали важность сохранения памяти о
									событиях Великой Отечественной войны.
								</p>
								<p>
									За годы существования отряд вырос из небольшой группы энтузиастов в серьезную
									организацию, которая ведет системную работу по поиску и установлению имен павших
									защитников Отечества. Наши поисковики работают в тесном сотрудничестве с 52-м
									отдельным специализированным поисковым батальоном Министерства обороны Республики
									Беларусь.
								</p>
								<p>
									Каждая экспедиция - это не только поисковые работы, но и уроки мужества,
									патриотизма и уважения к истории нашей страны.
								</p>
							</div>

							<div className='history-image'>
								<img
									src='/img/history-team.jpg'
									alt='История отряда'
									onError={e => {
										e.target.style.display = 'none'
										e.target.parentNode.innerHTML = '<div class="image-placeholder">📜</div>'
									}}
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Достижения */}
				<section className='achievements-section'>
					<div className='container'>
						<div className='section-header'>
							<h2>Наши достижения</h2>
							<p className='section-subtitle'>То, чем мы гордимся</p>
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
								<div className='stat-number'>50+</div>
								<div className='stat-label'>участников за все время</div>
							</div>
							<div className='achievement-stat'>
								<div className='stat-number'>25+</div>
								<div className='stat-label'>проведенных экспедиций</div>
							</div>
							<div className='achievement-stat'>
								<div className='stat-number'>100+</div>
								<div className='stat-label'>найденных артефактов</div>
							</div>
							<div className='achievement-stat'>
								<div className='stat-number'>12</div>
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
										<p className='member-experience'>{member.experience}</p>
										<p className='member-description'>
											Опытный специалист, посвятивший себя поисковой работе и патриотическому
											воспитанию молодежи.
										</p>
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

				{/* Партнеры */}
				<section className='partners-section'>
					<div className='container'>
						<div className='section-header'>
							<h2>Наши партнеры</h2>
							<p className='section-subtitle'>Организации, с которыми мы сотрудничаем</p>
						</div>

						<div className='partners-grid'>
							<div className='partner-card'>
								<div className='partner-logo'>52-й ОСПБ</div>
								<h4>52-й отдельный специализированный поисковый батальон</h4>
								<p>Министерство обороны Республики Беларусь</p>
							</div>

							<div className='partner-card'>
								<div className='partner-logo'>БРСМ</div>
								<h4>Белорусский республиканский союз молодежи</h4>
								<p>Минский городской комитет</p>
							</div>

							<div className='partner-card'>
								<div className='partner-logo'>ВетОрг</div>
								<h4>Совет ветеранов Фрунзенского района</h4>
								<p>Ветеранская организация г. Минска</p>
							</div>

							<div className='partner-card'>
								<div className='partner-logo'>ИстФонд</div>
								<h4>Фонд "Историческая память"</h4>
								<p>Научно-исследовательская организация</p>
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
										<strong>Кабинет отряда:</strong> [номер кабинета]
									</p>
									<p>
										<strong>Время работы:</strong> Понедельник-Пятница, 15:00-18:00
									</p>
									<p>
										<strong>Телефон:</strong> +375 (17) XXX-XX-XX
									</p>
									<p>
										<strong>Email:</strong> search.team@school30.by
									</p>
								</div>
							</div>

							<div className='map-placeholder'>
								<div className='map-content'>
									<p>📍 Средняя школа №30</p>
									<p>г. Минск, ул. Жуковского, 11</p>
									<div className='map-image'>
										{/* Здесь можно добавить карту */}
										<div className='map-fallback'>Карта расположения школы</div>
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
