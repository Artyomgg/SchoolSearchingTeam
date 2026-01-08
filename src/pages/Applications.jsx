import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../lib/supabase.js'
import { logoutAdmin, requireAdmin } from '../utils/auth.js'

function Applications() {
	const [applications, setApplications] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [selectedStatus, setSelectedStatus] = useState('all')
	const [selectedApplication, setSelectedApplication] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		// Проверка доступа
		if (!requireAdmin(navigate)) return

		fetchApplications()
	}, [selectedStatus, navigate])

	const fetchApplications = async () => {
		try {
			setLoading(true)
			let query = supabase
				.from('application_forms')
				.select('*')
				.order('created_at', { ascending: false })

			if (selectedStatus !== 'all') {
				query = query.eq('status', selectedStatus)
			}

			const { data, error } = await query

			if (error) throw error
			setApplications(data || [])
		} catch (err) {
			console.error('Ошибка при загрузке заявок:', err)
			setError('Не удалось загрузить заявки')
		} finally {
			setLoading(false)
		}
	}

	const updateStatus = async (id, status) => {
		try {
			const { error } = await supabase
				.from('application_forms')
				.update({
					status,
					updated_at: new Date().toISOString(),
				})
				.eq('id', id)

			if (error) throw error

			// Обновляем локальное состояние
			setApplications(prev =>
				prev.map(app =>
					app.id === id ? { ...app, status, updated_at: new Date().toISOString() } : app
				)
			)
			setSelectedApplication(null)
		} catch (err) {
			console.error('Ошибка при обновлении статуса:', err)
			setError('Не удалось обновить статус')
		}
	}

	const deleteApplication = async id => {
		if (!window.confirm('Вы уверены, что хотите удалить эту заявку?')) return

		try {
			const { error } = await supabase.from('application_forms').delete().eq('id', id)

			if (error) throw error

			setApplications(prev => prev.filter(app => app.id !== id))
			setSelectedApplication(null)
		} catch (err) {
			console.error('Ошибка при удалении заявки:', err)
			setError('Не удалось удалить заявку')
		}
	}

	const handleLogout = () => {
		logoutAdmin()
		navigate('/login')
	}

	const getStatusColor = status => {
		switch (status) {
			case 'pending':
				return 'status-pending'
			case 'approved':
				return 'status-approved'
			case 'rejected':
				return 'status-rejected'
			default:
				return ''
		}
	}

	const getStatusText = status => {
		switch (status) {
			case 'pending':
				return 'На рассмотрении'
			case 'approved':
				return 'Одобрено'
			case 'rejected':
				return 'Отклонено'
			default:
				return status
		}
	}

	const formatDate = dateString => {
		if (!dateString) return '—'
		try {
			return new Date(dateString).toLocaleDateString('ru-RU', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			})
		} catch {
			return dateString
		}
	}

	const getFieldValue = (app, fieldName) => {
		// Ищем поле в разных регистрах
		return app[fieldName] || app[fieldName.toLowerCase()] || '—'
	}

	if (loading) {
		return (
			<div className='applications-page'>
				<div className='loading-spinner'>
					<div className='spinner'></div>
					<p>Загрузка заявок...</p>
				</div>
			</div>
		)
	}

	return (
		<div className='applications-page black-theme'>
			<header className='applications-header'>
				<div className='container'>
					<div className='header-top'>
						<h1>Управление заявками</h1>
						<div className='admin-controls'>
							<span className='admin-badge'>👑 Администратор</span>
							<button className='logout-btn' onClick={handleLogout}>
								🚪 Выйти
							</button>
						</div>
					</div>
					<p className='subtitle'>Просмотр и управление заявками на вступление в отряд</p>
				</div>
			</header>

			<main className='applications-content'>
				<div className='container'>
					{/* Фильтры и статистика */}
					<div className='applications-controls'>
						<div className='filters'>
							<button
								className={`filter-btn ${selectedStatus === 'all' ? 'active' : ''}`}
								onClick={() => setSelectedStatus('all')}
							>
								Все ({applications.length})
							</button>
							<button
								className={`filter-btn ${selectedStatus === 'pending' ? 'active' : ''}`}
								onClick={() => setSelectedStatus('pending')}
							>
								На рассмотрении ({applications.filter(a => a.status === 'pending').length})
							</button>
							<button
								className={`filter-btn ${selectedStatus === 'approved' ? 'active' : ''}`}
								onClick={() => setSelectedStatus('approved')}
							>
								Одобренные ({applications.filter(a => a.status === 'approved').length})
							</button>
							<button
								className={`filter-btn ${selectedStatus === 'rejected' ? 'active' : ''}`}
								onClick={() => setSelectedStatus('rejected')}
							>
								Отклоненные ({applications.filter(a => a.status === 'rejected').length})
							</button>
						</div>

						<div className='actions'>
							<button className='refresh-btn' onClick={fetchApplications} disabled={loading}>
								↻ Обновить
							</button>
							<button className='back-btn' onClick={() => navigate('/join')}>
								← К форме заявки
							</button>
						</div>
					</div>

					{error && <div className='error-message'>⚠️ {error}</div>}

					{/* Таблица заявок */}
					<div className='applications-table-container'>
						{applications.length === 0 ? (
							<div className='no-applications'>
								<p>Нет заявок для отображения</p>
								<p className='hint'>Проверьте, правильно ли настроено подключение к базе данных</p>
							</div>
						) : (
							<table className='applications-table'>
								<thead>
									<tr>
										<th>ФИО</th>
										<th>Класс</th>
										<th>Телефон</th>
										<th>Дата подачи</th>
										<th>Статус</th>
										<th>Действия</th>
									</tr>
								</thead>
								<tbody>
									{applications.map(app => (
										<tr key={app.id}>
											<td>
												<strong>{getFieldValue(app, 'fullname')}</strong>
												<br />
												<small>{getFieldValue(app, 'email')}</small>
											</td>
											<td>{getFieldValue(app, 'grade')}</td>
											<td>{getFieldValue(app, 'phone')}</td>
											<td>{formatDate(app.created_at)}</td>
											<td>
												<span className={`status-badge ${getStatusColor(app.status)}`}>
													{getStatusText(app.status)}
												</span>
											</td>
											<td>
												<div className='action-buttons'>
													<button
														className='action-btn view'
														onClick={() =>
															setSelectedApplication(
																selectedApplication?.id === app.id ? null : app
															)
														}
													>
														{selectedApplication?.id === app.id ? '✖ Скрыть' : '👁 Подробнее'}
													</button>

													{app.status === 'pending' && (
														<>
															<button
																className='action-btn approve'
																onClick={() => updateStatus(app.id, 'approved')}
															>
																✓ Одобрить
															</button>
															<button
																className='action-btn reject'
																onClick={() => updateStatus(app.id, 'rejected')}
															>
																✗ Отклонить
															</button>
														</>
													)}

													<button
														className='action-btn delete'
														onClick={() => deleteApplication(app.id)}
													>
														🗑 Удалить
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>

					{/* Детали заявки */}
					{selectedApplication && (
						<div className='application-details'>
							<div className='details-header'>
								<h3>📋 Детали заявки: {getFieldValue(selectedApplication, 'fullname')}</h3>
								<button className='close-details-btn' onClick={() => setSelectedApplication(null)}>
									×
								</button>
							</div>

							<div className='details-grid'>
								<div className='details-section'>
									<h4>👤 Личные данные</h4>
									<p>
										<strong>ФИО:</strong> {getFieldValue(selectedApplication, 'fullname')}
									</p>
									<p>
										<strong>Класс:</strong> {getFieldValue(selectedApplication, 'grade')}
									</p>
									<p>
										<strong>Телефон:</strong> {getFieldValue(selectedApplication, 'phone')}
									</p>
									<p>
										<strong>Email:</strong> {getFieldValue(selectedApplication, 'email')}
									</p>
								</div>

								<div className='details-section'>
									<h4>👪 Данные родителей</h4>
									<p>
										<strong>ФИО родителя:</strong>{' '}
										{getFieldValue(selectedApplication, 'parentname')}
									</p>
									<p>
										<strong>Телефон родителя:</strong>{' '}
										{getFieldValue(selectedApplication, 'parentphone')}
									</p>
								</div>

								<div className='details-section full-width'>
									<h4>🎯 Мотивация</h4>
									<div className='text-content'>
										{getFieldValue(selectedApplication, 'motivation') || '—'}
									</div>
								</div>

								{getFieldValue(selectedApplication, 'experience') !== '—' && (
									<div className='details-section full-width'>
										<h4>📚 Опыт</h4>
										<div className='text-content'>
											{getFieldValue(selectedApplication, 'experience')}
										</div>
									</div>
								)}

								{getFieldValue(selectedApplication, 'healthinfo') !== '—' && (
									<div className='details-section full-width'>
										<h4>🏥 Информация о здоровье</h4>
										<div className='text-content'>
											{getFieldValue(selectedApplication, 'healthinfo')}
										</div>
									</div>
								)}

								<div className='details-section'>
									<h4>📊 Дополнительно</h4>
									<p>
										<strong>Дата подачи:</strong> {formatDate(selectedApplication.created_at)}
									</p>
									<p>
										<strong>Последнее обновление:</strong>{' '}
										{formatDate(selectedApplication.updated_at)}
									</p>
									<p>
										<strong>Текущий статус:</strong>{' '}
										<span className={`status-badge ${getStatusColor(selectedApplication.status)}`}>
											{getStatusText(selectedApplication.status)}
										</span>
									</p>
								</div>
							</div>

							<div className='details-actions'>
								{selectedApplication.status === 'pending' && (
									<>
										<button
											className='btn approve-btn'
											onClick={() => updateStatus(selectedApplication.id, 'approved')}
										>
											✅ Одобрить заявку
										</button>
										<button
											className='btn reject-btn'
											onClick={() => updateStatus(selectedApplication.id, 'rejected')}
										>
											❌ Отклонить заявку
										</button>
									</>
								)}

								<button
									className='btn delete-btn'
									onClick={() => deleteApplication(selectedApplication.id)}
								>
									🗑 Удалить заявку
								</button>
							</div>
						</div>
					)}
				</div>
			</main>

			<footer className='applications-footer'>
				<div className='container'>
					<p className='footer-info'>
						👑 Административная панель поискового отряда "Мы этой памяти верны" | Заявок в базе:{' '}
						<strong>{applications.length}</strong> |
						<span className='logout-link' onClick={handleLogout}>
							Выйти
						</span>
					</p>
				</div>
			</footer>
		</div>
	)
}

export default Applications
