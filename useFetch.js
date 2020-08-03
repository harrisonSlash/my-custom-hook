import { useState, useEffect, useRef } from 'react';

export const useFetch = ( url ) => {
    
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, []);

    useEffect(() => {
        
        setState({
            loading: true,
            error: null,
            data: null
        });

        fetch( url )
        .then( resp => resp.json() )
        .then( data => {

            /* setTimeout(() => {
                if( isMounted.current ) {
                    setState({
                        loading: false,
                        error: null,
                        data: data
                    });
                } else {
                    console.log('setState no se llamó');
                }
            }, 4000); */
            
            /* setState({
                loading: false,
                error: null,
                data: data
            }); */

            if( isMounted.current ) {
                setState({
                    loading: false,
                    error: null,
                    data: data
                });
            } else {
                console.log('setState no se llamó');
            }

        })
        .catch(() => {
            setState({
                data: null,
                loading: false,
                error: 'No se pudo obtener la info'
            })
        })
        
    }, [url]);

    return state;
}
