import { useState } from 'react'
import '../css/join.css'

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
							</div>

							{isSubmitted ? (
								<div className='success-message'>
									<div className='success-icon'>✓</div>
									<h3>Заявка отправлена успешно!</h3>
									<p>Мы свяжемся с вами в ближайшее время для обсуждения дальнейших шагов.</p>
									<p className='success-note'>Обычно ответ поступает в течение 3 рабочих дней</p>
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
									<li>Хорошая успеваемость</li>
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
									<p>[ФИО руководителя]</p>
									<p>
										<strong>Телефон:</strong> +375 (17) XXX-XX-XX
									</p>
									<p>
										<strong>Email:</strong> search.team@school30.by
									</p>
									<p>
										<strong>Кабинет:</strong> [номер кабинета]
									</p>
									<p>
										<strong>График приема:</strong> Пн-Пт, 15:00-17:00
									</p>
								</div>
							</div>

							{/* <div className='info-card'>
								<h3>Документы для ознакомления</h3>
								<div className='documents-list'>
									<a href='#' className='document-link'>
										📄 Устав поискового отряда
									</a>
									<a href='#' className='document-link'>
										📄 Правила техники безопасности
									</a>
									<a href='#' className='document-link'>
										📄 План работы на 2024-2025 учебный год
									</a>
									<a href='#' className='document-link'>
										📄 Согласие родителей (бланк)
									</a>
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Join
