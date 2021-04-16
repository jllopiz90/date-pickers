import "./App.css";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";

function App() {
  return (
    <div className="flex justify-center py-10 bg-gray-400">
      <DateRangePicker granularity="monthly" />
    </div>
  );
}

export default App;
