import { usePageBuilderStore } from '../../store/pageBuilderStore';
import Block from '../Block';

const Sidebar = () => {
  const layout = usePageBuilderStore(state => state.layout);

  const exportLayout = () => {
    const jsonData = JSON.stringify(layout, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Layout.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className=" h-full w-80 bg-sidebar-bg text-white p-5">
      <h1 className="text-xl font-bold">BLOCKS</h1>
      <Block name="Label" />
      <Block name="Input" />
      <Block name="Button" />
      <button
        type="button"
        className="bg-button-bg px-4 py-2 rounded-sm text-white mt-10"
        onClick={exportLayout}
      >
        Export Layout
      </button>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
