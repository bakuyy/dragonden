import React from 'react';
import '../styling/Dashboard.css'

const StreamlitDashboard = () => {
    return (
        <div className='container'>
            <iframe
                src="http://localhost:8501" // REPLACEE WHEN STREAMPIT IS DEPLOYED
                className="responsive-iframe"
                width='100%'
                height='100%'
                style={{ border: 'none' }}
                title="Streamlit Dashboard"
            />
        </div>
    );
};

export default StreamlitDashboard;