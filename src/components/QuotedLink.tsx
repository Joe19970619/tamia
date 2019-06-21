import styled from 'styled-components';

const QuotedLink = styled('a')`
	padding: 0;
	background: none;
	border: 0;
	color: inherit;
	font-family: inherit;
	text-decoration: none;
	& u,
	&:link u,
	&:visited u {
		text-decoration: underline;
		color: ${p => p.theme.colors.primary};
	}
	&:hover u,
	&:active u,
	&:focus u {
		color: ${p => p.theme.colors.hover};
	}
	&:hover {
		cursor: pointer;
	}
	&:focus {
		outline: 1px dotted ${p => p.theme.colors.hover};
		outline-offset: 1px;
	}
`;

/** @component */
export default QuotedLink;
