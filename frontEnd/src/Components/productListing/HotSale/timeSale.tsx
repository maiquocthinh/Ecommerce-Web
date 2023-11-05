import React, { useState, useEffect } from 'react';
import CountdownTimer from "./CountdownTimer"

function TimeSale() {
    const handleCountdownComplete = () => {
        alert('Đã đếm ngược xong!');
    };

    return (
        <div>
            <CountdownTimer initialTimeInSeconds={1 * 24 * 60 * 60} onComplete={handleCountdownComplete} />
        </div>
    );
}

export default TimeSale;
