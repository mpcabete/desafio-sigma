import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditProdutoForm from "./editProdutoForm"
import { iProduto } from '../interfaces';

export default function OutlinedCard(
  { produto, updateProdutosList }:
    { produto: iProduto, updateProdutosList: () => Promise<void> }
) {
  const [editing, setEditing] = React.useState<boolean>(false)
  async function handleUpdate() {
    setEditing(true)
  }

  async function handleDelete() {

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/produtos/?produtoID=${produto.id}`, { method: "delete" })
      if (response.status !== 200) {
        throw (new Error("unable to delete produto"))
      }
      updateProdutosList()

    } catch (e) {
      console.error(e)
    }
  }

  const card = () => {
    return (
      <React.Fragment>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 20 }}>
            {produto.nome}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary'}}>
            {produto.descricao}
          </Typography>
          <br/>
          <Typography variant="body2"sx={{ color: 'text.secondary'}}>
            Valor: 
            R$ {produto.valor / 100}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleDelete}>Deletar</Button>
          <Button size="small" onClick={handleUpdate}>Update</Button>
        </CardActions>
      </React.Fragment>

    )
  }

  return (
    <Box display="inline-block" sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        {editing ? <EditProdutoForm rawProduto={produto} handleCancel={() => setEditing(false)} updateProdutosList={updateProdutosList} /> : card()}
      </Card>
    </Box>
  );

}
