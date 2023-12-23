import Home from '../components/Home';
import Sidebar from '../components/Sidebar';

const PageBuilder = () => {
  return (
    <div className="h-screen flex">
      <Home />
      <Sidebar />
    </div>
  );
};

export default PageBuilder;
