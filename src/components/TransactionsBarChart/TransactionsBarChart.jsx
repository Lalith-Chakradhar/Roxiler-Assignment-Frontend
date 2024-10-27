import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import PropTypes from 'prop-types';
import styles from './TransactionsBarChart.module.css';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionsBarChart = ({ data, month}) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [{
            label: 'Number of Items',
            data: Object.values(data),
            backgroundColor: 'rgba(108,229,232,255)',
            borderRadius: 7,
        }],
    };

    const chartOptions = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Number of Items', // Y-axis label
                    font: {
                        size: 16,
                        weight: 'bold',
                    },
                },
                ticks: {
                    // Format ticks to show as whole numbers
                    stepSize: 1,  // Set the increment to 1
                    callback: function(value) {
                        return Number.isInteger(value) ? value : null; // Only display whole numbers
                    },
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                },
                beginAtZero: true,
                
            },
            x: {
                title: {
                    display: true,
                    text: 'Price Ranges', // X-axis label
                    font: {
                        size: 16,
                        weight: 'bold',
                    },
                },
                grid: {
                    display: false, // Disable vertical grid lines
                },
                ticks: {
                    font: {
                        size: 16,
                    },
                }
            }
        },
    };

    return (
        <div className={styles.mainContainerWrapper}>
            <h2 className={styles.heading}>Bar Chart Stats - {month}</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

// Add prop types for validation
TransactionsBarChart.propTypes = {
    data: PropTypes.object.isRequired,
    month: PropTypes.string.isRequired
};

export default TransactionsBarChart;
