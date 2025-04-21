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
import EventRegistration from './certificatemodule/pages/eventregistration';
import CMDashboard from './certificatemodule/pages/cmdashboard';
import CertificateForm from './certificatemodule/pages/certificatedesign';
// import Certificate from './certificatemodule/pages/certificatetemplates/Certificate';
import ServicePage from './pages/Service';
import Participant from './certificatemodule/pages/participantdataupload';
import UserEvents from './certificatemodule/pages/UserEvents';
import UserLogos from './certificatemodule/pages/UserLogo.jsx';
import UserSignatures from './certificatemodule/pages/UserSignatures.jsx';

import EODashboard from './conferencemodule/layout/eodashboard';
import HomeConf from './conferencemodule/Tabs/HomeConf';
import Sidebar from './conferencemodule/components/Sidebar';
import Speaker from './conferencemodule/Tabs/Speaker';
import Committees from './conferencemodule/Tabs/Committees';
import Sponsors from './conferencemodule/Tabs/Sponsors';
import Awards from './conferencemodule/Tabs/Awards';
import Announcement from './conferencemodule/Tabs/Annoumcement';
import Contacts from './conferencemodule/Tabs/Contacts';
import Images from './conferencemodule/Tabs/Images';
import EventDates from './conferencemodule/Tabs/EventDates';
import Participants from './conferencemodule/Tabs/Participants';
import NavbarConf from './conferencemodule/Tabs/NavbarConf';
import Location from './conferencemodule/Tabs/Location';
import CommonTemplate from './conferencemodule/Tabs/CommonTemplate';
import ConferencePage from './conferencemodule/Tabs/ConferencePage';

import Template01 from './certificatemodule/pages/certificatetemplates/akleem';
// import ViewCertificate from './certificatemodule/pages/participantCerti';
import Template03 from './certificatemodule/pages/certificatetemplates/03_sarthak';

// Review Module Imports
import PRMEventRegistration from './reviewmodule/pages/eventregistration';
import PRMDashboard from './reviewmodule/pages/prmdashboard';
import ReviewLogin from './reviewmodule/pages/ReviewLogin';
import CreateUser from './reviewmodule/pages/CreateUser';
import AddReviewer from './reviewmodule/pages/AddReviewer';
import Review from './reviewmodule/pages/Review.jsx';
import PaperSummary from './reviewmodule/pages/PaperSummary.jsx';
import Forms from './reviewmodule/pages/Forms.jsx';
import FormAnswers from './reviewmodule/pages/FormAnswers.jsx';
import ReviewerQuestion from './reviewmodule/pages/ReviewQuestion';
import DefaultQuestion from './reviewmodule/pages/DefaultQuestion.jsx';
import ReviewerQuestionHome from './reviewmodule/pages/ReviewQuestionHome';
import StartSubmission from './reviewmodule/pages/StartSubmission.jsx';
import DefaultQuestionHome from './reviewmodule/pages/DefaultQuestionHome.jsx';
import UpdateReviewerStatus from './reviewmodule/pages/UpdateReviewerStatus';
import UserRegistration from './reviewmodule/pages/userRegistration';
import OTPverification from './reviewmodule/pages/OTPverification.jsx';
import UserDetails from './reviewmodule/pages/UserDetails.jsx';

// import HomePage from './reviewmodule/pages/Main';

import PrmEditorDashboard from './reviewmodule/pages/PrmEditorDashboard';

// import ConferenceDetails from './reviewmodule/pages/EditorConferencePage';
import AllPaper from './reviewmodule/pages/allpapers';
import EventForm from './reviewmodule/pages/editorevent';
import MultiEditorEvent from './reviewmodule/pages/addeditor';
import PaperDetails from './reviewmodule/components/PaperDetails';

import ReviewerAcceptance from './reviewmodule/pages/ReviewerAcceptance';

import SponsorshipRate from './conferencemodule/Tabs/SponsorshipRates';
import Accomodation from './conferencemodule/Tabs/Accomodation';
import Event from './conferencemodule/Tabs/Events';
import Souvenir from './conferencemodule/Tabs/Souvenir';
import MultiStepForm from './reviewmodule/pages/MultiStepForm';
import HomePage from './reviewmodule/pages/Main';
import AddTrack from './reviewmodule/pages/addTracks';
import AddTemplate from './reviewmodule/pages/addTemplate';
import EditTemplate from './reviewmodule/pages/EditTemplate';
import EditDefaultTemplate from './reviewmodule/pages/EditDefaultTemplate.jsx';
import NirfRanking from './nirf/rankings';
import AddPaper from './reviewmodule/pages/addpaper';

// imports for Quiz Module
import CreateQuiz from './quizModule/creator/createQuiz/CreateQuiz';
import AddQuestionHome from './quizModule/creator/addQuestion/AddQuestionHome';
import AddInstruction from './quizModule/creator/addQuestion/AddInstruction';
import PreviewInstructions from './quizModule/creator/addQuestion/PreviewInstructions';
import Settings from './quizModule/creator/addQuestion/settings';
import PrmEdDashboard from './reviewmodule/pages/PrmEdDashboard';
import Quizzing from './quizModule/student/quizzing/Quizzing';
// import Instructions from './quizModule/student/Instructions';
import QuizFeedback from './quizModule/student/quizFeedback/QuizFeedback';
import UserManagement from './dashboard/userManagement';
import UserEventRegistration from './certificatemodule/pages/addEvent';

import Form from './platform/Form.jsx';
import AllForms from './reviewmodule/pages/AllForms.jsx';
import Reviews from './reviewmodule/pages/Reviews.jsx';

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
        {/* <Route path="/nirf" element={<NirfRanking />} /> */}

        {/* <Route path="/services/:serviceId" element={<ServicePage />} /> */}
        {/* ********* */}

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/userroles" element={<AllocatedRolesPage />} />
        <Route path="/superadmin" element={<SuperAdminPage />} />
        <Route path="/usermanagement" element={<UserManagement />} />



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
