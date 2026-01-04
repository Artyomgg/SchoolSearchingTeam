import { Route, HashRouter as Router, Routes } from 'react-router'
import About from '../pages/About'
import Home from '../pages/Home'
import Join from '../pages/Join'

function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='join' element={<Join />}></Route>
				<Route path='about' element={<About />}></Route>
			</Routes>
		</Router>
	)
}

export default AppRouter
