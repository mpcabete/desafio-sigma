import { useEffect, useState } from 'react';
import OutlinedCard from './ProdutoCard';
import CreateProdutoForm from './CreateProdutoForm';
import { iProduto } from '../interfaces'

function ProdutosList() {

  const [produtos, setProdutos] = useState<iProduto[] | null>(null);
  async function updateProdutosList() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/produtos/`)
    console.log(`${process.env.REACT_APP_BACKEND_ENDPOINT}/produtos/`)
    if (response.status === 200) {
      const data = await response.json()
      setProdutos(data)
      console.log(data)
    }

  }

  useEffect(() => {
    updateProdutosList()

  }, [])

  return (
    <div>
      <CreateProdutoForm updateProdutosList={updateProdutosList} />
      {produtos ? produtos.map(x => <OutlinedCard key={x.id} updateProdutosList={updateProdutosList} produto={x}/>) : 'Loading...'}
    </div>
  )
}
export default ProdutosList
