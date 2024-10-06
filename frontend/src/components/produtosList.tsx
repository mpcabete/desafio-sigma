import { useEffect, useState } from 'react';
import OutlinedCard from './ProdutoCard';
import CreateProdutoForm from './CreateProdutoForm';
import { iProduto } from '../interfaces'

function ProdutosList() {

  const [produtos, setProdutos] = useState<iProduto[] | null>(null);
  async function updateProdutosList() {
    const response = await fetch("http://127.0.0.1:8000/produtos/")
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
