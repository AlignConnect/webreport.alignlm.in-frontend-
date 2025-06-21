import Leadcard from "./Leadcard";
import Ordercard from "./Ordercard";

const Datagrid = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-6">
        <Leadcard />
        <Ordercard />
        {/* Add more cards here as needed */}
      </div>
    </section>
  );
};

export default Datagrid;
