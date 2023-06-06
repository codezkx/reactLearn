import {
	useActionData,
	Form,
	redirect,
} from 'react-router-dom';

import type { ActionFunction } from 'react-router-dom';

type ErrorsOption = {
	email: string;
	password: string;
}

// get 请求时不会触发此回调的
export const action: ActionFunction = async ({request}) => {
	const formData = await request.formData();
	const email = formData.get('email');
	const password = formData.get('password');
	const errors: Partial<ErrorsOption> = {};

	if (typeof email !== 'string' || !email.includes("@")) {
		errors.email = 'That doesn\'t look like an email address';
	}
	if (typeof password !== "string" || password.length < 6) {
		errors.password = "Password must be > 6 characters";
	}

	if (Object.keys(errors).length) {
		return errors
	}

	return redirect('/');  // 返回 首页
}  

/* 
	useActionData
		这个钩子函数最常见的用例是表单验证错误。如果表单不正确，你可以返回错误信息，让用户再次尝试：
*/

const RouterActionData = () => {
	const errors = useActionData() as ErrorsOption;

	return (
		<Form method='post'>
			<p>
				<input type="text" name="email" />
				{errors?.email && <span style={{ color: 'red', paddingLeft: '16px'}}>{errors.email}</span>}
			</p>
			<p>
				<input type="text" name="password" />
				{errors?.password && <span style={{ color: 'red',  paddingLeft: '16px'}}>{errors.password}</span>}
     		</p>
			<p>
				<button type="submit">Sign up</button>
			</p>
		</Form>
	)
}

export default RouterActionData
