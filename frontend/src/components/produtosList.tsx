import { useEffect, useState } from 'react';
import OutlinedCard from './ProdutoCard';
interface iProduto {
  nome: string
  descricao: string
  id: number
}

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
      {produtos ? produtos.map(x => <OutlinedCard updateProdutosList={updateProdutosList} key={x.id} nome={x.nome} descricao={x.descricao} id={x.id} />) : 'Loading...'}
    </div>
  )
}
export default ProdutosList
