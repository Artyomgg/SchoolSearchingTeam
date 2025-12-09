import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from '../pages/Home'

function AppRouter(props) {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home/>}></Route>
			</Routes>
		</Router>
	);
}

export default AppRouter;