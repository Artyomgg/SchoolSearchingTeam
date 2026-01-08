import { useState } from 'react'
import { useNavigate } from 'react-router'
import { loginAdmin } from '../utils/auth'

function Login() {
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		setLoading(true)
		setError('')

		if (loginAdmin(password)) {
			navigate('/applications')
		} else {
			setError('Неверный пароль')
			setLoading(false)
		}
	}

	return (
		<div className='login-page black-theme'>
			<div className='login-container'>
				<div className='login-header'>
					<h2>🔐 Вход в админ-панель</h2>
					<p>Поисковый отряд "Мы этой памяти верны"</p>
				</div>
				<form onSubmit={handleSubmit} className='login-form'>
					<div className='form-group'>
						<label>Пароль администратора</label>
						<input
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
							disabled={loading}
							placeholder='Введите пароль...'
						/>
					</div>
					{error && <div className='error-message'>⚠️ {error}</div>}
					<button type='submit' className='login-btn' disabled={loading}>
						{loading ? 'Проверка...' : 'Войти'}
					</button>
				</form>
				<div className='login-footer'>
					<button className='back-btn' onClick={() => navigate('/join')}>
						← Вернуться к форме заявки
					</button>
					<p className='hint'>Доступ только для руководителя отряда</p>
				</div>
			</div>
		</div>
	)
}

export default Login
