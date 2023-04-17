import Link from "next/link";

const Page = () => {
    
    
    return (
        <>
            <div className="grid place-items-center h-screen">
            <div className=" text-left bg-black flex flex-col rounded-xl justify-center items-center gap-8 w-4/5 md:w-[40%] p-6">
                    <div className="text-white text-4xl font-bold">CredSafe</div>
                    <div className="text-black text-lg md:w-[80%] w-4/5 flex flex-col justify-center items-center gap-5">
                        <Link href="/login" className="text-white border border-white md:w-[70%] text-center w-full py-2 rounded-lg hover:bg-white hover:text-black transition-all ease-in-out duration-200 delay-100">Login</Link>
                        <Link href="/signup" className="text-white border border-white md:w-[70%] text-center w-full py-2 rounded-lg hover:bg-white hover:text-black transition-all ease-in-out duration-200 delay-100">Signup</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;