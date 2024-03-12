import { useField } from 'formik';
import Select from 'react-select';

function SelectField(props: any) {
    const [field, state, { setValue, setTouched }] = useField(props.field.name);

    const onChange = ({ value }: any) => {
        setValue(value);
    };

    return (
        <Select {...props} onChange={onChange} onBlur={setTouched}
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    border: '0px',
                    backgroundColor: state.isFocused ? '#374151' : '#1e293b',
                    borderRadius: '0.375rem', // equivalent to rounded-md in tailwind
                    padding: '0px', // equivalent to py-1 px-3 in tailwind
                    width: '220px',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: 'white',
                    boxShadow: 'none', // remove outline
                    transition: 'background-color 0.2s', // equivalent to transition duration-200 in tailwind
                }),
                singleValue: (provided) => ({
                    ...provided,
                    borderRadius: '0.375rem',
                    color: 'white',
                    padding: '0px',
                }),
                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? '#374151' : '#1e293b',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'gray',
                    },
                }),
                menu: (provided) => ({
                    ...provided,
                    borderRadius: '0.375rem', // apply borderRadius
                    backgroundColor: '#1e293b'
                }),
                input: (provided) => ({
                    ...provided,
                    color: 'white', // change input color
                }),
            }} />
    );
}

export default SelectField;