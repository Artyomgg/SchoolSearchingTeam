import { Route, HashRouter as Router, Routes } from 'react-router'
import About from '../pages/About'
import Home from '../pages/Home'
import Join from '../pages/Join'
import Header from '../components/Header'
import { ScrollToTop } from '../components/ScrollToTop'
import Footer from '../components/Footer'
import Applications from '../pages/Applications'

function AppRouter() {
	return (
		<Router>
			<Header/>
			<ScrollToTop/>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='join' element={<Join />}></Route>
				<Route path='about' element={<About />}></Route>
				<Route path='applications' element={<Applications />}></Route>
			</Routes>
			<Footer/>
		</Router>
	)
}

export default AppRouter
