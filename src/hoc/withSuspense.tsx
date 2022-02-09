import React, { Suspense } from 'react';
import Preloader from "../components/common/Preloader";


export function withSuspense(Component: React.ComponentType){
    return function(props:any){
        return <Suspense fallback={<Preloader/>}>
            <Component {...props} />
        </Suspense>
    ;}
};

