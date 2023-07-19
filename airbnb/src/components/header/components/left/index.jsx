import React, { memo } from "react";

import IconLogo from "@/assets/svg/icon_logo";

import { LeftStyledWrapper } from "./style";

const HeaderLeft = memo(() => {
	return (
		<LeftStyledWrapper>
				<IconLogo />
		</LeftStyledWrapper>
	);
});

export default HeaderLeft;
