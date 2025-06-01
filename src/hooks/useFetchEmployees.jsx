import { useEffect, useState } from 'react';

export const useFetchEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=500')
      .then(res => res.json())
      .then(data => {
        setEmployees(data.users);
        setLoading(false);
      })
      .catch(() => {
        setEmployees([]);
        setLoading(false);
      });
  }, []);

  return { employees, loading };
};
