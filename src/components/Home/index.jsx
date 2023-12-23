import { useEffect, useRef, useState } from 'react';
import LabelDialog from '../LabelDialog';
import InputDialog from '../InputDialog';
import ButtonDialog from '../ButtonDialog';
import { usePageBuilderStore } from '../../store/pageBuilderStore';
import useClickOutside from '../../hooks/useClickOutside';

const Home = () => {
  const [modal, setModal] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const selectedRef = useRef(null);
  const dropRef = useRef(null);
  const layout = usePageBuilderStore(state => state.layout);
  const updateElement = usePageBuilderStore(state => state.updateElement);
  const deleteElement = usePageBuilderStore(state => state.deleteElement);

  const handleSelect = e => {
    e.preventDefault();
    const id = e.target.getAttribute('data-id');
    const element = layout.find(item => item.id === id);
    setSelectedElement(element);
  };

  const dragStartHandler = e => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('id', e.target.getAttribute('data-id'));
    e.dataTransfer.setData('offsetX', e.nativeEvent.offsetX.toString());
    e.dataTransfer.setData('offsetY', e.nativeEvent.offsetY.toString());
  };

  const dropHandler = e => {
    e.preventDefault();
    const data = e.dataTransfer.getData('name');
    const id = e.dataTransfer.getData('id');
    const offsetX = e.dataTransfer.getData('offsetX');
    const offsetY = e.dataTransfer.getData('offsetY');
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;
    if (data) {
      setSelectedElement({
        x: newX,
        y: newY,
        type: data,
      });
      setModal(data);
    }
    if (id) {
      updateElement(id, { x: newX, y: newY });
    }
  };
  const dragOverHandler = e => {
    e.preventDefault();
  };

  useClickOutside(selectedRef, () => {
    console.log(selectedElement);
    if (!modal) {
      setSelectedElement(null);
    }
  });

  useEffect(() => {
    const handleKeyPress = event => {
      if (selectedElement && event.key === 'Enter') {
        setModal(selectedElement.type);
      }
      if (selectedElement && event.key === 'Backspace') {
        deleteElement(selectedElement.id);
        setSelectedElement(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [deleteElement, selectedElement]);

  return (
    <>
      <div
        className="h-full flex-1 relative"
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
      >
        {layout.map(item => {
          if (item.type === 'Label') {
            return (
              <label
                ref={selectedRef}
                key={item.id}
                data-id={item.id}
                className={`cursor-grab active:cursor-grabbing text-sm text-gray-9 font-normal placeholder-gray-gray4 fixed ${
                  selectedElement?.id === item.id
                    ? 'border-2 border-select-red'
                    : ''
                }`}
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  fontSize: `${item.fontSize}px`,
                  lineHeight: `${item.fontSize}px`,
                  fontWeight: `${item.fontWeight}`,
                }}
                draggable
                onDragStart={dragStartHandler}
                onClick={handleSelect}
              >
                {item.text}
              </label>
            );
          }
          if (item.type === 'Input') {
            return (
              <input
                ref={selectedRef}
                key={item.id}
                data-id={item.id}
                type="text"
                id={item.name}
                className={`cursor-grab active:cursor-grabbing border text-base font-normal border-gray-8 text-gray-9 rounded-sm block w-72 h-12 p-2 fixed focus-visible:outline-select-red ${
                  selectedElement?.id === item.id
                    ? 'border-2 border-select-red'
                    : ''
                }`}
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  fontSize: `${item.fontSize}px`,
                  lineHeight: `${item.fontSize}px`,
                  fontWeight: `${item.fontWeight}`,
                }}
                draggable
                onDragStart={dragStartHandler}
                onClick={handleSelect}
              />
            );
          }
          if (item.type === 'Button') {
            return (
              <button
                ref={selectedRef}
                key={item.id}
                data-id={item.id}
                type="submit"
                className={`cursor-grab active:cursor-grabbing bg-button-bg px-4 py-2 rounded-sm text-white fixed ${
                  selectedElement?.id === item.id
                    ? 'border-2 border-select-red hover:border-2 hover:border-select-red focus:border-2 focus:border-select-red focus:outline-0'
                    : ''
                }`}
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  fontSize: `${item.fontSize}px`,
                  lineHeight: `${item.fontSize}px`,
                  fontWeight: `${item.fontWeight}`,
                }}
                draggable
                onDragStart={dragStartHandler}
                onClick={handleSelect}
              >
                {item.name}
              </button>
            );
          }
        })}
      </div>
      {modal === 'Label' && (
        <LabelDialog
          setModal={setModal}
          open={open}
          dropRef={dropRef}
          defaultData={selectedElement}
        />
      )}
      {modal === 'Input' && (
        <InputDialog
          setModal={setModal}
          open={open}
          dropRef={dropRef}
          defaultData={selectedElement}
        />
      )}
      {modal === 'Button' && (
        <ButtonDialog
          setModal={setModal}
          open={open}
          dropRef={dropRef}
          defaultData={selectedElement}
        />
      )}
    </>
  );
};

export default Home;
