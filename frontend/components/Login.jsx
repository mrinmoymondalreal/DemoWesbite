
import { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [log, setLog] = useState(false);
    const [img, setImg] = useState('');
    const [loadingtext, setText] = useState("");

        useEffect(() => {
            
        }, [])
    return (
            loading?  
            <div className="flex justify-center items-center gap-y-10 h-screen">
                <div>
                    <PropagateLoader
                        color={'#000000'}
                        loading={loading}
                        size={20}
                    />
                </div>
                <div style={{ marginTop: "200px" }}>{loadingtext}</div>
            </div>
          :
          (
            log ? <div className="h-screen flex flex-col justify-center items-center text-3xl">
            You Already logged In <br/>
            <button type="button"
            onClick={
                ()=>{
                    localStorage.setItem("log", "false");
                    setLog(false);
                }
            }>Log Out</button></div> :
            <div className="grid place-items-center h-screen">
                <button type="button">Click To Login</button>
                <div className="flex flex-col gap-6 text-center">
                    <div className="text-black text-6xl font-bold">Login</div>
                    <div className="p-6 bg-slate-600  gap-6 flex flex-col">
                        <img src={img} className="w-full" alt="" />
                    </div>
                </div>
            </div>
          )
    );
}

export default Login;