import PropTypes from 'prop-types';
import CleaveInput from "./CleaveInput";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";

const ProductForm = ({ handleChange, handleFileChange, inputs, errors, categorias }) => {
    return (
        <>
            <div className="row">
                <div className="col-12 mb-3">
                    <FormInput
                        type="text"
                        field="nome"
                        label="Nome"
                        value={inputs?.nome}
                        onChange={handleChange}
                        error={errors?.nome}
                        autofocus={true}
                    />
                </div>
                <div className="col-12 mb-3">
                    <FormTextarea
                        field="descricao"
                        label="Descrição"
                        value={inputs?.descricao}
                        onChange={handleChange}
                        error={errors?.descricao}
                    />
                </div>
                <div className="col-6 mb-3">
                    <CleaveInput
                        type="text"
                        field="preco"
                        label="Preço"
                        value={inputs?.preco}
                        onChange={handleChange}
                        error={errors?.preco}
                        options={{
                            numeral: true,
                            numeralThousandsGroupStyle: 'thousand',
                            prefix: 'R$ ',
                            rawValueTrimPrefix: true,
                            delimiter: '.',
                            numeralDecimalMark: ','
                        }}
                    />
                </div>
                <div className="col-6 mb-3">
                    <CleaveInput
                        type="text"
                        field="estoque"
                        label="Estoque"
                        value={inputs?.estoque}
                        onChange={handleChange}
                        error={errors?.estoque}
                        options={{
                            numeral: true,
                            numeralPositiveOnly: true,
                            numeralThousandsGroupStyle: 'thousand',
                            delimiter: '.',
                            numeralDecimalMark: ','
                        }}
                    />
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="categoria_id" className="form-label">Categoria</label>
                    <select
                        id="categoria_id"  
                        name="categoria_id"  
                        className={`form-control ${errors?.categoria_id ? 'is-invalid' : ''}`}
                        value={inputs?.categoria_id || ''}  
                        onChange={handleChange}
                    >
                        <option value="">Selecione uma categoria</option>
                        {categorias?.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>
                    {errors?.categoria_id && <div className="invalid-feedback">{errors.categoria_id}</div>}
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="imagem" className="form-label">Foto do Produto</label>
                    <input
                        type="file"
                        id="imagem"
                        name="imagem"
                        className={`form-control ${errors?.imagem ? 'is-invalid' : ''}`}
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    {errors?.imagem && <div className="invalid-feedback">{errors.imagem}</div>}
                </div>
            </div>
        </>
    );
}

ProductForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleFileChange: PropTypes.func,
    inputs: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    categorias: PropTypes.array.isRequired
};

export default ProductForm;
