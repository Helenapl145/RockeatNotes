import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { api } from '../../services/api'

import { Container, Form} from './style'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function New() {
    const [links, setLinks] = useState([])
    const [newLink, setNewLink]  = useState("")

    const [tags, setTags] = useState([])
    const [newTag, setNewTag]  = useState("")
   
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const navigation = useNavigate()

    function handleAddLink() {
        setLinks(prevState => [...prevState, newLink])
        setNewLink("")
    }

    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted))

    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag])
        setNewTag("")
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted))

    }

    async function handleNewNote() {
        if(!title) {
            return alert("Digite o título da nota!")
        }
        if(newLink) {
            return alert("Você tem um Link não adicionado!")
        }
        if(newTag) {
            return alert("Você tem uma tag não adicionada!")
        }
       

        await api.post("/notes", {
            title,
            description,
            tags,
            links
        })

        alert("Nota criada com sucesso!")
        navigation(-1)
    }

    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar Nota</h1>
                        <Link to="/">voltar</Link>
                    </header>

                    <Input 
                        placeholder = "Título"
                        type = "text"
                        onChange = {e => setTitle(e.target.value)}
                    />

                    <Textarea  
                        placeholder="Observações"
                        onChange = {e => setDescription(e.target.value)}
                    />

                    <Section title="Links úteis">
                        { links.map((link, index) => (
                             <NoteItem 
                                key={String(index)} 
                                value={link}
                                onCLick={() => handleRemoveLink(link)}
                         />
                        ))
                        }
                        <NoteItem 
                            isNew
                            placeholder = 'Novo link'
                            value = {newLink}
                            onChange = {e => setNewLink(e.target.value)}
                            onCLick={handleAddLink}
                        />
                    </Section>

                    <Section title="Marcadores">
                       <div className='tags'>
                        {  tags.map((tag, index) => (
                             <NoteItem 
                                key = {String(index)}
                                value = {tag}
                                onCLick={() => handleRemoveTag(tag)}
                            />
                        ))}
                    
                            <NoteItem 
                                isNew
                                placeholder = 'Nova tag'
                                value = {newTag}
                                onChange = {e => setNewTag(e.target.value)}
                                onCLick={handleAddTag}
                            />

                       </div>
                    </Section>

                    <Button 
                        title = "Salvar" 
                        
                        onClick = {handleNewNote}
                    />

                </Form>
            </main>
        </Container>
    )
}