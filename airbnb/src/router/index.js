
import React from 'react'
import { Navigate } from "react-router-dom";

const Home = React.lazy(() => import("@/views/home"));
const Entire = React.lazy(() => import("@/views/entire"));

const routes = [
	{
		path: "/",
		element: <Navigate to="home" />,
	},
	{
		path: "/home",
		element: <Home />,
	},
	{
		path: "/entire",
		element: <Entire />,
	},
]

export default routes