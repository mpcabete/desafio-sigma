import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

interface FormData {
  nome: string;
  descricao: string;
  id: number;
  valor: string | undefined;
}


function EditProdutoForm({ produto, updateProdutosList, handleCancel }: { produto: FormData, handleCancel: () => void, updateProdutosList: () => Promise<void> }) {
  const [formData, setFormData] = useState<FormData>(produto);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        valor: Math.floor(Number(formData.valor) * 10) //Convert float value to int representing centavos

      }

      const response = await fetch('http://127.0.0.1:8000/produtos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        alert("Erro ao criar produto")
        throw new Error("Error creating produto")
      }
      handleCancel()
      // setFormData({ nome: '', descricao: '', valor: '' });
      updateProdutosList()
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Produto
        </Typography>
        <TextField
          fullWidth
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Descrição"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
          required
        />
        <TextField
          fullWidth
          label="Valor"
          name="valor"
          type="number"
          value={formData.valor}
          onChange={handleChange}
          margin="normal"
          inputProps={{ min: 0, step: "0.01" }}
          required
        />

      </CardContent>
      <CardActions>
        <Button fullWidth onClick={handleCancel} variant="contained" color="primary" sx={{ mt: 2 }}>
          Cancelar
        </Button>
        <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Confirmar
        </Button>
      </CardActions>
    </Box>
  );
};

export default EditProdutoForm;
