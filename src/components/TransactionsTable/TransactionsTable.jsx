import PropTypes from 'prop-types';
import styles from './TransactionsTable.module.css';
 
 const TransactionsTable = ({ transactions, page, setPage, perPage, total}) => {

    const totalPages = Math.ceil(total / perPage);

    return (
        <div>
            <table className={styles.mainTable}>
                <thead>
                    <tr>
                        <th className={styles.serialNoColumn}>Serial No.</th>
                        <th className={styles.titleColumn}>Title</th>
                        <th className={styles.descriptionColumn}>Description</th>
                        <th className={styles.priceColumn}>Price</th>
                        <th className={styles.categoryColumn} >Category</th>
                        <th className={styles.dosColumn}>Date of Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction,index) => (
                        <tr key={transaction.productId}>
                            <td className={styles.serialNoColumn}>{index + 1 + (page - 1) * perPage}</td>
                            <td className={styles.titleColumn}>{transaction.title}</td>
                            <td className={styles.descriptionColumn}>{transaction.description}</td>
                            <td className={styles.priceColumn}>{transaction.price}</td>
                            <td className={styles.categoryColumn} >{transaction.category}</td>
                            <td className={styles.dosColumn}>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.indexingContainer}>
                <div>
                    <p>Page No: {page}</p>
                </div>

                <div className={styles.paginationContainer}>
                    <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Previous</button>
                    <div>-</div>
                    <button 
                    onClick={() => {
                        if (page < totalPages) {
                            setPage(prev => prev + 1); // Only increment if not on the last page
                        }
                        }
                    } 
                    >Next</button>
                </div>

                <div>
                    <p>Per Page: {perPage}</p>
                </div>  
            </div>

            
        </div>
    );
};

TransactionsTable.propTypes = {
    transactions : PropTypes.array.isRequired,
    page : PropTypes.number.isRequired,
    setPage : PropTypes.func.isRequired,
    perPage : PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};


export default TransactionsTable;
