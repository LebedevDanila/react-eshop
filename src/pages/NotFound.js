import React from 'react';
import {NavLink} from 'react-router-dom';

import logo404 from '../assets/images/404/404.png';

function NotFound() {
	return (
		<div className="container text-center">
			<div className="content-404">
				<img src={logo404} className="img-responsive" alt="" />
				<h1><b>Упс!</b> Мы не можем найти такую страницу</h1>
				<p>Пожалуйста, проверьте адрес строки запроса или перейдите на главную страницу.</p>
				<h2><NavLink to="/">Вернуться на главную</NavLink></h2>
			</div>
		</div>
	);
}

export default NotFound;