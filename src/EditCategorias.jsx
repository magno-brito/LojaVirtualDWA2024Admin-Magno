import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from './axiosApi';
import FormButtons from './FormButtons';
import parseErrors from './parseErrors';
import Loading from './Loading';

const EditCategorias = () => {
    const { id } = useParams();
    const [inputs, setInputs] = useState({ nome: '', ativo: null });  
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        api.get(`admin/listar_categoria/${id}`)
            .then((response) => {
                setInputs({
                    nome: response.data.nome,
                    ativo: response.data.ativo,
                });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setLoading(true);
        const updateCategoryEndpoint = 'admin/alterar_categoria'; 

        const formData = new FormData();
        formData.append('categoria_id', id);
        formData.append('nome', inputs.nome);
        formData.append('ativo', inputs.ativo.toString()); 

        await api.postForm(updateCategoryEndpoint, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then((response) => {
                if (response.status === 204) {
                    navigate('/categories'); 
                }
            })
            .catch((error) => {
                if (error && error.response && error.response.data)
                    setErrors(parseErrors(error.response.data));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const localHandleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: name === 'ativo' ? parseInt(value) : value 
        }));
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Editar Categoria</h1>
            </div>
            <form onSubmit={handleSubmit} noValidate autoComplete="off" className="mb-3">
                <div>
                    <label htmlFor="nome">Novo Nome da Categoria</label>
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

                <div>
                    <label>Escolher Status da Categoria</label>
                    <div>
                        <label htmlFor="ativo1">
                            <input
                                type="radio"
                                id="ativo1"
                                name="ativo"
                                value="1"
                                checked={inputs.ativo === 1}
                                onChange={localHandleChange}
                            />
                            Ativar categoria
                        </label>
                        <label htmlFor="ativo0" className="ml-3">
                            <input
                                type="radio"
                                id="ativo0"
                                name="ativo"
                                value="0"
                                checked={inputs.ativo === 0}
                                onChange={localHandleChange}
                            />
                            Desativar categoria
                        </label>
                    </div>
                    {errors.ativo && <span className="text-danger">{errors.ativo}</span>}
                </div>

                <FormButtons cancelTarget="/categories" />
            </form>
            {loading && <Loading />}
        </>
    );
};

export default EditCategorias;
