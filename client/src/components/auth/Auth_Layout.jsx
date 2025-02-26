import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">

    <div className="hidden lg:flex items-center justify-center bg-gradient-to-b from-gray-800 via-gray-900 to-black w-1/2 px-12">
      <div className="max-w-md space-y-6 text-center text-white">
        
        <h1 className="text-4xl font-mono tracking-tight">
          Welcome to
        </h1>

        <span className='font-stick-no-bills text-4xl font-bold'>FLINT
            <span className='text-red-400 text-5xl'>.</span>
        </span>
        
        <p className="text-base font-light leading-relaxed text-gray-300">
          Elevate your shopping experience with new-age fashion and exclusive deals.
        </p>

        
        <div className="h-1 w-16 bg-gray-500 mx-auto rounded"></div>
      </div>
    </div>

    <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  </div>
  );
}

export default AuthLayout;