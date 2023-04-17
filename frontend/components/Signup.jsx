import QRAtom from "@/atoms/QRAtom";
import { useAtom } from "jotai";
import { useEffect, useState, useRef } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { IoChevronBackCircle } from "react-icons/io5";
import Link from "next/link";
import QR from "./QR";
import socket from "../socket"



const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [loadingtext, setText] = useState("");
    const [image, setImage] = useState("");

    const name = useRef('');
    const email = useRef('');
    const password = useRef('');

    useEffect(() => {
        // setLoading(true);
        // setTimeout(() => {
        //     setLoading(false)
        // }, 1000);
        if(getDeviceID() == null){fetchID()}
        else{joinID();}
        function fetchID(){
            socket.on("device_id", (msg)=>{
                if(msg.status == 200) setDeviceID(msg.id);
                else setDeviceID("Error");
            })
        }
        function joinID(){
            socket.emit("join_id", getDeviceID());
        }
        function setDeviceID(id){
            getDeviceID() == null ? window.localStorage.setItem("device_id", id) : null;
        }
        function getDeviceID(){
            return window.localStorage.getItem("device_id");
        }
        window.getDeviceID = getDeviceID;
        function initRegister(callback, error){
            console.log("inside")
            if(getDeviceID() == null) return;
            socket.on("waiting_re", (d)=>{
                setLoading(true);
                setText(d);
            });
            socket.on("pro_done", (d)=>{
                setLoading(false);
                if(d.status == 200){callback(d.data);}
                else{error(d.data);}
            });
        }
        window.initRegister = initRegister;
    }, []);

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
                                    console.log(check());
                                    if(check() == 0) return;
                                    let headers = new Headers();

                                    headers.append('Content-Type', 'application/json');

                                    headers.append('Access-Control-Allow-Origin', '*');
                                    var resp = await fetch("https://credsafe.server.mrinmoymondal.ml/r/getQR", {
                                        method: "POST",
                                        headers: headers,
                                        body: JSON.stringify({
                                            user_id: '2cbeba5e-bf2b-4034-92a7-2cbb6b28da8e',
                                            password: '12345678',
                                            device_id: getDeviceID(),
                                        })
                                    });
                                    resp = await resp.json();
                                    console.log(resp);
                                    if(resp.status == 200){
                                        setDisplay("visible");
                                        setImage(resp.msg);
                                        initRegister(async (d)=>{
                                            console.log("process done");
                                            var data = {
                                                name: f[0],
                                                password: f[2],
                                                email: f[1],
                                                id: d
                                            };
                                            console.log(f);
                                            resp = await fetch("https://mrinmoymondalreal-automatic-fortnight-jww5qxvq9q52pv64-4000.preview.app.github.dev/a/signup", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },

                                                body: JSON.stringify(data)
                                            });
                                            resp = await resp.json();
                                            console.log(d);
                                            if(resp.status == 200){
                                                setLoading(true);
                                                setText(<Link href="/login" className="text-white border text-center border-white md:w-[70%] w-full py-2 rounded-lg hover:bg-white hover:text-black transition-all ease-in-out duration-200 delay-100">Go to Login</Link>);
                                            }
                                        }, (d)=>{
                                            console.log(d);
                                        });
                                    }
                                    // setTimeout(()=>{setLoading(true)}, 2000);
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