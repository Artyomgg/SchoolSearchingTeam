function Footer(props) {
	return (
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
					</div>
				</div>
				<div className='footer-bottom'>
					<p>
						© {new Date().getFullYear()} Поисковый отряд "Мы этой памяти верны". Все права защищены.
					</p>
					<p className='footer-motto'>"Память сильнее времени"</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
