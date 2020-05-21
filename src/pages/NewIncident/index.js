import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'

export default function NewIncident() {
  const [title, setTitle] = useState('')
  const [descriptions, setDescriptions] = useState('')
  const [value, setValue] = useState('')

  const ongId = localStorage.getItem('ongId')

  const history = useHistory()

  async function handleNewIncident(e){
    e.preventDefault()
    const data = { title, descriptions, value }    
    try {
      const response = await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      })
      // alert(`Seu ID de acesso: ${response.data.id}`)
      history.push('/profile')
    } catch (error) {
      alert('Erro ao cadastrar caso, tente novamente.')
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link to="/" className="back-link"><FiArrowLeft size={16} color="#E02041"/>Voltar para home</Link>        
        </section>
        <form onSubmit={handleNewIncident}>
          <input placeholder="Título do caso" value={title} onChange={e => setTitle(e.target.value) }/>
          <textarea placeholder="Descrição" value={descriptions} onChange={e => setDescriptions(e.target.value) }/>
          <input placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value) }/>
          
          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
