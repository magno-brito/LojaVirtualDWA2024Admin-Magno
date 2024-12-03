import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import { useState, useEffect } from 'react';
import api from "./axiosApi";
import FormButtons from './FormButtons';
import handleChange from './handleChange';
import parseErrors from './parseErrors';
import Loading from './Loading';

const CreateProduct = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [categorias, setCategorias] = useState([]); // Estado para armazenar as categorias
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    // Carregar as categorias ao montar o componente
    function loadCategories() {
        const getCategoriesEndpoint = 'admin/listar_categorias'; 
        api.get(getCategoriesEndpoint)
            .then(response => {
                setCategorias(response.data); 
            })
            .catch(error => {
                console.error('Erro ao carregar categorias:', error);
            });
    }

    // Enviar o formulário para salvar o produto
    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const insertProductEndpoint = "admin/inserir_produto";
        const formData = new FormData();

        // Adicionar todos os dados de inputs ao FormData
        Object.entries(inputs).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Se houver arquivo, adicionar ao FormData
        if (file) {
            formData.append("imagem", file);
        }

        // Enviar para o backend
        await api.postForm(insertProductEndpoint, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                if (response.status === 201) {
                    navigate("/products"); // Redireciona para a lista de produtos
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

    // Alterar o estado de inputs com base nas mudanças dos campos do formulário
    function localHandleChange(event) {
        handleChange(event, inputs, setInputs);
    }

    // Alterar o estado do arquivo quando um novo arquivo é escolhido
    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    // Carregar as categorias ao carregar o componente
    useEffect(() => {
        loadCategories(); 
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Inclusão de Produto</h1>
            </div>
            <form onSubmit={handleSubmit} noValidate autoComplete='off' className='mb-3'>
                <ProductForm 
                    handleChange={localHandleChange} 
                    inputs={inputs} 
                    errors={errors} 
                    categorias={categorias} 
                    handleFileChange={handleFileChange} 
                />
                <FormButtons cancelTarget="/products" />
            </form>
            {loading && <Loading />}
        </>
    );
}

export default CreateProduct;
