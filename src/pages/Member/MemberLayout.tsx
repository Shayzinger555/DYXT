import { Outlet } from "react-router-dom";

const MemberLayout = () => {
  return (
    <div>
      <main className="min-h-[100vh] mt-[14vh]">
        {/* //memberLayout  as classname*/}
        <Outlet />
      </main>
    </div>
  );
};

export default MemberLayout;
