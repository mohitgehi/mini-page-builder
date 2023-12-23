import PropTypes from 'prop-types';
import DragDots from '../../assets/dots.svg';

const Block = ({ name }) => {
  const dragStartHandler = e => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('name', e.target.id);
    e.dataTransfer.setData('offsetX', e.nativeEvent.offsetX.toString());
    e.dataTransfer.setData('offsetY', e.nativeEvent.offsetY.toString());
  };

  return (
    <div
      className={`flex bg-white h-12 p-3 mt-5 rounded cursor-grab active:cursor-grabbing translate-x-0 translate-y-0`}
      draggable
      onDragStart={dragStartHandler}
      id={name}
    >
      <img
        src={DragDots}
        alt="Drag Dots"
        className="cursor-pointer"
        draggable={false}
      />
      <p className=" text-black  text-base font-light ">{name}</p>
    </div>
  );
};

Block.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Block;
