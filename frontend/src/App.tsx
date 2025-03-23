import { useEffect, useState } from 'react';
import { api } from './lib/api';
import { motion } from "framer-motion";
import GradientBorderWrapper from './components/GradientBorderWrapper';
import Home from './Page/Home';

function App() {
  const [data, setData] = useState<{ message: string; timestamp: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const Res = await api.test.$get();
      const Data = await Res.json();
      setData(Data);
    };

    fetchData();
    return () => {
      setData(null);
    }; // Clean up function to prevent memory leaks
  }, []);

  return (
    <div className="flex flex-col  min-h-screen p-4">
      <Home/>
     

      
    </div>
  );
}

export default App;
