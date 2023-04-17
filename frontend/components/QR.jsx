import QRAtom from "@/atoms/QRAtom";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoChevronBackCircle } from "react-icons/io5";
import PropagateLoader from "react-spinners/PropagateLoader";



// const QR = () => {
//     const [loading, setLoading] = useState(false);
//         useEffect(() => {
//             setLoading(true)
//             setTimeout(() => {
//                 setLoading(false)
//             }, 1000);

//         }, [])

//     const [QR, setQR] = useAtom(QRAtom);
//     const showQR = () => {
//         setQR(!QR);
//     }
//     return (
//         <>
//         {
//             loading?
//             <div className="grid place-items-center h-screen">
//                 <PropagateLoader
//                 color={'#000000'}
//                 loading={loading}
//                 size={20}
//           />
//             </div>
//             :
//             <div className="grid place-items-center h-screen">
//                 <div className="fixed text-left bg-black flex flex-col rounded-xl justify-center items-center gap-8 w-4/5 md:w-[40%] p-6">
//                     <div className="text-white text-4xl font-bold">Sign Up</div>
//                     <div className="text-black text-lg md:w-[80%] w-4/5 flex flex-col justify-center items-center gap-5">
//                         <input type="email" className=" w-[100%] py-2 outline-none px-4 rounded-lg" placeholder="Username or Email" />
//                         <input type="password" className=" w-[100%] py-2 outline-none px-4 rounded-lg" placeholder="Enter Password" />
//                         <input type="password" className=" w-[100%] py-2 outline-none px-4 rounded-lg" placeholder="Confirm Password" />
//                         <button className="text-white border text-center border-white md:w-[70%] w-full py-2 rounded-lg hover:bg-white hover:text-black transition-all ease-in-out duration-200 delay-100">Connect with App</button>
//                     </div>
//                 </div>
//                 <div className="p-6 bg-slate-900/70 fixed w-full grid place-items-center h-screen">
//                     <div className="p-6 bg-slate-400 absolute gap-6 grid grid-flow-row mx-auto">
//                         <Link href="/signup"><IoChevronBackCircle className="cursor-pointer" size={50} color="white"/></Link>
                    
//                     <img src="/qr.jpg" className="w-full" alt="" />
//                     <div className="flex flex-row gap-6 w-2/3 mx-auto justify-between items-center">
//                         <div className="bg-slate-700 cursor-pointer rounded-full p-4 w-full text-center text-xl text-white">1</div>
//                         <div className="bg-slate-500 cursor-pointer rounded-full p-4 w-full text-center text-xl text-white">56</div>
//                         <div className="bg-slate-300 cursor-pointer rounded-full p-4 w-full text-center text-xl text-white">3</div>
//                     </div>
//                 </div>
//             </div>
                
//             </div>
//         }
            
//         </>
//     );
// }

const QR = (props) => {
    return (
        <div className="z-10 p-6 bg-slate-900/70 fixed w-full grid place-items-center h-screen" style={{ visibility: props.display }}>
            <div className="p-6 bg-slate-400 absolute gap-6 grid grid-flow-row mx-auto">
                {/* <Link href="/signup"><IoChevronBackCircle className="cursor-pointer" size={50} color="white"/></Link> */}
                <img src={props.src} className="w-full" alt="" />
                {/* <div className="flex flex-row gap-6 w-2/3 mx-auto justify-between items-center">
                    <div className="bg-slate-700 cursor-pointer rounded-full p-4 w-full text-center text-xl text-white">1</div>
                    <div className="bg-slate-500 cursor-pointer rounded-full p-4 w-full text-center text-xl text-white">56</div>
                    <div className="bg-slate-300 cursor-pointer rounded-full p-4 w-full text-center text-xl text-white">3</div>
                </div> */}
            </div>
        </div>
    );
}

export default QR;