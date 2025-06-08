// dashboard.module.js
function initdashboard(container) {
    // Clear container
    container.innerHTML = '';
    
    // Create dashboard elements
    const dashboard = document.createElement('div');
    dashboard.className = 'dashboard';
    dashboard.innerHTML = `
        <h2>Interactive Dashboard</h2>
        <div class="metrics">
            <div class="metric-card">
                <h3>Users</h3>
                <p class="value">1,245</p>
                <p class="change positive">↑ 12%</p>
            </div>
            <div class="metric-card">
                <h3>Revenue</h3>
                <p class="value">$24,567</p>
                <p class="change positive">↑ 8%</p>
            </div>
            <div class="metric-card">
                <h3>Engagement</h3>
                <p class="value">78%</p>
                <p class="change negative">↓ 3%</p>
            </div>
        </div>
        <div class="chart-container">
            <canvas id="dashboard-chart"></canvas>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .dashboard {
            font-family: inherit;
        }
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        .metric-card {
            background: white;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .metric-card h3 {
            margin-top: 0;
            color: #64748b;
            font-size: 0.875rem;
        }
        .metric-card .value {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0.5rem 0;
        }
        .metric-card .positive {
            color: #16a34a;
        }
        .metric-card .negative {
            color: #dc2626;
        }
        .chart-container {
            margin-top: 2rem;
            background: white;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
    `;
    
    container.appendChild(dashboard);
    container.appendChild(style);
    
    // Initialize chart (using Chart.js in this example)
    if (typeof Chart !== 'undefined') {
        const ctx = document.getElementById('dashboard-chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'User Activity',
                    data: [65, 59, 80, 81, 56, 72],
                    fill: false,
                    borderColor: '#2563eb',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    } else {
        console.warn('Chart.js not loaded - visualization disabled');
    }
    
    // Add interactivity
    const metricCards = dashboard.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('click', () => {
            alert(`Viewing details for: ${card.querySelector('h3').textContent}`);
        });
    });
}
 
