import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from '../pages/Home'
import Join from '../pages/Join'
import About from '../pages/About'

function AppRouter(props) {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home/>}></Route>
				<Route path='join' element={<Join/>}></Route>
				<Route path='about' element={<About/>}></Route>
			</Routes>
		</Router>
	);
}

export default AppRouter;