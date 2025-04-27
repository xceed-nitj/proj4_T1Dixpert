import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Lottie from 'lottie-react';
import Timetable from './timetableadmin/timetable';
import CreateTimetable from './timetableadmin/creatett';
import MasterFaculty from './timetableadmin/masterfaculty';
import AddFaculty from './timetableadmin/addfaculty';
import MasterRoom from './timetableadmin/masterroom';
import MasterSem from './timetableadmin/mastersem';
import AddSem from './timetableadmin/addsemester';
import AddRoom from './timetableadmin/addroom';
import LockedSummary from './timetableadmin/lockedsummary';
import Login from './dashboard/login';
import ForgotPassword from './dashboard/ForgotPassword';
import SuperAdminPage from './dashboard/superadmin';
import CommonSlot from './timetableadmin/commonslot.jsx';
import Subjects from './timetableadmin/addsubjects';
import ViewMRooms from './timetableadmin/viewmrooms';
// import LockedView from './timetableviewer/viewer';
import Note from './timetableadmin/addnote';
import Navbar from './components/home/Navbar';
import PrintSummary from './timetableadmin/printSummary';
import LoadDistribution from './timetableadmin/loaddistribution';
import RegistrationForm from './dashboard/register';
import AllotmentForm from './timetableadmin/allotment';
import MasterDelete from './timetableadmin/masterdelete';
import AdminPage from './timetableadmin/admin';
import ViewAllotmentPage from './timetableadmin/viewroomallotment';
import CommonLoad from './timetableadmin/addcommonload';
import MasterView from './timetableadmin/mastersearch';
import View from './timetableadmin/masterview';
import AllocatedRolesPage from './dashboard/allotedroles';
import FirstYearLoad from './timetableadmin/firstyearload';
import FirstYearFaculty from './timetableadmin/addfirstyearfaculty';
import LunchLoad from './timetableadmin/addlunchload';
import InstituteLoad from './timetableadmin/instituteload';
import ViewInstituteLoad from './timetableadmin/viewinstituteload';
import EditMasterFaculty from './timetableadmin/editmasterfaculty';
import ImportForm from './timetableadmin/importCentralRoom';
import MergePDFComponent from './filedownload/mergepdfdocuments';
import TimetableMasterView from './timetableadmin/masterview';
import MasterDataTable from './timetableadmin/viewmasterclasstable.jsx';
import MasterLoadDataTable from './timetableadmin/viewinstituteloadmaster.jsx';
import Departmentloadallocation from './timetableadmin/departmentloadallocation.jsx';

import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage.jsx';
import animation404 from '../public/404.json';
import { LogoAnimation } from './components/login/LogoAnimation.jsx';
import Form from './platform/Form.jsx';
import UserManagementPage from './dashboard/UserManagement.jsx';

//import diabetic modules
import HospitalForm from './diabeticsModule/components/HospitalForm.jsx';
import PatientForm from './diabeticsModule/components/PatientForm.jsx';
import DailyDosageForm from './diabeticsModule/components/DailyDosageForm.jsx';
import SickDayForm from './diabeticsModule/components/SickDayForm.jsx';
import GamificationForm from './diabeticsModule/components/GamificationForm.jsx';
import DoctorForm from './diabeticsModule/components/DoctorForm.jsx';

// Diabetics Module Dashboards
import AdminDashboard from './diabeticsModule/pages/AdminDashboard';
import PatientDashboard from './diabeticsModule/pages/PatientDashboard';
import PatientHistory from './diabeticsModule/pages/PatientHistory';
import DoctorDashboard from './diabeticsModule/pages/DoctorDashboard';
import PatientDetailView from './diabeticsModule/pages/PatientDetailView';
import LoginPage from './diabeticsModule/pages/LoginPage';


// Detail View Routes for Admin
import DoctorDetailView from './diabeticsModule/pages/DoctorDetailView';
import HospitalDetailView from './diabeticsModule/pages/HospitalDetailView';

function App() {
  return (
    <Router>
      {/* <div className="app"> */}

      {/* <h1>XCEED-Timetable Module</h1>  */}
      <Navbar />

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Login/>} />
      

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/userroles" element={<AllocatedRolesPage />} />
        <Route path="/superadmin" element={<SuperAdminPage />} />
        <Route path="/usermanagement" element={<UserManagementPage />} />
        <Route path="/404" element={<ErrorPage
  message="Oops! Page not found."
  animation={<Lottie animationData={animation404} style={{opacity:'20%'}} />}
  destinationName={false}   // No redirect
  destination=""            // Empty destination
/>
} />


        <Route
          path="/platform"
          element={
            <>
              <Form />
            </>
          }
        />

        {/* Routes for Diabetics Module */}
        {/* Authentication */}
        <Route path="/dm/login" element={<LoginPage />} />


        {/* Admin Routes */}
        <Route path="/dm/admin/dashboard" element={<AdminDashboard />} />

        {/* Patient Routes */}
        <Route path="/dm/patient/dashboard" element={<PatientDashboard />} />

        {/* Doctor Routes */}
        <Route path="/dm/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/dm/patient/:patientId" element={<PatientDetailView />} />
        <Route
          path="/dm/patient/:patientId/history"
          element={<PatientHistory />}
        />

        {/* Detail View Routes for Admin */}
        <Route path="/dm/doctor/:doctorId" element={<DoctorDetailView />} />
        <Route
          path="/dm/hospital/:hospitalId"
          element={<HospitalDetailView />}
        />

        {/* Data Entry Forms */}
        <Route path="/dm/addHospital" element={<HospitalForm />} />
        <Route path="/dm/addPatient" element={<PatientForm />} />
        <Route path="/dm/addDoctor" element={<DoctorForm />} />
        <Route path="/dm/addDailyDosage" element={<DailyDosageForm />} />
        <Route path="/dm/addSickDay" element={<SickDayForm />} />
      </Routes>
      {/* <Footer/> */}
      {/* </div> */}
    </Router>
  );
}

export default App;
