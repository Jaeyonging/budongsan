import React from 'react';

export const ToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='fixed bottom-[50px] right-[50px]'>
            <img
                src='../up-arrow.png'
                onClick={scrollToTop}
                style={{ cursor: 'pointer' }}
                className='ml-[7px] w-[80px] hover:w-[90px] transition-width duration-100'
            />
        </div>
    );
};
