import { Container } from "./styles";


export function ButtonText({title, isActive = false, ...rest }) {
    return(
        <Container
                isActive = {isActive}
            type="button"
            {...rest}
        >
            
            {title}

        </Container>
    
    )
      
}