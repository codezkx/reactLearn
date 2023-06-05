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

export const action: ActionFunction = (params) => {
	console.log(params, 'params')
	return {}
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
				{errors?.email && <span>{errors.email}</span>}
			</p>
			<p>
        <input type="text" name="password" />
        {errors?.password && <span>{errors.password}</span>}
      </p>
			<p>
        <button type="submit">Sign up</button>
      </p>
		</Form>
	)
}

export default RouterActionData
