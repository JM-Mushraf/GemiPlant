import React, { useEffect } from 'react';
import "../text/text.css";

const GemiPlant = () => {
    useEffect(() => {
        function restartAnimation() {
            const textWrapper = document.getElementById('textWrapper');
            if (textWrapper) {
                textWrapper.classList.remove('text-wrapper');
                void textWrapper.offsetWidth; // Trigger reflow
                textWrapper.classList.add('text-wrapper');
            }
        }

        const intervalId = setInterval(restartAnimation, 2000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='txt_wrap'>
            <div className="text-wrapper" id="textWrapper">
                <span>G</span>
                <span>R</span>
                <span>E</span>
                <span>E</span>
                <span>N</span>
                <span>G</span>
                <span>R</span>
                <span>O</span>
                <span>W</span>
            </div>
        </div>
    );
};

export default GemiPlant;
