import styled from "styled-components"

const StyledFormRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;

  & > * {
    flex: 1 1 0px;
  }
`

const Label = styled.label`
  font-weight: 500;
`

const FormRow = ({ label, ...props }) => {

    return (
        <StyledFormRow>
            {label && <Label htmlFor={props.name}>{label}</Label>}
            {props.children}
        </StyledFormRow>
    )
}
export default FormRow;