        
        // Sample data for the charts
        const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
        
        const chartData = {
            youtube: [1200, 1350, 1500, 1800, 1950, 2100, 2250, 2300, 2400, 2450],
            twitch: [800, 900, 1100, 1250, 1400, 1500, 1600, 1700, 1750, 1820],
            medium: [200, 250, 300, 350, 400, 450, 500, 550, 600, 680],
            substack: [300, 400, 450, 500, 600, 700, 800, 850, 900, 950]
        };

        function createChart(canvasId, label, data) {
            const ctx = document.getElementById(canvasId).getContext('2d');
            return new Chart(ctx, {
                type: 'line',
                data: {
                    labels: monthLabels,
                    datasets: [{
                        label: label + ' Income ($)',
                        data: data,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '$' + value;
                                }
                            }
                        }
                    }
                }
            });
        }

        // Create charts for each platform
        const youtubeChart = createChart('youtubeChart', 'YouTube', chartData.youtube);
        const twitchChart = createChart('twitchChart', 'Twitch', chartData.twitch);
        const mediumChart = createChart('mediumChart', 'Medium', chartData.medium);
        const substackChart = createChart('substackChart', 'Substack', chartData.substack);

        function addIncome() {
            const platform = document.getElementById('platformSelect').value;
            const date = document.getElementById('dateInput').value;
            const amount = parseFloat(document.getElementById('amountInput').value);

            if (!date || !amount) {
                alert('Please fill in all fields');
                return;
            }

            // Update the chart data (in a real application, this would also update the backend)
            const chartMap = {
                'youtube': youtubeChart,
                'twitch': twitchChart,
                'medium': mediumChart,
                'substack': substackChart
            };

            const chart = chartMap[platform];
            chart.data.labels.push(new Date(date).toLocaleDateString('en-US', { month: 'short' }));
            chart.data.datasets[0].data.push(amount);
            
            // Remove oldest data point if we have more than 12 months
            if (chart.data.labels.length > 12) {
                chart.data.labels.shift();
                chart.data.datasets[0].data.shift();
            }

            chart.update();

            // Clear inputs
            document.getElementById('dateInput').value = '';
            document.getElementById('amountInput').value = '';
        }