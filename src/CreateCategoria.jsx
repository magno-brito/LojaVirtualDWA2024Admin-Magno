import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from './axiosApi';
import FormButtons from './FormButtons';
import handleChange from './handleChange';
import parseErrors from './parseErrors';
import Loading from './Loading';

const CreateCategory = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const insertCategoryEndpoint = 'admin/inserir_categoria'; // Altere para o endpoint correto da sua API

        const formData = new FormData();
        Object.entries(inputs).forEach(([key, value]) => {
            formData.append(key, value);
        });

        await api.postForm(insertCategoryEndpoint, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then((response) => {
                if (response.status === 201) {
                    navigate('/categories'); // Altere para a rota correta de categorias
                } else {
                    console.log(response);
                }
            })
            .catch((error) => {
                if (error && error.response && error.response.data)
                    setErrors(parseErrors(error.response.data));
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function localHandleChange(event) {
        handleChange(event, inputs, setInputs);
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Inclusão de Categoria</h1>
            </div>
            <form onSubmit={handleSubmit} noValidate autoComplete="off" className="mb-3">
                <div>
                    <label htmlFor="nome">Nome da Categoria</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={inputs.nome || ''}
                        onChange={localHandleChange}
                        required
                    />
                    {errors.nome && <span className="text-danger">{errors.nome}</span>}
                </div>
                <FormButtons cancelTarget="/categories" />
            </form>
            {loading && <Loading />}
        </>
    );
};

export default CreateCategory;
