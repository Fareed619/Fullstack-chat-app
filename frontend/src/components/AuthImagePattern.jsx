const AuthImagePattern = ({ title, subtitle }) => {
  
  return (
    <div className="hidden lg:block w-full h-full  bg-base-200">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className={`p-12  rounded-2xl bg-primary/10 aspect-square ${
                index % 2 === 0 ? "animate-pulse" : ""
              }`}
            ></div>
          ))}
        </div>
        <h2 className="text-xl font-bold ">{title}</h2>
        <p className="text-base-content w-4/5">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
