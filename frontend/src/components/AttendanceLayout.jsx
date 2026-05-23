import { Outlet } from "react-router-dom";
import Attendance from "./post_attendance";

const AttendanceLayout = () => {
    return (
        <>
            <Attendance />
            <Outlet />
        </>
    );
};

export default AttendanceLayout;
