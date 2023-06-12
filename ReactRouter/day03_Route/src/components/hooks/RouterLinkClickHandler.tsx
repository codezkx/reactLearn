import {
    useHref,
    useLinkClickHandler,
} from 'react-router-dom';

import { forwardRef } from 'react';

const LinkClickHandler = forwardRef(({
	onClick,
	replace,
	state,
	target,
	to,
	...rest
}, ref) => {
	const href = useHref(to);
	let handleClick = useLinkClickHandler(to, {
		replace,
		state,
		target,
	})
	console.log(to, 'to')
	return (
		<a
			{...rest}
			style={{color: 'fuchsia'}}
			href={href}
			onClick={(event) => {
				onClick?.(event);
				if (!event.defaultPrevented) {
					handleClick(event);
				}
			}}
			ref={ref}
			target={target}
		>

		</a>
	)
})

const RouterLinkClickHandler = () => {
	return (
		<LinkClickHandler
			state='你好'
			to='/fetcher'
		>
			Link
		</LinkClickHandler>  
	)
}


export default RouterLinkClickHandler
