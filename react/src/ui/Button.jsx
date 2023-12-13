import styled from "styled-components";

const Button = styled.button`
	cursor: pointer;
	color: #fff;
	font-weight: bold;
	background: darkred;;
	border: none;
	border-radius: 6px;
  font-size: 16px;
	padding: 17px 11px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
	0 2px 4px -1px rgba(0, 0, 0, 0.06);
	transition: 0.2s ease-in-out all;
	text-transform: capitalize;
	
	&:hover {
		color: var(--COLOR);
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
  
	@media(min-width: 600px) {
		padding: 11px;
	}
`


export default Button;