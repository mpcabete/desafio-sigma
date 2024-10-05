import { useEffect, useState } from 'react';
import OutlinedCard from './OutlinedCard';
interface iProduto {
  nome:string
  descricao:string
}

function ProdutosList() {

  const [produtos, setProdutos] = useState<iProduto[]|null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:8000/produtos/")
      if (response.status == 200) {
        const data = await response.json()
        setProdutos(data)
        console.log(data)
      }

    }
    fetchData()

  }, [])

  return (
    <div>
      
      {produtos ? produtos.map(x=><OutlinedCard nome={x.nome} descricao={x.descricao}/>) : 'Loading...'}
    </div>
  )
}
export default ProdutosList
