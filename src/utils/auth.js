export const checkAdminAccess = () => {
	return localStorage.getItem('isAdmin') === 'true'
}

export const requireAdmin = navigate => {
	if (!checkAdminAccess()) {
		navigate('/login')
		return false
	}
	return true
}

export const loginAdmin = password => {
	const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

	if (password === adminPassword) {
		localStorage.setItem('isAdmin', 'true')
		return true
	}
	return false
}

export const logoutAdmin = () => {
	localStorage.removeItem('isAdmin')
}
