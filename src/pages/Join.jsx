import { useRef, useState } from 'react'
import { Link } from 'react-router'
import '../css/Join.css'

function Join() {
	const [formData, setFormData] = useState({
		fullName: '',
		grade: '',
		phone: '',
		email: '',
		birthDate: '',
		parentName: '',
		parentPhone: '',
		motivation: '',
		experience: '',
		healthInfo: '',
	})

	const [isSubmitted, setIsSubmitted] = useState(false)
	const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
	const [pdfError, setPdfError] = useState(false)
	const pdfContainerRef = useRef(null)

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = e => {
		e.preventDefault()
		// Здесь будет отправка данных на сервер
		console.log('Данные формы:', formData)
		setIsSubmitted(true)
		// Сброс формы
		setTimeout(() => {
			setFormData({
				fullName: '',
				grade: '',
				phone: '',
				email: '',
				birthDate: '',
				parentName: '',
				parentPhone: '',
				motivation: '',
				experience: '',
				healthInfo: '',
			})
			setIsSubmitted(false)
		}, 5000)
	}

	const openDocumentModal = e => {
		e.preventDefault()
		setIsDocumentModalOpen(true)
		setPdfError(false)
	}

	const closeDocumentModal = () => {
		setIsDocumentModalOpen(false)
	}

	const handlePdfError = () => {
		setPdfError(true)
	}

	// Альтернативный текст если PDF не загружается
	const pdfAlternativeText = (
		<div className='pdf-alternative'>
			<h4>СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАТАХ</h4>

			<p>
				<strong>Я, _____________________________________,</strong>
			</p>
			<p>
				<em>(ФИО родителя/опекуна)</em>
			</p>

			<p>являясь законным представителем несовершеннолетнего</p>
			<p>
				<strong>_____________________________________,</strong>
			</p>
			<p>
				<em>(ФИО ребенка)</em>
			</p>

			<p>обучающегося в ГУО "Средняя школа №30 г. Минска",</p>
			<p>
				в классе ______, в соответствии со статьей 9 Закона Республики Беларусь от 07.05.2021 № 99-З
				"О защите персональных данных",
			</p>

			<h4>ДАЮ СОГЛАСИЕ</h4>
			<p>
				поисковому отряду "Мы этой памяти верны" на обработку персональных данных моего ребенка:
			</p>

			<ul>
				<li>Фамилия, имя, отчество</li>
				<li>Дата рождения</li>
				<li>Класс обучения</li>
				<li>Контактные данные (телефон, email)</li>
				<li>Данные о состоянии здоровья (по необходимости)</li>
				<li>Иная информация, необходимая для участия в деятельности отряда</li>
			</ul>

			<h4>Цель обработки:</h4>
			<p>
				участие в деятельности поискового отряда, организация поисковых экспедиций, мероприятий
				патриотической направленности, обеспечение безопасности ребенка.
			</p>

			<h4>Срок действия согласия:</h4>
			<p>на время обучения в школе и участия в деятельности поискового отряда.</p>

			<p>
				Согласие может быть отозвано в любое время путем письменного уведомления руководителя
				отряда.
			</p>

			<div className='signature-block'>
				<p>_____________________</p>
				<p>
					<strong>Подпись</strong>
				</p>
			</div>

			<div className='signature-block'>
				<p>_____________________</p>
				<p>
					<strong>Дата</strong>
				</p>
			</div>
		</div>
	)

	return (
		<div className='join-page'>
			{/* Навигация */}
			<nav className='join-navigation'>
				<div className='nav-container'>
					<Link to='/' className='nav-logo'>
						<span className='logo-icon'>🎖️</span>
						<span className='logo-text'>"Мы этой памяти верны"</span>
					</Link>
					<Link to='/' className='back-to-home'>
						<svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
							<path
								d='M19 12H5M12 19l-7-7 7-7'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						Вернуться на главную
					</Link>
				</div>
			</nav>

			{/* Герой-секция */}
			<section className='join-hero'>
				<div className='join-hero-overlay'>
					<div className='container'>
						<h1 className='join-hero-title'>Стань частью поискового отряда</h1>
						<p className='join-hero-subtitle'>"Мы этой памяти верны"</p>
						<p className='join-hero-text'>
							Заполни анкету и присоединяйся к команде, которая сохраняет историческую память
						</p>
					</div>
				</div>
			</section>

			{/* Основное содержание */}
			<main className='join-content'>
				<div className='container'>
					<div className='join-grid'>
						{/* Форма заявки */}
						<div className='join-form-section'>
							<div className='section-header'>
								<h2>Анкета кандидата</h2>
								<p className='section-subtitle'>Все поля обязательны для заполнения</p>
							</div>

							{isSubmitted ? (
								<div className='success-message'>
									<div className='success-icon'>✓</div>
									<h3>Заявка отправлена успешно!</h3>
									<p>Мы свяжемся с вами в ближайшее время для обсуждения дальнейших шагов.</p>
									<p className='success-note'>
										Принесите заполненное согласие на обработку персональных данных при первом
										посещении отряда
									</p>
								</div>
							) : (
								<form onSubmit={handleSubmit} className='join-form'>
									{/* Личные данные */}
									<div className='form-section'>
										<h3 className='form-section-title'>Личные данные</h3>

										<div className='form-row'>
											<div className='form-group'>
												<label htmlFor='fullName'>Фамилия, Имя, Отчество *</label>
												<input
													type='text'
													id='fullName'
													name='fullName'
													value={formData.fullName}
													onChange={handleChange}
													required
													placeholder='Иванов Иван Иванович'
												/>
											</div>

											<div className='form-group'>
												<label htmlFor='grade'>Класс *</label>
												<input
													type='text'
													id='grade'
													name='grade'
													value={formData.grade}
													onChange={handleChange}
													required
													placeholder='10А'
												/>
											</div>
										</div>

										<div className='form-row'>
											<div className='form-group'>
												<label htmlFor='birthDate'>Дата рождения *</label>
												<input
													type='date'
													id='birthDate'
													name='birthDate'
													value={formData.birthDate}
													onChange={handleChange}
													required
												/>
											</div>

											<div className='form-group'>
												<label htmlFor='phone'>Телефон *</label>
												<input
													type='tel'
													id='phone'
													name='phone'
													value={formData.phone}
													onChange={handleChange}
													required
													placeholder='+375 (XX) XXX-XX-XX'
												/>
											</div>
										</div>

										<div className='form-group'>
											<label htmlFor='email'>Электронная почта *</label>
											<input
												type='email'
												id='email'
												name='email'
												value={formData.email}
												onChange={handleChange}
												required
												placeholder='example@school.by'
											/>
										</div>
									</div>

									{/* Данные родителей */}
									<div className='form-section'>
										<h3 className='form-section-title'>Данные родителей/опекунов</h3>

										<div className='form-row'>
											<div className='form-group'>
												<label htmlFor='parentName'>ФИО родителя *</label>
												<input
													type='text'
													id='parentName'
													name='parentName'
													value={formData.parentName}
													onChange={handleChange}
													required
													placeholder='ФИО родителя'
												/>
											</div>

											<div className='form-group'>
												<label htmlFor='parentPhone'>Телефон родителя *</label>
												<input
													type='tel'
													id='parentPhone'
													name='parentPhone'
													value={formData.parentPhone}
													onChange={handleChange}
													required
													placeholder='+375 (XX) XXX-XX-XX'
												/>
											</div>
										</div>
									</div>

									{/* Дополнительная информация */}
									<div className='form-section'>
										<h3 className='form-section-title'>Дополнительная информация</h3>

										<div className='form-group'>
											<label htmlFor='motivation'>
												Почему вы хотите вступить в поисковый отряд? *
											</label>
											<textarea
												id='motivation'
												name='motivation'
												value={formData.motivation}
												onChange={handleChange}
												required
												rows='4'
												placeholder='Расскажите о своих мотивах и ожиданиях...'
											/>
										</div>

										<div className='form-group'>
											<label htmlFor='experience'>
												Имеется ли у вас опыт участия в подобных мероприятиях?
											</label>
											<textarea
												id='experience'
												name='experience'
												value={formData.experience}
												onChange={handleChange}
												rows='3'
												placeholder='Туризм, краеведение, волонтерство и т.д.'
											/>
										</div>
									</div>

									{/* Чекбоксы согласия */}
									<div className='form-checkboxes'>
										<div className='checkbox-group'>
											<input type='checkbox' id='agreement' name='agreement' required />
											<label htmlFor='agreement'>
												Я ознакомлен(а) с правилами и требованиями поискового отряда *
											</label>
										</div>

										<div className='checkbox-group'>
											<input type='checkbox' id='parentAgreement' name='parentAgreement' required />
											<label htmlFor='parentAgreement'>
												Родители/опекуны согласны с моим участием в деятельности отряда *
											</label>
										</div>

										<div className='checkbox-group'>
											<input type='checkbox' id='dataProcessing' name='dataProcessing' required />
											<label htmlFor='dataProcessing'>
												Я согласен(на) на обработку персональных данных *
											</label>
										</div>
									</div>

									<div className='form-submit'>
										<button type='submit' className='submit-btn'>
											Отправить заявку
										</button>
										<p className='form-note'>
											После отправки формы с вами свяжется руководитель отряда для собеседования
										</p>
									</div>
								</form>
							)}
						</div>

						{/* Боковая информация */}
						<div className='join-info-section'>
							<div className='info-card'>
								<h3>Требования к кандидатам</h3>
								<ul className='requirements-list'>
									<li>Учащиеся 6-11 классов школы №30</li>
									<li>Ответственность и дисциплинированность</li>
									<li>Интерес к истории и поисковой работе</li>
									<li>Согласие родителей/опекунов</li>
								</ul>
							</div>

							<div className='info-card'>
								<h3>Контакты для связи</h3>
								<div className='contact-info'>
									<p>
										<strong>Руководитель отряда:</strong>
									</p>
									<p>Варсоба Сергей Олегович</p>
									<p>
										<strong>Email:</strong> school30pamyat@gmail.com
									</p>
									<p>
										<strong>Кабинет:</strong> 334 a
									</p>
								</div>
							</div>

							<div className='info-card'>
								<h3>Документы для скачивания</h3>
								<div className='documents-list'>
									<div className='document-item'>
										<div className='document-content'>
											<div className='document-icon'>📄</div>
											<div className='document-text'>
												<strong>Согласие на обработку персональных данных</strong>
												<br />
												<small>Требуется заполнить и принести в отряд</small>
											</div>
										</div>
										<div className='document-actions'>
											<button onClick={openDocumentModal} className='document-btn view'>
												<svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
													<path
														d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'
														stroke='currentColor'
														strokeWidth='2'
													/>
													<circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='2' />
												</svg>
												Просмотр
											</button>
											<a
												href='/documents/consent.pdf'
												download='Согласие_на_обработку_персональных_данных.pdf'
												className='document-btn'
											>
												<svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
													<path
														d='M19 9H15V3H9V9H5L12 16L19 9Z'
														stroke='currentColor'
														strokeWidth='2'
													/>
													<path d='M5 18V20H19V18H5Z' stroke='currentColor' strokeWidth='2' />
												</svg>
												Скачать PDF
											</a>
										</div>
									</div>
								</div>
								<p className='document-note'>
									Заполните документ, распечатайте и принесите подписанный оригинал при первом
									посещении отряда
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Модальное окно для просмотра PDF */}
			{isDocumentModalOpen && (
				<div className='document-modal-overlay' onClick={closeDocumentModal}>
					<div className='document-modal' onClick={e => e.stopPropagation()}>
						<div className='modal-header'>
							<h3>Просмотр документа</h3>
							<button className='close-modal-btn' onClick={closeDocumentModal}>
								×
							</button>
						</div>

						<div className='pdf-viewer-container' ref={pdfContainerRef}>
							{!pdfError ? (
								<>
									<div className='pdf-controls'>
										<div className='pdf-info'>
											<span>Согласие на обработку персональных данных.pdf</span>
										</div>
										<div className='pdf-actions'>
											<a
												href='../../DATA/personal_data_agreement.pdf'
												download='Согласие_на_обработку_персональных_данных.pdf'
												className='document-btn'
											>
												<svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
													<path
														d='M19 9H15V3H9V9H5L12 16L19 9Z'
														stroke='currentColor'
														strokeWidth='2'
													/>
													<path d='M5 18V20H19V18H5Z' stroke='currentColor' strokeWidth='2' />
												</svg>
												Скачать
											</a>
										</div>
									</div>

									<div className='pdf-viewer'>
										<object
											data='../../DATA/personal_data_agreement.pdf'
											type='application/pdf'
											width='100%'
											height='600px'
											onError={handlePdfError}
										>
											{/* Если object не работает, показываем iframe */}
											<iframe
												src={`../../DATA/personal_data_agreement.pdf`}
												title='PDF Viewer'
												width='100%'
												height='600px'
												onError={handlePdfError}
											>
												{/* Если iframe тоже не работает, показываем альтернативный текст */}
												{pdfAlternativeText}
											</iframe>
										</object>
									</div>
								</>
							) : (
								<div className='pdf-error'>
									<div className='error-icon'>⚠️</div>
									<h4>Не удалось загрузить PDF</h4>
									<p>Возможно, файл временно недоступен.</p>
									<p>Вы можете скачать документ или просмотреть его содержимое ниже:</p>

									<div className='pdf-alternative-container'>{pdfAlternativeText}</div>

									<div className='error-actions'>
										<a
											href='../../DATA/personal_data_agreement.pdf'
											download='../../DATA/personal_data_agreement.pdf'
											className='document-btn'
										>
											<svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
												<path
													d='M19 9H15V3H9V9H5L12 16L19 9Z'
													stroke='currentColor'
													strokeWidth='2'
												/>
												<path d='M5 18V20H19V18H5Z' stroke='currentColor' strokeWidth='2' />
											</svg>
											Скачать PDF
										</a>
										<button className='document-btn view' onClick={() => setPdfError(false)}>
											Повторить загрузку
										</button>
									</div>
								</div>
							)}
						</div>

						<div className='modal-footer'>
							<p className='footer-note'>
								<strong>Инструкция:</strong> Распечатайте документ, заполните все поля, подпишите и
								принесите в отряд.
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Join
