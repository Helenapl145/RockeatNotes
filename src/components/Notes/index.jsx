import { Container } from "./styles";
import { Tag }  from '../Tag'

export function Notes ({data, tags, ...rest}) {
    tags.map(tag => {
        console.log('tag', tag)
        console.log('tagId', tag.id)
        if(tag.id === data.id){
            return console.log("tag, data", tag.name)
        }
    })
    return(
        <Container {...rest}>
            <h1>{data.title}</h1>

            {tags && 
                <footer>
                    {tags.map(
                            tag => {
                                if(tag.id === data.id){
                                    return <Tag key={tag.id} title={tag.name}/>                               
                                }
                            })
                    }
                </footer>
            }
        </Container>
    )
}