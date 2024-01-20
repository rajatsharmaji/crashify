import React from 'react';
import classes from './About.module.css';
import { Container, Row } from 'react-bootstrap';
import GlobalImg from '../assets/images/global-warming.png';
import SmogImg from '../assets/images/smog-city.png';

const aboutPage = () => (
  <Container>
    <Row className="d-flex justify-content-center">
      <h2 className={`${classes.aboutHead} text-center`}>ABOUT US</h2>
      <div className={classes.line}></div>
    </Row>

    <Row className="d-flex justify-content-center text-center">
      <p className={classes.aboutPara}>
        Welcome to Crashify, a dedicated platform committed to the responsible
        management of electronic waste, or e-waste. We are more than just a
        website; we are a community of individuals and organizations passionate
        about preserving the environment and reducing the impact of e-waste on
        our planet.
      </p>
    </Row>

    <Row className="d-flex justify-content-center">
      <h2 className={`${classes.missionHead} text-center`}>MISSION</h2>
      <div className={classes.line}></div>
    </Row>

    <Row className="d-flex justify-content-center text-center">
      <div>
        <img className={classes.global} src={GlobalImg} alt="globalwarming" />
        <p className={classes.missionPara}>
          At Crashify, our mission is unequivocal: to address the burgeoning
          e-waste crisis through education, sustainable solutions, and collective
          action. We recognize that the ever-increasing rate of electronic waste
          generation poses a significant threat to our environment and human
          health. Our commitment is to drive change and promote awareness of
          sustainable e-waste management practices.
        </p>

        <p className={classes.missionPara}>
          The proliferation of technology in our lives has undeniably improved
          our quality of life and productivity. However, the rapid pace of
          technological advancements has a flip side—the production of
          electronic devices has surged, leading to the premature disposal of
          outdated gadgets, thereby contributing to the e-waste problem.
        </p>
      </div>

      <div>
        <img className={classes.smog} src={SmogImg} alt="smog" />
        <p className={classes.smogPara}>
          Collection Services: In collaboration with our partners, we offer
          convenient and responsible e-waste collection services. This ensures
          that old electronic devices are disposed of in an environmentally
          friendly manner, with the goal of maximizing recycling and reducing
          the amount of e-waste in landfills.
        </p>

        <p className={classes.smogPara}>
          Advocacy: We actively engage in advocacy efforts to promote responsible
          e-waste management at local, national, and international levels. We
          work tirelessly to support and shape policies that encourage
          sustainable practices.
        </p>
      </div>
    </Row>

    <Row className="d-flex justify-content-center">
      <h2 className={`${classes.aboutHead} text-center`}>Our Team</h2>
      <div className={classes.line}></div>
    </Row>

    <Row className="d-flex justify-content-center text-center">
      <p className={classes.aboutPara}>
        Behind Crashify is a dedicated and diverse team of professionals who
        bring their expertise from various fields, all united by a shared
        commitment to environmental sustainability. Meet the people driving our
        mission:
      </p>

      <p className={classes.aboutPara}>Rajat Sharma</p>
      <p className={classes.aboutPara}>Kumar Nandan Kishor</p>
      <p className={classes.aboutPara}>Prachi Gupta</p>
      <p className={classes.aboutPara}>Pragati Veerani</p>
    </Row>
  </Container>
);

export default aboutPage;
