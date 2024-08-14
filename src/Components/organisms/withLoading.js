import React, { useState, useEffect } from 'react';
import "../../Components/styles.css"

const withLoading = (WrappedComponent, fetchData) => {
    return function WithLoadingComponent(props) {
        const [loading, setLoading] = useState(true);
        const [data, setData] = useState(null);

        useEffect(() => {
            fetchData().then(data => {
                setData(data);
                setLoading(false);
            });
        }, []);

        if (loading) return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );

        return <WrappedComponent data={data} {...props} />;
    };
};

export default withLoading;
