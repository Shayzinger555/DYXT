import { Route, Routes, useLocation } from "react-router-dom";
import ROUTES from "./ROUTES";
import LandingPage from "../pages/landingpage/LandingPage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import MemberLayout from "../pages/Member/MemberLayout";
import DynamicProjectPage from "../pages/Member/userProjects/DynamicProjectPage.tsx";
import ProjectsList from "../pages/Member/userProjects/ProjectList.tsx";
import HomePage from "../pages/Member/userHome/HomePage.tsx";
import BalancePage from "../pages/Member/userBalance/BalancePage.jsx";
import WorkoutsPage from "../pages/Member/userWorkouts/WorkoutsPage.tsx";
import ParentComponent from "../pages/Member/userProjects/ProjectsPage";
import CreateWorkout from "../pages/Member/userWorkouts/CreateWorkout.tsx";
import { AnimatePresence } from "framer-motion";
import NewPost from "../pages/community/NewPost.tsx";
import CalenderPage from "../pages/Member/userCalender/CalenderPage.tsx";
import CRMPage from "../pages/Member/CRM/CRMPage.tsx";
import WorkoutEdit from "../pages/Member/userWorkouts/WorkoutEdit.tsx";
import TodosPage from "../pages/Member/userTodos/TodosPage.tsx";
//? Guards
import MemberGuard from "../guard/MemberGuard.tsx";
import ProfilePage from "../pages/Member/userProfile/ProfilePage.tsx";
import CalendarPage from "../pages/Member/userCalender/CalendarPage.tsx";
import ContactPage from "../pages/contactPage/ContactPage.tsx";
import AboutPage from "../pages/AboutUs/AboutUs.tsx";
const Router = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path={ROUTES.LANDINGPAGE} element={<LandingPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />

        {/* Member Pages (includes Admins) */}
        <Route
          path={ROUTES.MEMBER}
          element={
            <MemberGuard>
              <MemberLayout />
            </MemberGuard>
          }
        >
          <Route index element={<HomePage />} />
          <Route path={ROUTES.CALENDAR} element={<CalendarPage />}></Route>
          <Route path={ROUTES.TODOS} element={<TodosPage />} />
          <Route path="/member/crm" element={<CRMPage />}></Route>
          <Route path={ROUTES.PROJECTS} element={<ParentComponent />}>
            <Route index element={<ProjectsList />} />
            <Route
              path={ROUTES.DYNAMIC_PROJECT_PAGE}
              element={<DynamicProjectPage />}
            />
          </Route>
          <Route path={ROUTES.BALANCE} element={<BalancePage />}></Route>
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />

          <Route path={ROUTES.WORKOUTS} element={<ParentComponent />}>
            <Route index element={<WorkoutsPage />} />
            <Route path={ROUTES.CREATEWORKOUT} element={<CreateWorkout />} />
            <Route path={ROUTES.EDITWORKOUT} element={<WorkoutEdit />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
