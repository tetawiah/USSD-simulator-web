import Sidebar from '../Sidebar';
import MainComponent from '../MainComponent';
export default function Layout() {
  return (
    <div className="content">
      <Sidebar />
      <MainComponent/>
    </div>
  );
}
