import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

import IconLogo from "@/assets/svg/icon_logo";
import { LeftStyledWrapper } from "./style";

const HeaderLeft = memo(() => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/home");
	}
	return (
		<LeftStyledWrapper>
			<div style={{display: 'inline-block'}} onClick={handleClick}>
				<IconLogo/>
			</div>
		</LeftStyledWrapper>
	);
});

export default HeaderLeft;
