import styled from "styled-components";


const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`
const Title = styled.div`
	font-weight: 400;
	font-size: 18px;
	text-align: center;
	
	@media (min-width: 600px) {
		font-size: 28px;
	}
`
const Form = ({ title, ...props }) => {
    return (
        <StyledForm {...props}>
            {title && <Title>{title}</Title>}
            {props.children}
        </StyledForm>
    )
}

export default Form;