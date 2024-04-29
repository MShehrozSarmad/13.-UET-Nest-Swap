import React, { useEffect  } from 'react';

const AdsenseCmpnt = (props) => {
    const { dataAdSlot } = props;  
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
        catch (e) {
            console.log({e});
        }
    },[]);

    return (
        <>
            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-5378397403103224"
                data-ad-slot={dataAdSlot}
                data-ad-format="auto"
                data-full-width-responsive="true">
            </ins>
        </>
    );
};

export default AdsenseCmpnt;