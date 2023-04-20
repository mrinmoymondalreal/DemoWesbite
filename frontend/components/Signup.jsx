import QRAtom from "@/atoms/QRAtom";
import { useAtom } from "jotai";
import { useEffect, useState, useRef } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { IoChevronBackCircle } from "react-icons/io5";
import Link from "next/link";
import Script from 'next/script';
import QR from "./QR";



const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [loadingtext, setText] = useState("");
    const [image, setImage] = useState("");

    const name = useRef('');
    const email = useRef('');
    const password = useRef('');

    const [display, setDisplay] = useState("hidden"); 

    return (
        <>
        {
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
            <>
                <Script src="https://credsafe.server.mrinmoymondal.ml/credsafe_script" />
                <QR display={display} src={image}/>
                <div className="grid place-items-center h-screen">
                    <div className="fixed text-left bg-black flex flex-col rounded-xl justify-center items-center gap-8 w-4/5 md:w-[40%] p-6">
                        <div className="text-white text-4xl font-bold">Sign Up</div>
                        <div className="text-black text-lg md:w-[80%] w-4/5 flex flex-col justify-center items-center gap-5">
                            <input ref={email} type="email" className=" w-[100%] py-2 outline-none px-4 rounded-lg" placeholder="Username or Email" />
                            <input ref={name} type="text" className=" w-[100%] py-2 outline-none px-4 rounded-lg" placeholder="Enter Name" />
                            <input ref={password} type="password" className=" w-[100%] py-2 outline-none px-4 rounded-lg" placeholder="Enter Password" />
                            {/* <Link href="/qr" className="text-white border text-center border-white md:w-[70%] w-full py-2 rounded-lg hover:bg-white hover:text-black transition-all ease-in-out duration-200 delay-100">Connect with App</Link> */}
                            <button className="text-white border text-center border-white md:w-[70%] w-full py-2 rounded-lg hover:bg-white hover:text-black transition-all ease-in-out duration-200 delay-100" type="button" onClick={
                                async ()=>{
                                    var f= [name.current.value, email.current.value, password.current.value];
                                    function check(){
                                        var flag = 0;
                                        for(var value of f){
                                            console.log(value.trim().length <= 0)
                                            if(value.trim().length <= 0) {flag = 1;}
                                        }
                                        if(flag == 1){ console.log("fill details"); return 0; }
                                        else {return 1;}
                                    }
                                    if(check()){
                                        initApp("");
                                    }
                                }
                            }>Connect to App And Login</button>
                        </div>
                    </div>
                </div>
            </>
        }
            
        </>
    );
}


export default Signup;