
import { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const Login = () => {
    const [loading, setLoading] = useState(false);
        useEffect(() => {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 1000);

        }, [])
    return (
        <>
        {
            loading?  
            <div className="grid place-items-center h-screen">
                <PropagateLoader
                color={'#000000'}
                loading={loading}
                size={20}
          />
            </div>
          : 
          <div className="grid place-items-center h-screen">
                <div className="flex flex-col gap-6 text-center">
                    <div className="text-black text-6xl font-bold">Login</div>
                    <div className="p-6 bg-slate-600  gap-6 flex flex-col">
                        <img src="/qr.jpg" className="w-full" alt="" />
                    </div>
                </div>
                    
            </div>
        }
            
        </>
    );
}

export default Login;