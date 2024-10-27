import { useEffect, useState } from 'react';
import TransactionsTable from './components/TransactionsTable/TransactionsTable';
import TransactionsStatistics from './components/TransactionsStatistics/TransactionsStatistics';
import TransactionsBarChart from './components/TransactionsBarChart/TransactionsBarChart';
import { fetchTransactionsCombinedData } from './services/apiService';
import axios from 'axios';
import downArrow from './assets/down-arrow.png';
import loadingIcon from './assets/loading-gif.gif';
import './App.css';

const App = () => {
    const [month, setMonth] = useState('March');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage] = useState(5);
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [statistics, setStatistics] = useState({});
    const [barChartData, setBarChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeDatabase = async () => {
            setLoading(true);
            try {
                await axios.get('http://127.0.0.1:3000/api/initialize-database');
                console.log('Database initialized with seed data');
            } catch (error) {
                console.error('Error initializing database', error);
            } finally {
                setLoading(false); // Hide loading state after fetching
            }
        };

        initializeDatabase();
    }, []);

    useEffect(() => {
        loadData();
    }, [month, search, page]);


    const loadData = async () => {
        try {
            const transactionsCombinedData = await fetchTransactionsCombinedData(month, search, page, perPage);

            setTransactions(transactionsCombinedData.transactionsData.transactions);
            setStatistics(transactionsCombinedData.statistics);
            setBarChartData(transactionsCombinedData.barchartData);
            setTotal(transactionsCombinedData.transactionsData.total);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        setPage(1); // Reset page when month changes
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset page when search changes
    };

    if (loading) {
        return (
            <div className="loading">
                <img src={loadingIcon} alt="Loading..." />
            </div>
        );
    }
    

    return (
        <div>
            <h1 className="mainHeading">Transaction Dashboard</h1>
            <div className="userPreferencesContainer">
              <input 
                  type="text" 
                  placeholder="Search transaction" 
                  value={search} 
                  onChange={handleSearchChange} 
              />
              <div className="dropdown-container">
                <select value={month} onChange={handleMonthChange}>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((monthName) => (
                        <option key={monthName} value={monthName}>{monthName}</option>
                    ))}
                </select>
                <img src={downArrow} alt="Arrow" className="dropdown-arrow" />
              </div>  
            </div>
            <TransactionsTable transactions={transactions} page={page} setPage={setPage} perPage={perPage} total={total}/>
            <TransactionsStatistics statistics={statistics} month = {month} />
            <TransactionsBarChart data={barChartData} month = {month} />
        </div>
    );
};

export default App;
