import React from "react";
import "./App.css";

function App() {
  return (
    <div id="main">
      
      <div id="header">
        <div id="header1">
          <p>
            T1Dixperts partners with healthcare providers to meet their clinic goals.
            <u>Learn more</u>
          </p>
        </div>

        <div id="header2">
          <div id="firstext" className="text"><p>T1Dixperts.org</p></div>
          <div id="secondtext" className="text"><p>Healthcare professionals</p></div>
          <div id="thirdtext" className="text"><p>Support</p></div>
          <div id="box1"><p>Personal sign up</p></div>
          <div id="box2"><p>Clinician Sign up</p></div>
          <div id="box3">Log in</div>
        </div>

        <div id="header3">
          <div id="logo">
            <img src="https://it1dxpert.org/dm/it1d-logo.jpeg" alt="Logo" />
          </div>
          <div id="content1" className="content">
            <p>What we offer</p>
            <p><i className="ri-arrow-down-s-line"></i></p>
          </div>
          <div id="content2" className="content">
            <p>Resources</p>
            <p><i className="ri-arrow-down-s-line"></i></p>
          </div>
          <div id="content3" className="content">
            <p>About</p>
            <p><i className="ri-arrow-down-s-line"></i></p>
          </div>
          <div id="content4" className="content">
            <p>Blog</p>
          </div>
        </div>
      </div>

      <div id="fakeheader"></div>

      
      <div id="page1">
        <div id="area1">
          <div id="heading"><h1>T1Dixperts Diabetes Heroes</h1></div>
          <div id="para">
            <p>Everyone loves a good hero story and we’re inviting you to share yours. Celebrate your diabetes hero with a donation to T1Dixperts in their name. Tell us how they’ve inspired, supported, or empowered you, and let their impact ripple through the diabetes community. Together, we can continue creating tools and resources that empower us all.</p>
          </div>
          <div id="insidearea">
            <div id="innertext1" className="innertext"><p>Donate Today</p></div>
            <div id="innertext2" className="innertext"><p>Download Your Diabetes Hero pack</p></div>
          </div>
          <div id="lowhead">
            <p>We recommend you use a computer to download the Diabetes Hero Pack.</p>
          </div>
        </div>

        <div id="area2">
          <div id="image">
            <img src="/bigimg.jpg" alt="Hero" />
          </div>
        </div>
      </div>

      
      <div className="features-section">
        <h2 className="features-title">Features</h2>
        <p className="features-subtitle">
          Explore key dashboards that empower your diabetes management
        </p>
        <div className="feature-cards">
          <div className="feature-card">
            <img src="/img1.jpg" alt="Feature 1" />
            <h3>Lorem, ipsum.</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="feature-card">
            <img src="/img2.jpg" alt="Feature 2" />
            <h3>Lorem, ipsum.</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="feature-card">
            <img src="/mg3.jpg" alt="Feature 3" />
            <h3>Lorem, ipsum.</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>

      
      <div className="committee-section">
        <h2 className="committee-title">Organizing Committee</h2>
        <p className="committee-subtitle">
          Meet the distinguished experts who are organizing T1Dixperts
        </p>

        <h3 className="co-patron-heading">Patron</h3>
        <div className="patron-card">
          <div className="profile-card-big">
            <img src="/img1.jpg" className="profile-img" alt="Patron" />
            <h3 className="profile-name">Lorem ipsum dolor sit amet.</h3>
            <p className="profile-role">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>

        <h3 className="co-patron-heading">Co-Patrons</h3>
        <div className="co-patron-cards">
          <div className="profile-card">
            <img src="/img2.jpg" className="profile-img" alt="Co-Patron 1" />
            <h4 className="profile-name">Lorem ipsum dolor sit.</h4>
            <p className="profile-role">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="profile-card">
            <img src="/mg3.jpg" className="profile-img" alt="Co-Patron 2" />
            <h4 className="profile-name">Lorem ipsum dolor sit.</h4>
            <p className="profile-role">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="profile-card">
            <img src="/ig4.jpg" className="profile-img" alt="Co-Patron 3" />
            <h4 className="profile-name">Lorem ipsum dolor sit.</h4>
            <p className="profile-role">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
