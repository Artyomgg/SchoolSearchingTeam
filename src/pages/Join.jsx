import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../lib/supabase'

function Join() {
	const [formData, setFormData] = useState({
		fullName: '',
		grade: '',
		phone: '',
		email: '',
		parentName: '',
		parentPhone: '',
		motivation: '',
		experience: '',
		healthInfo: '',
	})

	const [isSubmitted, setIsSubmitted] = useState(false)
	const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
	const [pdfError, setPdfError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const pdfContainerRef = useRef(null)

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		setError('')

		try {
			// Валидация данных
			if (
				!formData.fullName ||
				!formData.grade ||
				!formData.phone ||
				!formData.email ||
				!formData.parentName ||
				!formData.parentPhone
			) {
				throw new Error('Пожалуйста, заполните все обязательные поля')
			}

			// Подготовка данных для отправки
			const dataToSend = {
				fullname: formData.fullName,
				grade: formData.grade,
				phone: formData.phone,
				email: formData.email,
				parentname: formData.parentName,
				parentphone: formData.parentPhone,
				motivation: formData.motivation,
				experience: formData.experience || '',
				healthinfo: formData.healthInfo || '',
				status: 'pending',
			}

			// Отправка в Supabase
			const { data, error } = await supabase.from('application_forms').select()

			if (error) throw error

			setIsSubmitted(true)
			console.log('Заявка успешно отправлена:', data)

			// Очистка формы через 5 секунд
			setTimeout(() => {
				setFormData({
					fullName: '',
					grade: '',
					phone: '',
					email: '',
					parentName: '',
					parentPhone: '',
					motivation: '',
					experience: '',
					healthInfo: '',
				})
				setIsSubmitted(false)
			}, 5000)
		} catch (err) {
			console.error('Ошибка при отправке:', err)
			setError(err.message || 'Произошла ошибка при отправке заявки')
		} finally {
			setLoading(false)
		}
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

	return (
		<div className='join-page'>
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

								{error && <div className='error-message'>⚠️ {error}</div>}
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
									<button
										className='view-applications-btn'
										onClick={() => navigate('/applications')}
									>
										Перейти к просмотру заявок
									</button>
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
													disabled={loading}
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
													disabled={loading}
												/>
											</div>
										</div>

										<div className='form-row'>
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
													disabled={loading}
												/>
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
													disabled={loading}
												/>
											</div>
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
													disabled={loading}
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
													disabled={loading}
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
												disabled={loading}
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
												disabled={loading}
											/>
										</div>

										<div className='form-group'>
											<label htmlFor='healthInfo'>
												Информация о состоянии здоровья (если необходимо)
											</label>
											<textarea
												id='healthInfo'
												name='healthInfo'
												value={formData.healthInfo}
												onChange={handleChange}
												rows='3'
												placeholder='Особенности здоровья, аллергии и т.д.'
												disabled={loading}
											/>
										</div>
									</div>

									{/* Чекбоксы согласия */}
									<div className='form-checkboxes'>
										<div className='checkbox-group'>
											<input
												type='checkbox'
												id='agreement'
												name='agreement'
												required
												disabled={loading}
											/>
											<label htmlFor='agreement'>
												Я ознакомлен(а) с правилами и требованиями поискового отряда *
											</label>
										</div>

										<div className='checkbox-group'>
											<input
												type='checkbox'
												id='parentAgreement'
												name='parentAgreement'
												required
												disabled={loading}
											/>
											<label htmlFor='parentAgreement'>
												Родители/опекуны согласны с моим участием в деятельности отряда *
											</label>
										</div>

										<div className='checkbox-group'>
											<input
												type='checkbox'
												id='dataProcessing'
												name='dataProcessing'
												required
												disabled={loading}
											/>
											<label htmlFor='dataProcessing'>
												Я согласен(на) на обработку персональных данных *
											</label>
										</div>
									</div>

									<div className='form-submit'>
										<button type='submit' className='submit-btn' disabled={loading}>
											{loading ? 'Отправка...' : 'Отправить заявку'}
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
									<li>Хорошее состояние здоровья</li>
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
												href='/data/personal_data_agreement.pdf'
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
												href='/data/personal_data_agreement.pdf'
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
											data='/data/personal_data_agreement.pdf'
											type='application/pdf'
											width='100%'
											height='600px'
											onError={handlePdfError}
										>
											<iframe
												src='/data/personal_data_agreement.pdf'
												title='PDF Viewer'
												width='100%'
												height='600px'
												onError={handlePdfError}
											></iframe>
										</object>
									</div>
								</>
							) : (
								<div className='pdf-error'>
									<div className='error-icon'>⚠️</div>
									<h4>Не удалось загрузить PDF</h4>
									<p>Возможно, файл временно недоступен.</p>
									<p>Вы можете скачать документ или просмотреть его содержимое ниже:</p>

									<div className='error-actions'>
										<a
											href='/data/personal_data_agreement.pdf'
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
