import styled from "styled-components"

const Input = styled.input`
    width: 100%;
	padding: 0.5rem;
    line-height: 1;
    font-size: 14px;
	border-radius: 5px;
	border: 1px solid #bcccdc;
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
	0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
	&:focus {
	outline: 4px auto -webkit-focus-ring-color;
	outline-offset: -1px;
	}
  @media (min-width: 600px) {
    font-size: 16px;
  }
`

export default Input