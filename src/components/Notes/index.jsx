import { Container } from "./styles";
import { Tag }  from '../Tag'

export function Notes ({data, tags, ...rest}) {

    return(
        <Container {...rest}>
            <h1>{data.title}</h1>

            {tags && 
                <footer>
                    {tags.map(
                            tag => {
                                if(tag.note_id === data.id){
                                    return <Tag key={tag.id} title={tag.name}/>                               
                                }
                            })
                    }
                </footer>
            }
        </Container>
    )
}