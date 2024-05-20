const CurrentBalance = ({ lastReport }) => {
  return (
    <div className="w-screen  min-h-[40vh] flex md:justify-end mt-12">
      <div className="flex flex-col  md:px-32 px-8  items">
        <h1 className="text-green-400 md:text-[4rem] text-[2.8rem] ">
          Current Balance
        </h1>
        {lastReport && lastReport.main && (
          <div className="md:text-[2rem] text-[1.4rem] text-white flex flex-col gap-4 mt-8 ">
            <h3>{`Main Account: ${lastReport.main}`}</h3>
            <h3>{`Investments Account: ${lastReport.investments}`}</h3>
            <h3>{`Savings Account: ${lastReport.savings}`}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentBalance;
