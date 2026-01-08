import { Navigate, Route, HashRouter as Router, Routes } from 'react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { ScrollToTop } from '../components/ScrollToTop'
import About from '../pages/About'
import Applications from '../pages/Applications'
import Home from '../pages/Home'
import Join from '../pages/Join'
import { checkAdminAccess } from '../utils/auth'
import Login from '../components/Login'

function AppRouter() {
	return (
		<Router>
			<Header />
			<ScrollToTop />
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='join' element={<Join />}></Route>
				<Route path='about' element={<About />}></Route>
				<Route path='applications' element={<Applications />}></Route>
				<Route path='/login' element={<Login />} />
				<Route
					path='/applications'
					element={checkAdminAccess() ? <Applications /> : <Navigate to='/login' />}
				/>
			</Routes>
			<Footer />
		</Router>
	)
}

export default AppRouter
