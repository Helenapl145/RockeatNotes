import { Container, Links, Content} from './styles'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText'

import { api } from '../../services/api'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


export function Details(){
  const [data, setData] = useState([])
  console.log(data)

  const params = useParams()
  const navigate = useNavigate()

 
  function handleBack(){
    navigate(-1)
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota?")

    if(confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }
  
  useEffect(() => {
    async function fetchNotes() {
      const response =  await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNotes()
  }, [])

  return(
    <Container>

      <Header />

      {data && (
          <main>
            <Content>
              
              <ButtonText 
                title="excluir notas" 
                onClick={handleRemove}
              />


              <h1>
                {data.title}
              </h1>

              <p>
                {data.description}
              </p>

            {data.links && (
              <Section title="Links úteis">
                <Links>
                  {data.links.map(url => (
                    <li key={String(url.id)}>
                        <a href={url.link} target='_blank'>
                          {url.link}
                        </a>
                      </li>
                  ))

                  }
                </Links>
              </Section>
            )}
                
            
            {data.tags &&(
              <Section title="Marcadores">
            
                {data.tags.map(tag => (
                    <Tag
                      key={String(tag.id)} 
                      title={tag.name}
                    />
                  ))}
              </Section>
            )}
              
              <Button 
                title="Voltar"
                onClick={handleBack} 
              />

            </Content>
          </main>
        )
        
      }
      

    </Container>
  )
} 