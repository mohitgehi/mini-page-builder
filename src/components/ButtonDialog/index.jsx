import PropTypes from 'prop-types';
import Input from '../Input';
import { useEffect, useReducer, useRef } from 'react';
import { usePageBuilderStore } from '../../store/pageBuilderStore';
import useClickOutside from '../../hooks/useClickOutside';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.payload };
    case 'UPDATE_ALL_FIELDS':
      return { ...state, ...action.fields };
    default:
      return state;
  }
};

const initialState = {
  type: 'Button',
  x: '0',
  y: '0',
  name: '',
  fontSize: '',
  fontWeight: '',
};

const ButtonDialog = ({ setModal, open = false, defaultData }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const addElement = usePageBuilderStore(state => state.addElement);
  const updateElement = usePageBuilderStore(state => state.updateElement);
  const dialogRef = useRef(null);

  useClickOutside(dialogRef, () => setModal(null));

  const updateField = (field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, payload: value });
  };

  const updateAllFields = fields => {
    dispatch({ type: 'UPDATE_ALL_FIELDS', fields });
  };

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    updateField(field, value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (state.id) {
      updateElement(state.id, state);
    } else {
      addElement(state);
    }
    setModal(null);
  };

  useEffect(() => {
    if (defaultData) {
      updateAllFields(defaultData);
    }
  }, [defaultData]);

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key === 'Escape') {
        setModal(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [setModal]);

  if (!open) {
    return null;
  }
  return (
    <div className="fixed t-0 l-0 r-0 b-0 flex items-center justify-center h-full w-full bg-black/[.5]">
      <div ref={dialogRef} className="h-[660px] w-[424px] bg-white">
        <div className="flex justify-between p-5 border-b border-b-border">
          <h2>Edit Button</h2>
          <div className="cursor-pointer" onClick={() => setModal(null)}>
            X
          </div>
        </div>
        <form className="p-5 flex flex-col gap-8" onSubmit={handleSubmit}>
          <Input
            id="name"
            name="name"
            type="text"
            label="Name"
            placeholder=""
            value={state.name}
            onChange={e => handleInputChange(e, 'name')}
            required
          />
          <Input
            id="x"
            name="x"
            type="text"
            label="X"
            placeholder=""
            value={state.x}
            onChange={e => handleInputChange(e, 'x')}
          />
          <Input
            id="y"
            name="y"
            type="text"
            label="Y"
            placeholder=""
            value={state.y}
            onChange={e => handleInputChange(e, 'y')}
          />
          <Input
            id="font-size"
            type="text"
            name="Font Size"
            label="Font Size"
            placeholder=""
            value={state.fontSize}
            onChange={e => handleInputChange(e, 'fontSize')}
          />
          <Input
            id="font-weight"
            type="text"
            name="Font Weight"
            label="Font Weight"
            placeholder=""
            value={state.fontWeight}
            onChange={e => handleInputChange(e, 'fontWeight')}
          />
          <div>
            <button
              type="submit"
              className="bg-button-bg px-4 py-2 rounded-sm text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ButtonDialog.propTypes = {
  setModal: PropTypes.func,
  open: PropTypes.any,
  addButton: PropTypes.func,
  defaultData: PropTypes.any,
};

export default ButtonDialog;
