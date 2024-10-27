import PropTypes from 'prop-types';
import styles from './TransactionsStatistics.module.css';

 const TransactionsStatistics = ({ statistics, month }) => {
    return (
        <div className={styles.mainContainerWrapper}>
            <h2 className={styles.heading}>Statistics - {month}</h2>
            <div className={styles.mainContainer}>
                <div className={styles.subContainer}>
                    <p>Total sale</p>
                    <p style={{width:'fit-content', textAlign:'left'}}>{statistics.totalSales}</p>
                </div>

                <div className={styles.subContainer}>
                    <p>Total sold item</p>
                    <p style={{width:'3rem', textAlign:'left'}}>{statistics.soldItems}</p>
                </div>

                <div className={styles.subContainer}>
                    <p>Total not sold item</p>
                    <p style={{width:'3rem', textAlign:'left'}}>{statistics.notSoldItems}</p>
                </div>
            </div>
        </div>
    );
};

TransactionsStatistics.propTypes = {
    statistics : PropTypes.object.isRequired,
    month: PropTypes.string.isRequired
};

export default TransactionsStatistics;
