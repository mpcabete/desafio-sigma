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
      const response = await fetch(`http://127.0.0.1:8000/produtos/?produtoID=${produto.id}`, { method: "delete" })
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
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {produto.nome}
          </Typography>
          <Typography variant="body2">
            {produto.descricao}
          </Typography>
          <Typography variant="body2">
            {produto.valor / 10}
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
